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
    maxHealth: number;
    healthGrowth: number;
    baseAD: number;
    ADGrowth: number;
    baseAP: number;
    APGrowth: number;
    baseArmour: number;
    armourGrowth: number;
    baseMR: number;
    MRGrowth: number;
    baseMS: number;
    MSGrowth: number;
    maxMana: number;
    manaGrowth: number;
    baseCritRate: number;
    baseCritDamage: number;
    ArmourPen: number;
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
    ADReduction:number;
    APReduction:number;
    itemSlot: any[];
    
    constructor(monData: any) {
        Object.assign(this, monData)

        this.maxLevel = 0
        this.maxMana = monData.maxMana + (this.manaGrowth * this.level)
        this.maxHealth = monData.maxHealth + (this.healthGrowth * this.level)
        this.baseAD = monData.baseAD + (this.ADGrowth * this.level)
        this.baseAP = monData.baseAP + (this.APGrowth * this.level)
        this.baseArmour = monData.baseArmour + (this.armourGrowth * this.level)
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
        this.ADReduction = this.calculateDmgReduction(this.baseArmour)
        this.APReduction = this.calculateDmgReduction(this.baseMR)

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
        if (this.exp >= this.nextLevel){
            this.level++
            this.baseAD += this.ADGrowth
            this.baseAP += this.APGrowth
            this.baseArmour += this.armourGrowth
            this.baseMR += this.MRGrowth
            this.baseMS += this.MSGrowth
            this.maxHealth += this.healthGrowth
            this.health = this.maxHealth
            this.maxMana += this.manaGrowth
            this.nextLevel = this.calculateNextLevel()
            this.ADReduction = this.calculateDmgReduction(this.baseArmour)
            this.APReduction = this.calculateDmgReduction(this.baseMR)
            this.exp = 0
        }
    }
    calculateNextLevel(){
        return Math.pow(1.16, this.level) + 10 * this.level * (this.level / 2) + 4;
    }
    
    // attacker = this.mon and defender = enemy
    calculateDmg(attack: any, attacker: any, defender: any){

        let temp  = this.temp

        this.dmg = attack.baseDMG + ((attacker.baseAD + temp.AD) * attack.adScaling) 
        this.dmg += ((attacker.baseAP + temp.AP) * attack.apScaling)
        if (attack.type == "AD"){
            let reduceDmg = this.calculateDmgReduction((this.ArmourPen + temp.armourPen) * (defender.baseArmour + defender.temp.armour))
            this.dmg = this.dmg - ( reduceDmg * this.dmg )
        }
        if (attack.type == "AP"){
            let reduceDmg = this.calculateDmgReduction((this.mrPen + temp.mrPen ) * (defender.baseMR + defender.temp.MR))

            this.dmg = this.dmg - ( reduceDmg * this.dmg )
        }   
        
        if (Math.random() <= attacker.baseCritRate + temp.critRate) {
            this.dmg *= (attacker.baseCritDamage + temp.critDamage)
        }
        this.dmg = this.dmg + (this.dmg * temp.dmgAmp)
        
        defender.health -= this.dmg
        
        if (this.health <= 0){ this.alive = false } //check if animon is dead
        if (defender.health <= 0){ defender.alive = true } //check if defender is alive
            
        return this.dmgDealt -= this.health 
    }

    calculateDmgReduction(defense: number): number{
        return 100 * (defense / (defense + 100))
    }

    resetTempStats() {
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
            dmgAmp: 0
        };
    }

   
    
}
