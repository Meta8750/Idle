import { v4 as uuidv4 } from 'uuid';

interface TempStats {
    tempAD: number;
    tempAP: number;
    tempArmor: number;
    tempMR: number;
    tempMS: number;
    tempCritRate: number;
    tempCritDamage: number;
    tempArmorPen: number;
    tempMana: number;
    tempHealth: number;
    tempDmgAmp: number;
}

export default class Animon {
    name: string;
    level: number;
    maxLevel: number;
    rarity: string;
    type: string;
    role: string;
    attacks: any[];
    maxHealth: number;
    healthGrowth: number;
    baseAD: number;
    ADGrowth: number;
    baseAP: number;
    APGrowth: number;
    baseArmor: number;
    armorGrowth: number;
    baseMR: number;
    MRGrowth: number;
    baseMS: number;
    MSGrowth: number;
    maxMana: number;
    manaGrowth: number;
    baseCritRate: number;
    baseCritDamage: number;
    armorPen: number;
    mrPen: number;
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
    maxHealthDmg: number;
    currentHealthDmg: number;
    temp: TempStats;
    itemSlot: any[];
    
    constructor(monData: any) {
        Object.assign(this, monData)
        this.maxLevel = 0
        this.maxMana = monData.maxMana + (this.manaGrowth * this.level)
        this.maxHealth = monData.maxHealth + (this.healthGrowth * this.level)
        this.baseAD = monData.baseAD + (this.ADGrowth * this.level)
        this.baseAP = monData.baseAP + (this.APGrowth * this.level)
        this.baseArmor = monData.baseArmor + (this.armorGrowth * this.level)
        this.baseMR = monData.baseMR + (this.MRGrowth * this.level)
        this.baseMS = monData.baseMS + (this.MSGrowth * this.level)

        this.mana = this.maxMana
        this.health = this.maxHealth
        this.exp = 0
        this.nextLevel = this.calculateNextLevel()
        this.itemSlot = [];
        
        this.id = monData.id
        this.img = `/animon/${this.id}.gif`
        this.uid = uuidv4()
        this.dmgDealt = 0
        this.dmg = 0
        
        this.alive = true

        this.temp = {
            tempAD: 0,
            tempAP: 0,
            tempArmor: 0,
            tempMR: 0,
            tempMS: 0,
            tempCritRate: 0,
            tempCritDamage: 0,
            tempArmorPen: 0,
            tempMana: 0,
            tempHealth: 0,
            tempDmgAmp: 0
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
        if (this.exp >= this.nextLevel){
            this.level++
            this.baseAD += this.ADGrowth
            this.baseAP += this.APGrowth
            this.baseArmor += this.armorGrowth
            this.baseMR += this.MRGrowth
            this.baseMS += this.MSGrowth
            this.maxHealth += this.healthGrowth
            this.health = this.maxHealth
            this.maxMana += this.manaGrowth
            this.nextLevel = this.calculateNextLevel()
            this.exp = 0
        }
    }
    calculateNextLevel(){
        return Math.pow(1.16, this.level) + 10 * this.level * (this.level / 2) + 4;
    }

    calculateDmg(attack: any, attacker: any){

        this.dmgDealt = this.health
        this.dmg = attack.baseDMG + (attacker.baseAD + attack.adScaling) + (attacker.baseAP + attack.apScaling) 
        if (Math.random() <= attacker.baseCritRate) {
            this.dmg *= attacker.baseCritDamage
        }
        this.health -= this.dmg
        if (this.health <= 0){
            this.alive = false
        }

        
        return this.dmgDealt -= this.health //
    }

    resetTempStats() {
        this.temp = {
            tempAD: 0,
            tempAP: 0,
            tempArmor: 0,
            tempMR: 0,
            tempMS: 0,
            tempCritRate: 0,
            tempCritDamage: 0,
            tempArmorPen: 0,
            tempMana: 0,
            tempHealth: 0,
            tempDmgAmp: 0
        };
    }
    
}
