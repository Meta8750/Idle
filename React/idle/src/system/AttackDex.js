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
            newAttack.name,
            newAttack.id,
            newAttack.level,
            newAttack.type,
            newAttack.baseDMG,
            newAttack.adScaling,
            newAttack.apScaling,
            newAttack.manaCost,
            newAttack.armorPen,
            newAttack.mrPen,
            newAttack.lifeSteal,
            newAttack.selfHeal,
            newAttack.allyHeal,
            newAttack.buffs,
            newAttack.debuffs,
            
        );

        return newAttack

    }
}

 

  
