import Attack from "./Attack.js";
import { attackData } from "./AttackDexData.js";

export default class AttackDex{
    constructor(){
    }
    generateAttack(id){
        const attackInfo = attackData.find(attack => attack.id === id);
        if (!attackInfo) {
            throw new Error(`Attack with id ${id} not found`);
        }
        
        const newAttack = new Attack(
            attackInfo.name,
            attackInfo.id,
            attackInfo.level,
            attackInfo.type,
            attackInfo.baseDMG,
            attackInfo.adScaling,
            attackInfo.apScaling,
            attackInfo.manaCost,
            attackInfo.armorPen,
            attackInfo.mrPen,
            attackInfo.lifeSteal,
            attackInfo.selfHeal,
            attackInfo.allyHeal,
            attackInfo.buffs,
            attackInfo.debuffs,
            attackInfo.aoe
            
        );

        return newAttack

    }
}

 

  
