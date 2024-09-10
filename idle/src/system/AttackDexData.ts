type AttackData = {
    name: string,
    id: number,
    level: number,
    type: string,
    baseDMG: number,
    adScaling: number,
    apScaling: number,
    manaCost: number,
    armorPen: number,
    mrPen: number,
    lifeSteal: number,
    selfHeal: number,
    allyHeal: number,
    aoe: boolean,
    buffs: {},
    debuffs: {}

}

export const attackData: AttackData[] = [
    {
        name: "Fireball",
        id: 0,
        level: 1,
        type: "AP",
        baseDMG: 40,
        adScaling: 1,
        apScaling: 0.5,

        manaCost: 10,

        armorPen:0,
        mrPen:0,

        lifeSteal:0,
        selfHeal:0,
        allyHeal:0,
        aoe: false,

        buffs:{},
        debuffs:{},


    },
    {
        name: "Ammagedon",
        id: 999,
        level: 1,
        type: "AD",
        baseDMG: 9999999,
        adScaling: 999,
        apScaling: 999,

        manaCost: 10,

        armorPen:0,
        mrPen:0,

        lifeSteal:0,
        selfHeal:0,
        allyHeal:0,
        aoe:true,

        buffs:{},
        debuffs:{},

    },
    
];