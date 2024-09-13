import Animon from "./Animon.ts";
import { monData } from "./MonDexData.ts";

export default class MonDex{
    constructor(){
    }
    generateMon(id: number){
        const monInfo = monData.find(mon => mon.id === id);
        if (!monInfo) {
            throw new Error(`Mon with id ${id} not found`);
        }
        const newMon = new Animon({ ...monInfo });
        return newMon

    }
}

 
    
  
