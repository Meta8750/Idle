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

    constructor(player, batch,exp){
        const battleArena = new Arena(batch,exp);
        battleArena.genEnemys();
        this.arena = battleArena;
        this.result = "Battle"
        this.currentBatchIndex = 0;
        this.currentAttackerIndex = 0;
        this.attackOrder = [];
        this.team = player.getTeam();  
        this.currentBatch = battleArena.enemys[0];
        this.combinedUnits = [...this.team, ...this.currentBatch];
        this.attackOrder  = this.combinedUnits.sort((a, b) => b.baseMS - a.baseMS);
        this.target
        this.battleLogs = [];
        this.battleLogs.push("Battle Started");
        this.attacker
        this.attackTarget
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
                this.battleLogs.push(`${attacker.name} uses ${attack.name} and dealt ${mon.calculateDmg(attack, mon, attackTarget)}`);
            }
            const updatedOrder = [...this.attackOrder].sort((a, b) => b.baseMS - a.baseMS);
            attack.passive(this.attacker)
            this.attackOrder = updatedOrder;
            this.advanceTurn();
            this.attackTarget = "none"
        }
    }

    advanceTurn = () => {
        let nextIndex = (this.currentAttackerIndex + 1) % this.attackOrder.length;
        while (!this.attackOrder[nextIndex].alive) {
          nextIndex = (nextIndex + 1) % this.attackOrder.length;
        }
        this.currentAttackerIndex = nextIndex
      };
}






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