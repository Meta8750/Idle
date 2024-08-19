import Mondex from '../system/Mondex.js'

export default class Arena {
    constructor(enemys) {
        this.mondex = new Mondex();
        this.enemys = [[0,0,0],[0,1,0]]
    }

    genEnemys(){
        
        this.enemyMons = this.enemys.map(row => 
            row.map(id => {
                
                    return this.mondex.generateMon(id);
                
            })
        );

    }
}