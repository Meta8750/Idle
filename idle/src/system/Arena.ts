import MonDex from './MonDex.ts'
//
export default class Arena {
    monDex: MonDex
    enemyList: any[]
    enemys: any[]
    enemyStageList: any[]
    expDrop: number
    enemyMons: any
    

    constructor(enemyList: number[], expDrop: number) {
        this.monDex = new MonDex();
        this.enemyList = enemyList || [[0,0,0],[0,1,0]]
        this.enemys = []
        this.enemyStageList = []
        this.expDrop = expDrop
    }

    genEnemys(){
        this.enemyMons = this.enemyList.map(row => {
            row.map(id  => {  
                    this.enemyStageList.push(this.monDex.generateMon(id))
            })
            this.enemys.push(this.enemyStageList)
            this.enemyStageList = []
        return this.enemys
    });

    }
}