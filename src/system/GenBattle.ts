import Dex from './dex/generator.ts'

export default class GenBattle {
    dex: any;
    monDex: any;
    stage:number;
    level:number;
    tier: number;

    constructor(){
        this.dex = new Dex()
        this.monDex = this.dex.getMondex() 
        this.stage = 1
        this.level = 1
        this.tier = 1;
    }

     getRandomBatch(batchSize){
        let batch: number[] = [];
        for (let i = 0; i < batchSize; i++) {
          // Wähle ein zufälliges Monster und füge es zum Batch hinzu
          let tierMonDex = this.monDex.filter(mon => mon.tier === this.tier)
          batch.push(tierMonDex[Math.floor(Math.random() * tierMonDex.length)].id);
        }
        return batch;
      }
       
      // Funktion, um mehrere Stages mit zufälligen Monster-Batches zu erstellen
       createStages(stagesCount, batchSize) {
        let stages: any;
        for (let i = 0; i < stagesCount; i++) {
          // Für jede Stage ein Batch zufälliger Monster erstellen
          let stageBatch = this.getRandomBatch( batchSize);
          stages.push(stageBatch);
        }
        return stages;
      }

    getStory(section, zone){

        let stageSize = 1;

        if (section === 5){
          stageSize = 2
        }

        if (zone >= 5){
          stageSize = 2
          if (section === 5){
            stageSize = 3
          }
        }
        
        let tierMonDex = this.monDex.filter(mon => mon.tier === this.tier)

        let batch = this.createStages(stageSize, 4)
      
        return batch

    }
}