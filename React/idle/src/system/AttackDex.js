import Attack from "./Attack.js";
import { attackData } from "./AttackDexData.js";

export default class AttackDex{
    constructor(){
    }
    generateAttack(id){
        const attackInfo = attackData.find(attack => attack.id === id);
        if (!attackInfo) {
            throw new Error(`Mon with id ${id} not found`);
        }

        const newAttack = new Attack(
            attackInfo.name,
            attackInfo.id,
            attackInfo.level,
            attackInfo.rarity,
            attackInfo.type,
            attackInfo.role,
            attackInfo.maxHealth,
            attackInfo.healthGrowth,
            
        );

        return newAttack

    }
}

 

  
