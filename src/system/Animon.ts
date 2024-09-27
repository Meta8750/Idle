import { v4 as uuidv4 } from 'uuid';

interface TempStats {
    AD: number;
    AP: number;
    armour: number;
    MR: number;
    MS: number;
    critRate: number;
    critDamage: number;
    armourPen: number;
    mrPen: number;
    mana: number;
    health: number;
    maxHealth: number;
    dmgAmp: number;
}

export default class Animon {
    name: string;
    level: number;
    maxLevel: number;
    rarity: string;
    type: string;
    role: string;
    attacks: any[];
    healthGrowth: number;
    stats:{
        maxHealth: number;
        baseAD: number;
        baseAP: number;
        baseArmour: number;
        baseMR: number;
        maxMana: number;
        baseMS: number;
        baseCritRate: number;
        baseCritDamage: number;
        armourPen: number;
        mrPen: number;
        maxHealthDmg: number;
    currentHealthDmg: number;
    }
    ADGrowth: number;
    APGrowth: number;
    armourGrowth: number;
    MRGrowth: number;
    MSGrowth: number;
    manaGrowth: number;
    mana: number;
    health: number;
    exp: number;
    nextLevel: number;
    id: number
    img: string;
    dmgDealt: number;
    dmg: number;
    alive: boolean;
    uid: string;
    temp: TempStats;
    ADReduction:number;
    APReduction:number;
    itemSlot: any[];
    equipment: {
        chain: any,
        ring: any,
        necklace: any,
        head: any,
        book: any,
    }
    
    constructor(monData: any) {
        Object.assign(this, monData)

        this.maxLevel = 100
        this.stats = {
            maxMana:    monData.stats.maxMana + (this.manaGrowth * this.level),
            maxHealth:  monData.stats.maxHealth + (this.healthGrowth * this.level),
            baseAD:     monData.stats.baseAD + (this.ADGrowth * this.level),
            baseAP:     monData.stats.baseAP + (this.APGrowth * this.level),
            baseArmour: monData.stats.baseArmour + (this.armourGrowth * this.level),
            baseMR:     monData.stats.baseMR + (this.MRGrowth * this.level),
            baseMS:     monData.stats.baseMS + (this.MSGrowth * this.level),
            baseCritDamage: monData.stats.baseCritDamage,
            baseCritRate:  monData.stats.baseCritRate,
            armourPen: monData.stats.armourPen,
            mrPen:  monData.stats.mrPen,
            currentHealthDmg:  monData.stats.currentHealthDmg,
            maxHealthDmg: monData.stats.maxHealthDmg,


        }

        this.ADReduction = this.calculateDmgReduction(this.stats.baseArmour)
        this.APReduction = this.calculateDmgReduction(this.stats.baseMR)
       
        this.mana = this.stats.maxMana
        this.health = this.stats.maxHealth
        this.exp = 0
        this.nextLevel = this.calculateNextLevel()
        this.itemSlot = [];
        
        this.id = monData.id
        this.img = `/animon/${this.id}.gif`
        this.uid = uuidv4()
        this.dmgDealt = 0
        this.dmg = 0
        
        this.alive = true
     

        this.equipment = {
            chain: null,
            ring: null,
            necklace: null,
            head: null,
            book: null,
        }

        this.temp = {
            AD: 0,
            AP: 0,
            armour: 0,
            MR: 0,
            MS: 0,
            critRate: 0,
            critDamage: 0,
            armourPen: 0,
            mrPen: 0,
            mana: 0,
            health: 0,
            maxHealth: 0,
            dmgAmp: 0
        };
    }
    getImageElement(x: string, y: string) {
        const style = {
            width: x || "100px",
            height: y || "100px",
            objectFit: "cover",
        };
    }
    levelProgess() :void{
        if (this.level <= this.maxLevel){
            if (this.exp >= this.nextLevel){
                this.level++
                this.stats.baseAD += this.ADGrowth
                this.stats.baseAP += this.APGrowth
                this.stats.baseArmour += this.armourGrowth
                this.stats.baseMR += this.MRGrowth
                this.stats.baseMS += this.MSGrowth
                this.stats.maxHealth += this.healthGrowth
                this.health = this.stats.maxHealth
                this.stats.maxMana += this.manaGrowth
                this.nextLevel = this.calculateNextLevel()
                this.ADReduction = this.calculateDmgReduction(this.stats.baseArmour)
                this.APReduction = this.calculateDmgReduction(this.stats.baseMR)
                this.exp = 0
            }
        }
        
    }
    calculateNextLevel(){
        return Math.round(Math.pow(1.16, this.level) + 10 * this.level * (this.level / 2) + 4);
    }
    
    // attacker = this.mon and defender = enemy
    calculateDmg(attack: any, attacker: any, defender: any){
        let temp  = this.temp

        this.dmg = attack.baseDMG + ((attacker.stats.baseAD + temp.AD) * attack.adScaling) 
        
        this.dmg += ((attacker.stats.baseAP + temp.AP) * attack.apScaling)
       
        if (attack.type == "AD"){
            let reduceDmg = this.calculateDmgReduction((this.stats.armourPen + temp.armourPen) * (defender.stats.baseArmour + defender.temp.armour))
            this.dmg = this.dmg - ( reduceDmg * this.dmg )
           
        }
        
        if (attack.type == "AP"){
            let reduceDmg = this.calculateDmgReduction((this.stats.mrPen + temp.mrPen ) * (defender.stats.baseMR + defender.temp.MR))

            this.dmg = this.dmg - ( reduceDmg * this.dmg )
        }   
        
        if (Math.random() <= attacker.stats.baseCritRate + temp.critRate) {   this.dmg *= (attacker.stats.baseCritDamage + temp.critDamage) }
        this.dmg = this.dmg + (this.dmg * temp.dmgAmp)
        
        defender.health -= Math.round(this.dmg)
        
        if (this.health <= 0){ this.alive = false } //check if animon is dead
        if (defender.health <= 0){ defender.alive = false } //check if defender is alive
            
        return Math.round(this.dmg)
    }

    calculateDmgReduction(defense: number): number{
        return Math.round(100 * (defense / (defense + 100)))
    }


    resetTempStats() {
        this.stats.maxHealth -= this.temp.maxHealth
        this.stats.baseMS -= this.temp.MS
        this.health = this.stats.maxHealth
        this.temp = {
            AD: 0,
            AP: 0,
            armour: 0,
            MR: 0,
            MS: 0,
            critRate: 0,
            critDamage: 0,
            armourPen: 0,
            mrPen: 0,
            mana: 0,
            health: 0,
            maxHealth: 0,
            dmgAmp: 0
        };
        
        
    }
  

    equipItem(item): void {
        const { slotType } = item;
        
        
        if (this.equipment[slotType]) {
            this.removeItemStats()
            this.removeItem(slotType); // Entferne das aktuelle Item im Slot
        
        } else {
            
            if (item.equipped === false){
                this.equipment[slotType] = item;
                item.equipped = true;
                this.getItemStats()
            }
        
        }
 

              
    }

    removeItem(slotType): void {
        const currentItem = this.equipment[slotType];
       
        if (currentItem) {
            currentItem.equipped = false;
            this.equipment[slotType] = null;
        }
       
        
    }
    getItemStats(): void {
        // Iteriere über die ausgerüsteten Items
      
        for (const slot in this.equipment) {
            const item = this.equipment[slot]; // Hole das ausgerüstete Item für jeden Slot
           
            if (item && item.temp) { // Prüfen, ob ein Item vorhanden ist und temp-Stats hat
                for (const stat in item.temp) {
                  
                    if (this.stats[stat] !== undefined) {
                      
                        
                     if(Number.isInteger(this.temp[stat])){
                          
                            this.stats[stat] *= item.temp[stat];
                           
                        } else {
                        
                            this.stats[stat] += item.temp[stat]; // Addiere die Stats
                           
                        }
                        
                    } else {
                        this.stats[stat] = item.temp[stat]; // Initialisiere, falls der Stat nicht existiert
        }}}}}

        removeItemStats(): void {
            // Iteriere über die ausgerüsteten Items
            for (const slot in this.equipment) {
                const item = this.equipment[slot]; // Hole das ausgerüstete Item für jeden Slot
        
                if (item && item.temp) { // Prüfen, ob ein Item vorhanden ist und temp-Stats hat
                    for (const stat in item.temp) {
                        if (this.stats[stat] !== undefined) {
                            if(Number.isInteger(this.temp[stat])){
                                this.stats[stat] /= item.temp[stat];
                              
                            } else {
                                this.stats[stat] -= item.temp[stat]; // Addiere die Stats
                               
                            }
                            
                        } else {
                            this.stats[stat] = item.temp[stat]; // Initialisiere, falls der Stat nicht existiert
        }}}}}
           

}
