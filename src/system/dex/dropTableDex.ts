

export default class Relicts {
    common: number[];
    rare: number[];
    legendary: number[];
    constructor(common, rare, legendary){
       

        this.common = common;
        this.rare = rare
        this.legendary = legendary;
    }

    openRelict(){
        let rng = Math.random()
        
        if (rng >= 0.3){
            return  this.common[Math.floor(Math.random() * this.common.length)]
        }
        if (rng <= 0.3 && rng >= 0.02){
            return  this.rare[Math.floor(Math.random() * this.rare.length)]
        }
        if (rng <= 0.02){
            return this.legendary[Math.floor(Math.random() * this.legendary.length)]
        }
    }
}

export const dropTable = [
    { 
    id:40000,
    dropID: new Relicts([30000,30001,30002,30003,30004,30005],[30006],[30007]),
    exp: 500,
     
    },

 ]