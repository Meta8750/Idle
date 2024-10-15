import { descData } from "./AttackDexData.tsx";
import { monData, attackData } from "./MonDexData.ts";
import { monItemDex } from "./ItemDexData.ts";
import { dropTable } from "./dropTableDex.ts";
import { passiveData } from "./PassiveDexData.js";
import Animon from "../Animon.ts";
import artifacts from '../artifacts.ts'

//use assign if no class behind
class assign{
    constructor(Data: any){
            Object.assign(this, Data)
    }
}
export default class Dex{
    generate(id: number){
        // console.log(id)
        try {
            let monInfo = monData.find(mon => mon.id === id);
            let attackInfo =  attackData.find(attack => attack.id === id);
            let monItemInfo = monItemDex.find(item => item.id === id);
            let dropTableInfo = dropTable.find(drop => drop.id === id);
            
            let newAssign: any

        if (monInfo){
            monInfo = this.genAttacks(monInfo)
            newAssign = new Animon({ ...monInfo })
            let passiveID = newAssign.passiveID
            if (passiveID){
                newAssign.passive = passiveData.find(passive => passive.id === passiveID);
            }
        }
        if (attackInfo){
            newAssign = new assign({...attackInfo})
            let passiveID = newAssign.passiveID
            
            if (Number.isInteger(passiveID)){
                newAssign.passive = passiveData.find(passive => passive.id === passiveID);
            }
        }
        if (monItemInfo){
            newAssign = new artifacts({...monItemInfo})
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
                monInfo.attacks.push(this.generate(attackID))
            });
        }
        return monInfo

    }

    getMondex(){
        return monData
    } 
}



