import dex from './dex/generator.ts'
import React from 'react';
import _ from 'lodash';

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
    state: string;
    dmgTracker: any;
    type: string;
    aggro: boolean
    battleState:string;
    currentAttack:any;
    round: number;
    
    constructor(){
        this.state = "outOfCombat"
        this.dmgAmount = 0;
        this.autoBattle = false;
        this.dmgTracker = {};
        this.type = "unknown";
        this.currentAttack = null;
    }

    

startFight = async (player: any, batch: number[],drop: number) => {
        
    this.arena = new Arena(batch,drop);
    this.arena.genEnemys();
    this.player = player
    console.log(player.team)
    this.team = _.cloneDeep(player.getTeam());
    console.log(this.team);
    
    this.currentBatchIndex = 0;
    this.currentAttackerIndex = 0;

    this.currentBatch = this.arena.enemys[0];
    console.log(this.currentBatch)
    this.combinedUnits = [...this.team, ...this.currentBatch];
    console.log(this.combinedUnits)
    await this.initializeUnits();
    this.attackOrder= [...this.combinedUnits].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
    console.log(this.attackOrder)
    this.attacker = null;
    this.attackTarget = this.attackOrder[this.currentAttackerIndex]; //just to fill
    this.currentAttacker = this.attackOrder[this.currentAttackerIndex];

    this.round = 0;
    this.state = "Combat"
    this.battleState = "battle start"
    this.result = ""
    this.lastFight = null;
    this.drop = null;
    this.battleLogs = [];
    this.battleLogs.push("Battle Started");
    this.advanceTurn()
}


initializeUnits = async () => {
    while (!this.combinedUnits.every(unit => unit.stats.baseMS != null)) {
        // Warte, bis alle Einheiten ihre baseMS-Werte haben
        await new Promise(resolve => setTimeout(resolve, 50)); // 50 ms warten und erneut prüfen
    }
    console.log("All units have baseMS initialized");
}

reset(result: string): void{
    this.result = result
    this.state = "outOfCombat"
    this.lastFight = this.arena
    this.arena = null
    /* this.team.map((mon) => {
        mon.resetTempStats()
    }) */
}

checkPassive(){
    
    if (this.currentAttack != null){
        if (this.currentAttack.passive){
            this.currentAttack.passive.effect(this.currentAttacker, this.battleState)
        } 
        
    }
    if (this.currentAttacker != null){
        if (this.currentAttacker.passive){
            this.currentAttacker.passive.effect(this.currentAttacker,  this.battleState)
        }
    }
    
}

autoBattleAi(){
    this.currentAttack = this.currentAttacker.attacks[Math.floor(Math.random() * 3)];
    if ( this.currentAttack.aoe){
        this.arena.enemys[this.currentBatchIndex].map((enemy) =>{
        this.dmgAmount = this.currentAttacker.calculateDmg( this.currentAttack, this.currentAttacker, enemy);
        this.updateDamage(enemy.uid, this.dmgAmount);
    })} else {
        let target = this.currentBatch.filter(mon => mon.aggro === true)
        target = this.currentBatch[Math.floor(Math.random() * target.length)];
        this.dmgAmount = this.currentAttacker.calculateDmg( this.currentAttack, this.currentAttacker, target);
        //this.battleLogs.push(`${this.currentAttacker.name} uses ${attack.name} and dealt ${target.calculateDmg(attack, this.currentAttacker, target)}`)
        this.updateDamage(this.attackTarget.uid, -this.dmgAmount);
        
    }
    this.battleLogs.push(`${this.currentAttacker.name} uses ${ this.currentAttack.name} and dealt ${this.dmgAmount}`)
    
    this.attackOrder = [...this.attackOrder].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
    this.advanceTurn()
    
    return;
    
}

enemyAi = () => {
    this.currentAttack = this.currentAttacker.attacks[Math.floor(Math.random() * 3)];
    let aliveTeam = this.team.filter(unit => unit.alive)
    
    if (aliveTeam.filter(mon => mon.aggro === true).length > 0){
        aliveTeam = aliveTeam.filter(mon => mon.aggro === true)
    }
    
    const target = aliveTeam[Math.floor(Math.random() * aliveTeam.length)];
    this.battleLogs.push(`${this.currentAttacker.name} uses ${ this.currentAttack.name} and dealt ${target.calculateDmg( this.currentAttack, this.currentAttacker, target)}`)
    this.battleState = "End phase"
    this.checkPassive()
    this.attackOrder = [...this.attackOrder].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
    
    this.advanceTurn()
    };


handleAttack(attack: any, mon: any){
    if (attack.currentCD > 0 || mon != this.currentAttacker) {
        return;
    }
    this.currentAttack = attack
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
                this.updateDamage(enemy.uid, -this.dmgAmount);
            })
        } else {
            // this.battleLogs.push(`${this.currentAttacker.name} uses ${this.currentAttacker.name} and dealt ${mon.calculateDmg(attack, mon, this.attackTarget)}`);
            this.dmgAmount = mon.calculateDmg(attack, mon, this.attackTarget);
            this.updateDamage(this.attackTarget.uid, -this.dmgAmount);
        }
        
        this.battleState = "End phase"
        this.checkPassive()

        this.advanceTurn()
        this.updateDamage(mon.uid, mon.heal);
        this.battleLogs.push(`${this.currentAttacker.name} uses ${attack.name} and dealt ${this.dmgAmount}`)
    
        this.attackTarget = "none"
        setTimeout(()=> {this.checkAndAdvanceBatch()}, 1100)
        
    }
}


//function to choose next attacker
advanceTurn = () => {
    setTimeout(() => {
        this.checkAndAdvanceBatch()
        this.round++
        this.attackOrder = [...this.attackOrder].sort((a, b) => b.stats.baseMS - a.stats.baseMS);
        //choose next attacker
        let nextIndex = (this.currentAttackerIndex + 1) % this.attackOrder.length;
        //check if alive
        while (!this.attackOrder[nextIndex].alive) {
            nextIndex = (nextIndex + 1) % this.attackOrder.length;
            // this.attackOrder = this.attackOrder.filter(unit => unit.alive);
        }
        if (this.battleState != "battle start"){
            this.currentAttackerIndex = nextIndex
            this.currentAttacker = this.attackOrder[this.currentAttackerIndex];
            this.currentAttacker.calcStatus()
        }
        
        if (this.currentAttacker && this.arena && this.arena.enemys.flat().includes(this.currentAttacker)) {
            this.enemyAi();
            

    
        } else { 
            
            
            if (this.autoBattle && this.result != "won") {this.autoBattleAi();}
        }
        this.battleState = "Main Phase"
        this.checkPassive()
        
    }, 1100)
    
}

    checkAndAdvanceBatch = () => {
        if (!this.arena || !this.arena.enemys) return;
        let allDefeated = this.currentBatch.every(enemy => !enemy.alive);
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
            
            // code below if player win the battle
            this.drop = this.getDropRarity()   
            this.player.inventory.updateItem(Dex.generate(this.drop.dropID)) //this.drop for postScreen  
            // this.drop.name = Dex.generate(this.drop.dropID).name       
            this.player.team.map((mon) =>{
                
                mon.resetTempStats()
                mon.exp += this.drop.exp
                mon.levelProgess()
                
            })
            
            this.reset("won")
            if (this.type === "Story"){
                this.player.coins += 100
                this.player.essence += 100
            }
            
            }
        } else {
            allDefeated = this.team.every(mon => !mon.alive) 
            
            if (allDefeated){
                this.reset("lost")
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
    updateDamage(monId, damageAmount) {
        this.dmgTracker = {
            ...this.dmgTracker,
            [monId]: damageAmount}
        setTimeout(() => {this.dmgTracker = {[monId]: null}},1500)
            
    }
    getHighestStats() {
        let highestStats: any = []
        if (this.team){
           
        } else {
            return
        }
        highestStats.push(this.team.filter(mon => mon.dmgDealt >= 0).sort((a, b) => b.dmgDealt - a.dmgDealt)[0].dmgDealt);
        highestStats.push(this.team.filter(mon => mon.dmgTaken >= 0).sort((a, b) => b.dmgTaken - a.dmgTaken)[0].dmgTaken);
        highestStats.push(this.team.filter(mon => mon.healingDone >= 0).sort((a, b) => b.healingDone - a.healingDone)[0].healingDone);
        
        return highestStats; 
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
})};




}

