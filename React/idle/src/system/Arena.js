import MonDex from '../system/MonDex.js'

export default class Arena {
    constructor(enemyList) {
        this.monDex = new MonDex();
        this.enemyList = enemyList || [[0,0,0],[0,1,0]]
        this.enemys = []
        this.enemyStageList = []
    }

    genEnemys(){
        this.enemyMons = this.enemyList.map(row => {
            row.map(id => {  
                    this.enemyStageList.push(this.monDex.generateMon(id))
            })
            this.enemys.push(this.enemyStageList)
            this.enemyStageList = []
        return this.enemys
    });

    }
}