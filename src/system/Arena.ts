import dex from './dex/generator.ts'
//
export default class Arena {
    dex: dex
    enemyList: any[]
    enemys: any[]
    enemyStageList: any[]
    expDrop: number
    enemyMons: any
    

    constructor(enemyList: number[], expDrop: number) {
        this.dex = new dex();
        this.enemyList = enemyList || [[0,0,0],[0,1,0]]
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