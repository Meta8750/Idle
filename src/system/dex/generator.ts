import { attackData } from "./AttackDexData.tsx";
import { monData } from "./MonDexData.ts";
import { monItemDex } from "./ItemDexData.ts";
import Animon from "../Animon.ts";

//use assign if no class behind
class assign{
    constructor(Data: any){
            Object.assign(this, Data)
    }
}
export default class dex{
    generate(id: number){
        let monInfo = monData.find(mon => mon.id === id);
        let attackInfo =  attackData.find(attack => attack.id === id);
        let monItemInfo = monItemDex.find(item => item.id === id);
        let newAssign: any

        if (monInfo){
            monInfo = this.genAttacks(monInfo)
            newAssign = new Animon({ ...monInfo })
        }
        if (attackInfo){
            newAssign = new assign({...attackInfo})
        }
        if (monItemInfo){
            newAssign = new assign({...monItemInfo})
        }
   
        if (!newAssign) {
            throw new Error(`ID ${id} not found`);
        }
        
        return newAssign
    }
    
    genAttacks(monInfo:any){
        if (typeof monInfo.attacks[0] == 'number'){
            let attackList = monInfo.attacks
            monInfo.attacks = []
            attackList.forEach(attackID => {
                console.log(attackID)
                monInfo.attacks.push(this.generate(attackID))
            });
        }
        return monInfo

    }
}



