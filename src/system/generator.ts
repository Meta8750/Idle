import { attackData } from "./AttackDexData.tsx";
import { monData } from "./MonDexData.ts";
import { monItemData } from "./MonItemDexData.ts";


class assign{
    constructor(attackData: any){
            Object.assign(this, attackData)
    }
}

export default class dex{
    
    generate(id: number){
        const Info = attackData.find(attack => attack.id === id);
        if (!Info) {
            throw new Error(`ID ${id} not found`);
        }
        const newAssign = new assign({...Info})
        return newAssign

    }
}

 

  
