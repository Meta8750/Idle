import { attackData } from "./AttackDexData.ts";
class Attack{
    constructor(attackData: any){
            Object.assign(this, attackData)
    }
}

export default class AttackDex{
    constructor(){
    }
    generateAttack(id: number){
        const attackInfo = attackData.find(attack => attack.id === id);
        if (!attackInfo) {
            throw new Error(`Attack with id ${id} not found`);
        }
        const newAttack = new Attack({...attackInfo})
        return newAttack

    }
}

 

  
