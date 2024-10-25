import { descData } from "./AttackDexData.tsx";
import { monData, attackData, itemData, fetchDataById} from "./fetchData.ts";
import { monItemDex } from "./ItemDexData.ts";
import { dropTable } from "./dropTableDex.ts";
import { passiveData } from "./PassiveDexData.js";
import Animon from "../Animon.ts";
import artifacts from '../artifacts.ts'



function checkFirstDigit(id) {
    const idString = id.toString();
    const firstDigit = idString.charAt(0);
    if (!isNaN(firstDigit)) {
      return parseInt(firstDigit, 10); 
    } else {
      console.log("Die ID beginnt nicht mit einer Zahl.");
      return null;
    }
  }

//use assign if no class behind
class assign{
    constructor(Data: any){
            Object.assign(this, Data)
    }
}
export default class Dex{
    generate  = (id: number) =>{
        let typeID = checkFirstDigit(id)
        try {
        
            let attackInfo =  attackData.find(attack => attack.id === id);
            let monItemInfo = itemData.find(item => item.id === id);
            let dropTableInfo = dropTable.find(drop => drop.id === id);
            let newAssign: any;

        if (typeID === 1){
            let monInfo = monData.find(mon => mon.id === id);
            monInfo = this.genAttacks(monInfo)
            newAssign = new Animon({ ...monInfo })
            let passiveID = newAssign.passiveID
            newAssign.status = []
            newAssign.kills = 0
            newAssign.heal = 0
            newAssign.ally = false;
            if (passiveID){
                newAssign.passive = passiveData.find(passive => passive.id === passiveID);
                delete newAssign.passiveID;
            }
        }
       
        if (attackInfo){
            newAssign = new assign({...attackInfo})
            let passiveID = newAssign.passiveID
            
            newAssign.isOnCD = false;
            newAssign.currentCD = 0;
            
            if (Number.isInteger(passiveID)){
                newAssign.passive = passiveData.find(passive => passive.id === passiveID);
                delete newAssign.passiveID;
            }
        }
       
        if (monItemInfo){
            newAssign = new artifacts({...monItemInfo})
            newAssign.equipped = false;
            
        }
       
        if (dropTableInfo){
            newAssign = new assign({...dropTableInfo})
        }

        
        return newAssign
        }
        catch (error) {
            console.error(`cannot Create${id} ${error.message}`);
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



