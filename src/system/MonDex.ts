import Animon from "./Animon.ts";
import { monData } from "./MonDexData.ts";

//class to generate Animon's 
//Data from an other file names: "MonDexData"
export default class MonDex{
    
    generateMon(id: number){
        const monInfo = monData.find(mon => mon.id === id);
        if (!monInfo) {
            throw new Error(`Mon with id ${id} not found`);
        }
        const newMon = new Animon({ ...monInfo });
        return newMon

    }
}

 
    
  
