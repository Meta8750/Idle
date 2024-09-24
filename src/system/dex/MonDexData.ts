import dex from './generator.ts'

type monData = {
    name: string;
    id: number;
    type: string;
    role: string;
    attacks: any[],
    stats: {
        maxHealth: number;
        baseAP: number;
        baseAD: number;
        baseArmour: number;
        baseMR: number;
        baseMS: number;
        baseCritRate: number;
        baseCritDamage: number;
        maxMana: number;

    },
    
    healthGrowth: number;
    ADGrowth: number;
    APGrowth: number;
    armourGrowth: number;
    MRGrowth: number;
    MSGrowth: number;
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
        stats: {
            maxHealth: 100,
            baseAD: 10,
            baseAP: 5,
            baseArmour: 2,
            baseMR: 1,
            baseMS: 300,  
            baseCritRate: 0.05,
            baseCritDamage: 0.2,
            maxMana: 100,
            armourPen: 0,
            mrPen: 0,
            maxHealthDmg: 0,
            currentHealthDmg: 0,
        },

        ADGrowth: 1.5,
        APGrowth: 0.5,
        healthGrowth: 10,
        armourGrowth: 1,
        MRGrowth: 0.5,
        MSGrowth: 5,
        manaGrowth: 10,

        attacks: [20000, 20000, 20000, 20000],

    },
    {
        name: "Wolf",
        id: 10001,
        level: 1,
        rarity: "common",
        type: "Fire",
        role: "DD",
        stats: {
            maxHealth: 120,
            baseAD: 12,
            baseAP: 6,
            baseMR: 2,
            baseArmour: 3,
            baseMS: 320,
            baseCritRate: 0.05,
            baseCritDamage: 0.2,
            maxMana: 101,
            armourPen: 0,
            mrPen: 0,
            maxHealthDmg: 0,
            currentHealthDmg: 0,
        },

        ADGrowth: 1.8,
        APGrowth: 0.6,
        healthGrowth: 12,
        armourGrowth: 1.2,
        MRGrowth: 0.6,
        MSGrowth: 6,
        manaGrowth: 10,

        attacks: [20000, 20000, 20000, 20000],

    },

    {
        name: "Hell",
        id: 10005,
        level: 100,
        rarity: "common",
        type: "Fire",
        role: "DD",
        stats: {
            maxHealth: 120,
            baseAD: 12,
            baseAP: 6,
            baseArmour: 3,
            baseMR: 2,
            baseMS: 320,
            baseCritRate: 0.5,
            baseCritDamage: 2,
            maxMana: 100,
            armourPen: 0,
            mrPen: 0,
            maxHealthDmg: 0,
            currentHealthDmg: 0,
        },

       
        ADGrowth: 1.8,
        APGrowth: 0.6,
        healthGrowth: 12,
        armourGrowth: 1.2,
        MRGrowth: 0.6,
        MSGrowth: 6,
        manaGrowth: 10,

        attacks: [20000, 20999, 20999, 20999],

    },
    
];