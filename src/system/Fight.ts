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

    constructor(){
        this.result = "Battle"
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
            this.attackOrder  = this.combinedUnits.sort((a, b) => b.baseMS - a.baseMS);
            this.target = null;
            this.battleLogs = [];
            this.battleLogs.push("Battle Started");
            this.attacker = null;
            this.attackTarget = this.attackOrder[this.currentAttackerIndex]; //just to fill
            this.lastFight = null;
            this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
            this.autoBattle = false;
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
                mon.calculateDmg(attack, mon, enemy)
              })
            } else {
                this.battleLogs.push(`${this.currentAttacker.name} uses ${this.currentAttacker.name} and dealt ${mon.calculateDmg(attack, mon, this.attackTarget)}`);
            }
            attack.passive(this.currentAttacker)
            this.advanceTurn();
            this.attackTarget = "none"
            this.checkAndAdvanceBatch()
        }
    }

    enemyAi = () => {
        const attack = this.currentAttacker.attacks[Math.floor(Math.random() * 3)];
        const target = this.team[Math.floor(Math.random() * 3)];
        this.battleLogs.push(`${this.currentAttacker.name} uses ${attack.name} and dealt ${target.calculateDmg(attack, this.currentAttacker, target)}`)
        this.attackOrder = [...this.attackOrder].sort((a, b) => b.baseMS - a.baseMS);
        this.advanceTurn();
      };

    //function to choose next attacker
    advanceTurn = () => {
       
        this.attackOrder = [...this.attackOrder].sort((a, b) => b.baseMS - a.baseMS);
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
              this.sortedUnits = this.combinedUnits.sort((a, b) => b.MS - a.MS);
              this.attackOrder = this.sortedUnits;
              this.currentAttackerIndex = 0;
              this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
            } else {
           
            this.team.map((mon) =>{
                const drop = this.getDropRarity() 
                this.player.inventory.updateItem(Dex.generate(drop.dropID))
                
                mon.resetTempStats()
                mon.exp += drop.getDrop()
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
            console.log(rng)
            if (rng >= 0.3){
                return  this.arena.drop.common
            }
            if (rng <= 0.3 && rng >= 0.1){
                return  this.arena.drop.rare
            }
            if (rng <= 0.01){
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
    

    constructor(enemyList: number[], id: number) {
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

