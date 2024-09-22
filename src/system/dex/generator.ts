import { attackData } from "./AttackDexData.tsx";
import { monData } from "./MonDexData.ts";
import { monItemDex } from "./ItemDexData.ts";
import { dropTable } from "./dropTableDex.ts";
import Animon from "../Animon.ts";

//use assign if no class behind
class assign{
    constructor(Data: any){
            Object.assign(this, Data)
    }
}
export default class dex{
    generate(id: number){
        try {
            let monInfo = monData.find(mon => mon.id === id);
        let attackInfo =  attackData.find(attack => attack.id === id);
        let monItemInfo = monItemDex.find(item => item.id === id);
        let dropTableInfo = dropTable.find(drop => drop.id === id)
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
        if (dropTableInfo){
            newAssign = new assign({...dropTableInfo})
        }
   
        return newAssign
        }
        catch (error) {
            console.error(error.message);
            return null;
        }
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



