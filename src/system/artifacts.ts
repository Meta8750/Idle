import { v4 as uuidv4 } from 'uuid';

export default class artifacts{

    uid: number;
    level:number;
    maxLevel:number;
    randomBaseStats: string[];

    constructor(monItemInfo:any){
        Object.assign(this, monItemInfo)
        this.uid = uuidv4()
        this.level = 1
        this.maxLevel = 5
        this.randomBaseStats = ["baseAD","baseAP"]

    }
    randomStats(){
        const rFlatStat = Math.floor(Math.random() * (1000 - 100 + 1)) + 100;
        const rPercentStat = Math.random() * (0.3 - 0.01) + 0.01;
        
    }
}