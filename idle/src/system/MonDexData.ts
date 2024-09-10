import AttackDex from "./AttackDex.ts";

const attackDex = new AttackDex();
const Fireball = attackDex.generateAttack(0)
const Ammagedon = attackDex.generateAttack(999)

type monData = {
    name: string;
    id: number;
    type: string;
    role: string;
    attacks: any[],
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
    baseCritRate: number;
    baseCritDamage: number;
    maxMana: number;
    manaGrowth: number;
    armorPen: number;
    mrPen: number;
    expDrop: number,
    goldDrop: number,
    lootTable: any[],
}

export const monData = [
    {
        name: "Vagabund",
        id: 0,
        level: 1,
        rarity: "common",
        type: "Fire",
        role: "DD",  
        maxHealth: 100,
        healthGrowth: 10,
        baseAD: 10,
        ADGrowth: 1.5,
        baseAP: 5,
        APGrowth: 0.5,
        baseArmor: 2,
        armorGrowth: 1,
        baseMR: 1,
        MRGrowth: 0.5,
        baseMS: 300,  
        MSGrowth: 5,
        baseCritRate: 0.05,
        baseCritDamage: 0.2,
        maxMana: 100,
        manaGrowth: 10,
        armorPen: 0,
        mrPen: 0,
        attacks: [Fireball, Fireball, Fireball, Fireball],

    },
    {
        name: "Wolf",
        id: 1,
        level: 1,
        rarity: "common",
        type: "Fire",
        role: "DD",
        maxHealth: 120,
        healthGrowth: 12,
        baseAD: 12,
        ADGrowth: 1.8,
        baseAP: 6,
        APGrowth: 0.6,
        baseArmor: 3,
        armorGrowth: 1.2,
        baseMR: 2,
        MRGrowth: 0.6,
        baseMS: 320,
        MSGrowth: 6,
        baseCritRate: 0.05,
        baseCritDamage: 0.2,
        maxMana: 101,
        manaGrowth: 10,
        armorPen: 0,
        mrPen: 0,
        attacks: [Fireball, Fireball, Fireball, Fireball],

    },

    {
        name: "Hell",
        id: 5,
        level: 100,
        rarity: "common",
        type: "Fire",
        role: "DD",
        maxHealth: 120,
        healthGrowth: 12,
        baseAD: 12,
        ADGrowth: 1.8,
        baseAP: 6,
        APGrowth: 0.6,
        baseArmor: 3,
        armorGrowth: 1.2,
        baseMR: 2,
        MRGrowth: 0.6,
        baseMS: 320,
        MSGrowth: 6,
        baseCritRate: 0.5,
        baseCritDamage: 2,
        maxMana: 100,
        manaGrowth: 10,
        armorPen: 0,
        mrPen: 0,
        attacks: [Fireball, Ammagedon, Ammagedon, Ammagedon],

    },
    
];