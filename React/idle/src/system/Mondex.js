import Animon from "./Animon";
import { monData } from "./MonDexData";

export default class MonDex{
    constructor(){
    }
    generateMon(id){
        const monInfo = monData.find(mon => mon.id === id);
        if (!monInfo) {
            throw new Error(`Mon with id ${id} not found`);
        }
        //name, id, level, rarity, type, role, attacks, maxhealth, healthGrowth, baseAD, ADGrowth, baseAP, APGrowth, 
        //baseArmor, armorGrowth, baseMR,MRGrowth, baseMS, MSGrowth, maxMana, manaGrowth,baseCritRate,baseCritDamage, 
        //armorPen, mrPen
        const newMon = new Animon(
            monInfo.name,
            monInfo.id,
            monInfo.level,
            monInfo.rarity,
            monInfo.type,
            monInfo.role,
            monInfo.attacks,
            monInfo.maxHealth,
            monInfo.healthGrowth,
            monInfo.baseAD,
            monInfo.ADGrowth,
            monInfo.baseAP,
            monInfo.APGrowth,
            monInfo.baseArmor,
            monInfo.armorGrowth,
            monInfo.baseMR,
            monInfo.MRGrowth,
            monInfo.baseMS,
            monInfo.MSGrowth,
            monInfo.maxMana,
            monInfo.manaGrowth,
            monInfo.baseCritRate,
            monInfo.baseCritDamage,
            monInfo.armorPen,
            monInfo.mrPen,
        );

        return newMon

    }
}

 
    
  
