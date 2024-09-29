import { v4 as uuidv4 } from 'uuid';

export default class artifacts{

    uid: number;
    level:number;
    maxLevel:number;
    randomBaseStats: string[];
    info: any;
    temp: any;

    constructor(monItemInfo:any){
        Object.assign(this, monItemInfo)
          // Erstelle eine tiefe Kopie von monItemInfo.temp
        this.temp = JSON.parse(JSON.stringify(monItemInfo.temp));
        this.uid = uuidv4()
        this.level = 0
        this.maxLevel = 5
        this.randomBaseStats = ["baseAD","baseAP","maxHealth","baseCritDamage","baseCritRate","baseArmour","baseMR"] // list for every possbible random statS

    }
    randomStats(): void{
        if (this.maxLevel != this.level) {
            
            const rng = Math.random();
            const rStat = this.randomBaseStats[Math.floor(rng * this.randomBaseStats.length)];
            let rDigit  = rng * (0.3 - 0.01) + 0.01;
            
            if (rng >= 0.5 || Number.isInteger(this.temp[rStat]) && rStat !== "baseCritDamage" && rStat !== "baseCritRate"){
                rDigit = Math.round(Math.floor(rng * (50 - 1 + 1)) + 1);
            }

            if (this.temp[rStat] != undefined){
               
                this.temp[rStat] += rDigit;
            
            } else {

                this.temp[rStat] = rDigit;
            }
            this.level++;
        }
    }
}