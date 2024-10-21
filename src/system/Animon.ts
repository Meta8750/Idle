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

const elementMatrix = {
            //    D    L    W    P    F    E    S    I
    "Dark":     [1.0, 1.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    "Light":    [1.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0],
    "Water":    [1.0, 1.0, 1.0, 1.5, 0.5, 1.5, 0.0, 1.0],
    "Plant":    [1.0, 1.0, 0.5, 1.0, 1.5, 0.5, 0.0, 1.5],
    "Fire":     [1.0, 1.0, 1.5, 0.5, 0.5, 1.0, 1.5, 0.5],
    "Electro":  [1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.5, 1.0],
    "Stone":    [1.0, 1.0, 1.5, 1.5, 0.5, 0.0, 1.0, 0.5],
    "Ice":      [1.0, 1.0, 1.0, 0.5, 1.5, 1.0, 1.5, 1.0]
};

const elementOrder = ["Dark", "Light", "Water", "Plant", "Fire", "Electro", "Stone", "Ice"];


export default class Animon {
    name: string;
    level: number;
    maxLevel: number;
    rarity: string;
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
    ADReduction:number;
    APReduction:number;
    itemSlot: any[];
    kills: number;
    lifeSteal: number;
    status:{};
    ally: boolean;
    heal:number;
    aggro: boolean;
    immune: boolean;
    boss: boolean;
    attackCritted: boolean;
    elementMultiplier: number;
    dmgAmp: number; 
    dmgTaken: number; 
    healingDone: number;
    roundReset: number;
    shield: number;
    nextTier: number;
    tier: number;
    reqCells:number;
    statusChance: number;
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
        this.shield = 0;
        this.id = monData.id
        this.img = `/animon/${this.id}.gif`
        this.uid = uuidv4()
      
        this.dmg = 0
        this.dmgAmp = 0;

        this.dmgDealt = 0;   
        this.dmgTaken = 0;  
        this.healingDone = 0;

        this.ally = false
        this.alive = true
        this.roundReset = 0;
        this.nextTier = monData.tier + 1;
        this.reqCells = 5
       
        this.equipment = {
            chain: null,
            ring: null,
            necklace: null,
            head: null,
            book: null,
        }

    }

    monStats(){
       
    }
    upgradeTier(){
        let level = this.level - 1
        let tierMultiplier = 0.5 // per extra tier growth stats are 50% increased

        this.tier++
        this.stats.baseAD +=     this.ADGrowth * tierMultiplier * level 
        this.stats.baseAP +=     this.APGrowth * tierMultiplier * level
        this.stats.baseArmour += this.armourGrowth * tierMultiplier * level
        this.stats.baseMR +=     this.MRGrowth * tierMultiplier * level
        this.stats.baseMS +=     this.MSGrowth * tierMultiplier * level
        this.stats.maxHealth +=  this.healthGrowth * tierMultiplier * level
        this.stats.maxMana +=    this.manaGrowth * tierMultiplier * level
        this.health = this.stats.maxHealth
        this.ADReduction = this.calculateDmgReduction(this.stats.baseArmour)
        this.APReduction = this.calculateDmgReduction(this.stats.baseMR)
        this.reqCells += 5
        this.maxLevel += 5
    }
    
    levelProgess(level? : number) :void{
        let tier = this.tier * 0.5 + 1 // per extra tier growth stats are 50% increased
        
        if (!level){
            level = 1
        }
       
        if (this.level <= this.maxLevel){
            if (this.exp >= this.nextLevel){
                this.level++
                this.stats.baseAD += this.ADGrowth * tier * level 
                this.stats.baseAP += this.APGrowth * tier * level
                this.stats.baseArmour += this.armourGrowth * tier * level
                this.stats.baseMR += this.MRGrowth * tier * level
                this.stats.baseMS += this.MSGrowth * tier * level
                this.stats.maxHealth += this.healthGrowth * tier * level
                this.health = this.stats.maxHealth
                this.stats.maxMana += this.manaGrowth * tier * level
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
    ammountForNextTier(){
        let cells = 5
        return cells
    }

    cdHandle(){
        for(const attack of this.attacks){
            if (attack.currentCD > 0){
                attack.currentCD--;
            }
        }
    }
    
    calcStatus(){
        for (let status in this.status) {
            // Beispiel: Reduziere die Dauer des Status-Effekts
            if (this.status[status] > 0) {
                if (status === "bleeding"){
                    this.health *= 0.9
                }
                if (status === "poised"){
                    this.health -= this.stats.maxHealth * 0.95
                }
                if (status === "burning"){
                    this.stats.baseArmour *= 0.9
                    this.stats.baseMR *= 0.9
                }
                if (status === "aggro"){
                    this.aggro = true
                }
                this.status[status] -= 1;
                // Entferne den Status, wenn die Dauer 0 erreicht hat
                if (this.status[status] <= 0) {
                    if (status === "aggro"){ this.aggro = false }
                    delete this.status[status];
                }
            }
        }
    }

    getEffectiveness(attackElement: string, defenderElement: string){
        if (attackElement === "Normal" || defenderElement === "Normal"){
            return 1
        }
        const attackerIndex = elementOrder.indexOf(attackElement);
        const defenderIndex = elementOrder.indexOf(defenderElement);
        
        if (attackerIndex === -1 || defenderIndex === -1) {
            throw new Error(`unvalid type ${attackElement} ${defenderElement} ${attackerIndex} ${defenderIndex}`);
        }
        
        return elementMatrix[defenderElement][attackerIndex];
    }
    // attacker = this.mon and defender = enemy
    calculateDmg(attack: any, attacker: any, defender: any){

        this.attackCritted = false
        this.elementMultiplier = 1
        this.heal = 0
        let rng = Math.random()
       
        if (attack.status){
            for (const status in attack.status){
                if (rng <= this.statusChance){
                    defender.status[status] = attack.status[status]; 
                }
            }
        }

        this.dmg = attack.baseDMG + (attacker.stats.baseAD * attack.adScaling  || 0) 
        this.dmg += (attacker.stats.baseAP  * attack.apScaling  || 0)
        this.dmg += (attacker.stats.baseArmour * attack.armourScaling || 0)
        this.dmg += (attacker.stats.baseMR * attack.MRScaling  || 0)
        
        if(attack.heal){
            this.dmg = Math.round(this.dmg)
            defender.setHealth(this.dmg)
            this.healingDone += this.dmg
            return this.dmg
        }
        
        if (attack.type == "AD"){
            let reduceDmg = this.calculateDmgReduction(defender.stats.baseArmour - (this.stats.armourPen  || 0 *  defender.stats.baseArmour)) / 100
            this.dmg = this.dmg - ( reduceDmg * this.dmg )
           
        }
        
        if (attack.type == "AP"){
            let reduceDmg = this.calculateDmgReduction( defender.stats.baseMR  - (this.stats.mrPen  || 0 * defender.stats.baseMR)) / 100

            this.dmg = this.dmg - ( reduceDmg * this.dmg )
        }   
        
        if (Math.random() <= attacker.stats.baseCritRate) {  
             this.dmg *= (attacker.stats.baseCritDamage)
             this.attackCritted = true
        }
      
             this.dmg += defender.stats.maxHealth * attack.maxHealthDmg  || 0
        
   
            this.dmg += defender.health * attack.currentHealthDmg  || 0    
        
        
        this.elementMultiplier = this.getEffectiveness(attack.element, defender.element)
        this.dmg *= this.elementMultiplier
        this.dmg = this.dmg + (this.dmg * this.dmgAmp)
        this.dmg = Math.round(this.dmg)
        
        this.dmgDealt += this.dmg
        defender.dmgTaken += this.dmg

        if (defender.shield > 0){
            let shieldDmg = this.dmg - defender.shield
            defender.shield -= this.dmg
           
            if (defender.shield > 0){
                return Math.round(this.dmg)
            }
            this.dmg -= shieldDmg
            defender.shield = 0
            
        }
        defender.health -= this.dmg
        if (defender.alive){
            this.heal = this.dmg * this.lifeSteal
            this.setHealth(this.heal)
        }

        if (this.health <= 0){ this.alive = false } //check if animon is dead
        if (defender.health <= 0 && defender.alive === true){ 
            defender.alive = false
            this.kills++

        } 
        this.cdHandle()
        if(attack.cd !== undefined){
            attack.currentCD = attack.cd
        }
            
        return Math.round(this.dmg)
    }

    calculateDmgReduction(defense: number): number{
        return Math.round(100 * (defense / (defense + 100)))
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
           
            if (item && item.stats) { // Prüfen, ob ein Item vorhanden ist und temp-Stats hat
                for (const stat in item.stats) {
                  
                    if (this.stats[stat] !== undefined) {
                      
                    if(Number.isInteger(item.stats[stat])){
                          
                            this.stats[stat] *= item.stats[stat];
                           
                        } else {
                        
                            this.stats[stat] += item.stats[stat]; // Addiere die Stats
                           
                        }
                        
                    } else {
                        this.stats[stat] = item.stats[stat]; // Initialisiere, falls der Stat nicht existiert
        }}}}}

    removeItemStats(): void {
        // Iteriere über die ausgerüsteten Items
        for (const slot in this.equipment) {
            const item = this.equipment[slot]; // Hole das ausgerüstete Item für jeden Slot
    
            if (item && item.stats) { // Prüfen, ob ein Item vorhanden ist und temp-Stats hat
                for (const stat in item.stats) {
                    if (this.stats[stat] !== undefined) {
                        if(Number.isInteger(this.stats[stat])){
                            this.stats[stat] /= item.stats[stat];
                            
                        } else {
                            this.stats[stat] -= item.stats[stat]; // Addiere die Stats
                            
                        }
                        
                    } else {
                        this.stats[stat] = item.stats[stat]; // Initialisiere, falls der Stat nicht existiert
    }}}}}
        
    setHealth(health){
        let BHealing = this.health;
        if (health.isInteger){
            this.health *= health;
        } else {
            this.health += health;
        }
        if (health > 0){
            this.healingDone += (this.health - BHealing);
        } else {
            this.dmgTaken += (this.health - BHealing)
        }
        
        if (this.health > this.stats.maxHealth){
            this.health = this.stats.maxHealth;
        }
    }
}
