import dex from './generator.ts'

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
    baseArmour: number;
    armourGrowth: number;
    baseMR: number;
    MRGrowth: number;
    baseMS: number;
    MSGrowth: number;
    baseCritRate: number;
    baseCritDamage: number;
    maxMana: number;
    manaGrowth: number;
    armourPen: number;
    mrPen: number;
    maxHealthDmg: number;
    currentHealthDmg:number;
    expDrop: number,
    goldDrop: number,
    lootTable: any[],
}

export const monData = [
    {
        name: "Vagabund",
        id: 10000,
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
        baseArmour: 2,
        armourGrowth: 1,
        baseMR: 1,
        MRGrowth: 0.5,
        baseMS: 300,  
        MSGrowth: 5,
        baseCritRate: 0.05,
        baseCritDamage: 0.2,
        maxMana: 100,
        manaGrowth: 10,
        armourPen: 0,
        mrPen: 0,
        maxHealthDmg: 0,
        currentHealthDmg: 0,
        attacks: [20000, 20000, 20000, 20000],

    },
    {
        name: "Wolf",
        id: 10001,
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
        baseArmour: 3,
        armourGrowth: 1.2,
        baseMR: 2,
        MRGrowth: 0.6,
        baseMS: 320,
        MSGrowth: 6,
        baseCritRate: 0.05,
        baseCritDamage: 0.2,
        maxMana: 101,
        manaGrowth: 10,
        armourPen: 0,
        mrPen: 0,
        maxHealthDmg: 0,
        currentHealthDmg: 0,
        attacks: [20000, 20000, 20000, 20000],

    },

    {
        name: "Hell",
        id: 10005,
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
        baseArmour: 3,
        armourGrowth: 1.2,
        baseMR: 2,
        MRGrowth: 0.6,
        baseMS: 320,
        MSGrowth: 6,
        baseCritRate: 0.5,
        baseCritDamage: 2,
        maxMana: 100,
        manaGrowth: 10,
        armourPen: 0,
        mrPen: 0,
        maxHealthDmg: 0,
        currentHealthDmg: 0,
        attacks: [20000, 20999, 20999, 20999],

    },
    
];