import dex from './dex/generator.ts'
import React from 'react';

export default class Fight{
    arena:any;
    result:string;
    currentBatchIndex:number
    currentAttackerIndex:number;
    attackOrder: number[];
    team:any;
    currentBatch:any;
    combinedUnits:any;
    sortedUnits:any;
    target:any;
    battleLogs: string[];
    attacker: any;
    attackTarget: any;
    lastFight: any;

    constructor(){
        this.result = "Battle"
    }

    startFight(player, batch,exp){
            this.arena = new Arena(batch,exp);
            this.arena.genEnemys();
            this.currentBatchIndex = 0;
            this.currentAttackerIndex = 0;
            this.attackOrder = [];
            this.team = player.getTeam();  
            this.currentBatch = this.arena.enemys[0];
            this.combinedUnits = [...this.team, ...this.currentBatch];
            this.attackOrder  = this.combinedUnits.sort((a, b) => b.baseMS - a.baseMS);
            this.target = null;
            this.battleLogs = [];
            this.battleLogs.push("Battle Started");
            this.attacker = null;
            this.attackTarget = this.attackOrder[this.currentAttackerIndex];
            this.lastFight = null;
    }

    handleAttack(attack, mon){
        this.attacker = this.attackOrder[this.currentAttackerIndex];
        if (!this.attacker.alive) {
            this.advanceTurn();
            return;
          }
          if (this.attackTarget != "none") {
            // Apply damage, buffs, debuffs, etc.
            if (attack.aoe){
                this.arena.enemys[this.currentBatchIndex].map((enemy,index) =>{
                mon.calculateDmg(attack, mon, enemy)
              })
            } else {
                this.battleLogs.push(`${this.attacker.name} uses ${attack.name} and dealt ${mon.calculateDmg(attack, mon, this.attackTarget)}`);
            }
            attack.passive(this.attacker)
            this.advanceTurn();
            this.attackTarget = "none"
            this.checkAndAdvanceBatch()
        }
    }

    enemyAi = (enemy) => {
        const attack = enemy.attacks[Math.floor(Math.random() * 3)];
        const target = this.team[Math.floor(Math.random() * 3)];
        this.battleLogs.push(`${enemy.name} uses ${attack.name} and dealt ${target.calculateDmg(attack, enemy, target)}`)
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
        const currentAttacker = this.attackOrder[this.currentAttackerIndex];
        // this.checkAndAdvanceBatch()
        if (currentAttacker && this.arena && this.arena.enemys.flat().includes(currentAttacker)) {
            this.enemyAi(currentAttacker);
  
      };}

      checkAndAdvanceBatch = () => {
        if (!this.arena || !this.arena.enemys) return;
        
        const allDefeated = this.currentBatch.every(enemy => !enemy.alive);
        console.log(this.currentBatch)
        if (allDefeated) {
          if (this.currentBatchIndex < this.arena.enemys.length - 1) {
            // Advance to the next batch
                
              const newIndex = this.currentBatchIndex + 1;
              this.currentBatch =  this.arena.enemys[newIndex];
              this.combinedUnits = [...this.team, ...this.currentBatch];
              this.sortedUnits = this.combinedUnits.sort((a, b) => b.MS - a.MS);
              this.attackOrder = this.sortedUnits;
              this.currentAttackerIndex = 0;
              return newIndex;
            } else {
           
            // All batches completed
            this.lastFight = this.arena;
            this.arena = null;
            this.result = "won"
          }
        }}

        handleTarget = (target) => {
            this.attackTarget = target
        }
      };
      







class Arena {
    dex: dex
    enemyList: any[]
    enemys: any[]
    enemyStageList: any[]
    expDrop: number
    enemyMons: any
    

    constructor(enemyList: number[], expDrop: number) {
        this.dex = new dex();
        this.enemyList = enemyList || [[10000,10000,10000],[10000,10001,10000]]
        this.enemys = []
        this.enemyStageList = []
        this.expDrop = expDrop
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