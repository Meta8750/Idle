import { attackData } from "./AttackDexData.tsx";
import { monData } from "./MonDexData.ts";
import { monItemDex } from "./ItemDexData.ts";

class assign{
    constructor(Data: any){
            Object.assign(this, Data)
    }
}
export default class dex{
    info: any;

    generate(id: number){
        
        let info = monData.find(mon => mon.id === id);
        if (info){
            info = this.genAttacks(info)
        }
        
        if (!info){
            info = monItemDex.find(item => item.id === id);
        }
        if (!info){
            info = attackData.find(attack => attack.id === id);
        }
        
   
        if (!info) {
            throw new Error(`ID ${id} not found`);
        }
        const newAssign = new assign({...info})
        return newAssign

    }

    genAttacks(monInfo:any){
        let attackList = monInfo.attacks
        monInfo.attacks = []
        console.log(attackList)
        attackList.forEach(attackID => {
            monInfo.attacks.push(this.generate(attackID))
            
        });
        return monInfo

    }
}



