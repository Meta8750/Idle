import dex from './dex/generator.ts'
import React from 'react';

const Dex = new dex()
export default class Fight{
    arena:any;
    result:string;
    currentBatchIndex:number
    currentAttackerIndex:number;
    attackOrder: any;
    team:any;
    currentBatch:any;
    combinedUnits:any;
    sortedUnits:any;
    target:any;
    battleLogs: string[];
    attacker: any;
    attackTarget: any;
    lastFight: any;
    currentAttacker: any;
    player:any;
    autoBattle: boolean;
    updateDamageCallback: any;
    dmgAmount: number;
    drop: any;

    constructor(updateDamageCallback){
        this.result = "Battle"
        this.updateDamageCallback = updateDamageCallback; // Callback to update damage in UI
        this.dmgAmount = 0;
    }

    startFight(player: any, batch: number[],drop: number){
            this.arena = new Arena(batch,drop);
            this.arena.genEnemys();
            this.currentBatchIndex = 0;
            this.currentAttackerIndex = 0;
            this.attackOrder = [];
            this.team = player.getTeam();  
            this.player = player
            this.currentBatch = this.arena.enemys[0];
            this.combinedUnits = [...this.team, ...this.currentBatch];
            this.attackOrder  = this.combinedUnits.sort((a, b) => b.stats.baseMS - a.stats.baseMS);
            this.target = null;
            this.battleLogs = [];
            this.battleLogs.push("Battle Started");
            this.attacker = null;
            this.attackTarget = this.attackOrder[this.currentAttackerIndex]; //just to fill
            this.lastFight = null;
            this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
            this.autoBattle = false;
            this.drop = null;
           
    }

    handleAttack(attack: any, mon: any){
        //check if attack is even alive
        if (!this.currentAttacker.alive) {
            this.advanceTurn();
            return;
          }
          if (this.attackTarget != "none") {
            // Apply damage, buffs, debuffs, etc.
            if (attack.aoe){
                    this.arena.enemys[this.currentBatchIndex].map((enemy) =>{
                    this.dmgAmount = mon.calculateDmg(attack, mon, enemy);
                    this.updateDamageCallback(enemy.uid, this.dmgAmount);
              })
            } else {
                // this.battleLogs.push(`${this.currentAttacker.name} uses ${this.currentAttacker.name} and dealt ${mon.calculateDmg(attack, mon, this.attackTarget)}`);
                this.dmgAmount = mon.calculateDmg(attack, mon, this.attackTarget);
                this.updateDamageCallback(this.attackTarget.uid, this.dmgAmount);
            }
                attack.passive(this.currentAttacker)
            this.advanceTurn();
            this.attackTarget = "none"
            setTimeout(()=> {this.checkAndAdvanceBatch()}, 1500)
        }
    }

    enemyAi = () => {
        const attack = this.currentAttacker.attacks[Math.floor(Math.random() * 3)];
        const target = this.team[Math.floor(Math.random() * 3)];
        this.battleLogs.push(`${this.currentAttacker.name} uses ${attack.name} and dealt ${target.calculateDmg(attack, this.currentAttacker, target)}`)
       
        this.attackOrder = [...this.attackOrder].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
        setTimeout(() => {this.advanceTurn();}, 1000)
      };

    //function to choose next attacker
    advanceTurn = () => {
       
        this.attackOrder = [...this.attackOrder].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
        //choose next attack
        let nextIndex = (this.currentAttackerIndex + 1) % this.attackOrder.length;
        //check if alive
        while (!this.attackOrder[nextIndex].alive) {
            //if not next
          nextIndex = (nextIndex + 1) % this.attackOrder.length;
        }
        this.currentAttackerIndex = nextIndex
        this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
        
        if (this.currentAttacker && this.arena && this.arena.enemys.flat().includes(this.currentAttacker)) {
            this.enemyAi();
  
      };}

      checkAndAdvanceBatch = () => {
        if (!this.arena || !this.arena.enemys) return;
        const allDefeated = this.currentBatch.every(enemy => !enemy.alive);
        if (allDefeated) {
          if (this.currentBatchIndex < this.arena.enemys.length - 1) {
            // if all dead next batch
            this.currentBatchIndex++;
              this.currentBatch =  this.arena.enemys[this.currentBatchIndex];
              this.combinedUnits = [...this.team, ...this.currentBatch];
              this.sortedUnits = this.combinedUnits.sort((a, b) => b.stats.MS - a.stats.MS);
              this.attackOrder = this.sortedUnits;
              this.currentAttackerIndex = 0;
              this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
            } else {

            this.drop = this.getDropRarity()   
            this.player.inventory.updateItem(Dex.generate(this.drop.dropID)) //this.drop for postScreen  
            this.drop.name =Dex.generate(this.drop.dropID).name       
            this.team.map((mon) =>{
                
                mon.resetTempStats()
                mon.exp += this.drop.exp
                mon.levelProgess()
                
            })
           
            this.lastFight = this.arena;
            this.arena = null;
            this.result = "won"
            
          }
        }}

        handleTarget = (target) => {
            this.attackTarget = target
        }

        getDropRarity(){
            const rng = Math.random()
            
            if (rng >= 0.3){
                return  this.arena.drop.common
            }
            if (rng <= 0.3 && rng >= 0.02){
                return  this.arena.drop.rare
            }
            if (rng <= 0.02){
                return this.arena.drop.legendary
            }
           

        }

      };
class Arena {
    dex: dex
    enemyList: any[]
    enemys: any[]
    enemyStageList: any[]
    expDrop: number
    enemyMons: any
    drop: any;
    dropID:number;
    

    constructor(enemyList: number[], id: number) {
        this.dropID = id;
        this.dex = new dex();
        this.enemyList = enemyList || [[10000,10000,10000],[10000,10001,10000]]
        this.enemys = []
        this.enemyStageList = []
        this.drop =  this.dex.generate(id)
        
    }

    genEnemys(){
        
        this.enemyMons = this.enemyList.map(row => {
            row.map(id  => {  
                    this.enemyStageList.push(this.dex.generate(id))
                    
            })
            this.enemys.push(this.enemyStageList)
            this.enemyStageList = []
        return this.enemys
    });

    }
}

