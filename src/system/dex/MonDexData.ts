import dex from './generator.ts'

type monData = {
    name: string;
    id: number;
    level: number;
    type: string;
    rarity: string;
    tier: number;
    role: string;
    
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
        maxHealthDmg: number;
        currentHealthDmg:number;
        armourPen: number;
        mrPen: number;

    },
    lifeSteal: number;
    healthGrowth: number;
    ADGrowth: number;
    APGrowth: number;
    armourGrowth: number;
    MRGrowth: number;
    MSGrowth: number;
    manaGrowth: number;
    attacks: any[],
    statusChance: number;
}

export const monData: monData[] = [
    {
        name: "Vagabund",
        id: 10000,
        level: 1,
        rarity: "common",
        tier: 1,
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
        lifeSteal: 0.1,
        statusChance:0.5,
        attacks: [20000, 20000, 20000, 20000],

    },
    {
        name: "Wolf",
        id: 10001,
        level: 1,
        tier: 1,
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
        lifeSteal: 0.1,
        statusChance:0.5,
        attacks: [20000, 20000, 20000, 20000],

    },

    {
        name: "Rose",
        id: 10003,
        level: 1,
        rarity: "common",
        tier: 1,
        type: "Dark",
        role: "DD",
        stats: {
            maxHealth: 120,
            baseAD: 12000000000,
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
        lifeSteal: 0.1,
        statusChance:1,
        attacks: [20001, 20999, 20999, 20999],

    },

    {
        name: "Hell",
        id: 10005,
        level: 1,
        rarity: "SSR",
        tier: 1,
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
        lifeSteal: 0.1,
        statusChance:0.5,
        attacks: [20000, 20999, 20999, 20999],

    },
    
];