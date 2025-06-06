import { v4 as uuidv4 } from 'uuid';

export default class artifacts{

    uid: string;
    level:number;
    maxLevel:number;
    tier: number;
    randomBaseStats: string[];
    info: any;
    stats: any;
    reqExtract: number;

    constructor(monItemInfo:any){
        Object.assign(this, monItemInfo)
        this.stats = JSON.parse(JSON.stringify(monItemInfo.stats));
        this.uid = uuidv4()
        this.level = 0
        this.maxLevel = 5
        this.tier = 0
        this.reqExtract = 1
        this.randomBaseStats = ["additionalAD","additionalAP","additionalMaxHealth","additionalCritDamage, additionalCritRate","additionalArmour","additionalMR"] // list for every possbible random statS

    }

    upgradeStats(): void {
        if (this.maxLevel != this.level) {
            for (const stat in this.stats){
                this.stats[stat] += Math.round(this.stats[stat] * Math.random())
                this.level++
            }
        }
    }

    evolveItem(): void {
        this.maxLevel += 5;
        this.tier++;
        this.reqExtract += 1;
    }

    randomStats(): void{
        if (this.maxLevel != this.level) {
            
            const rng = Math.random();
            const rStat = this.randomBaseStats[Math.floor(rng * this.randomBaseStats.length)];
            //rng * (max - min) + min | if min is a negative dig - and + swap
            let rDigit  = rng * (2 + 1) - 1;

            if ( rStat === "maxHealth"){
                rDigit = rng * (2 - 1) + 1 
            }

            if(Number.isInteger(this.stats[rStat])){
                rDigit = Math.round(rng * (100 + 100) - 100);
            }
            
            if (Math.random() >= 0.5 &&  rStat !== "baseCritDamage" && rStat !== "baseCritRate"  ){
                rDigit = Math.round(rng * (100 + 100) - 100);
              
            }
            
            if (this.stats[rStat] != undefined){
               
                this.stats[rStat] += rDigit;
            
            } else {

                this.stats[rStat] = rDigit;
            }
            this.level++;
        }
    }
}