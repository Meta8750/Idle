import React from 'react';

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
    buffs?: {},
    debuffs?: {}
    passive: (animon : any) => void
    description: (animon: any, attack: AttackData) => JSX.Element;
    
}

const displayDmg = (animon: any, attack: any) => {
    return (
       
            <div>
            <span className={attack.type === "AP" ? "text-blue-600" : "text-orange-500"}>
                {Math.floor(attack.baseDMG + animon.baseAD * attack.adScaling + animon.baseAP * attack.apScaling)}
            </span>{" "}
            ={" "}
            <span className="text-orange-500">
                {attack.baseDMG} + {animon.baseAD * attack.adScaling} ({attack.adScaling * 100}%)
            </span>{" "}
            +{" "}
            <span className={"text-blue-600"}>
                {attack.baseDMG} + {animon.baseAP * attack.apScaling} ({attack.apScaling * 100}%)
            </span>
            </div>
    );

}

export const attackData: AttackData[] = [
    {
        name: "Fireball",
        id: 20000,
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

        passive: (animon) => {
            
        },
        
        description: (animon, attack) => {
            const { baseAD, baseAP } = animon;
            return <li>{attack.name} deals{" "} single target magic damage {displayDmg(animon, attack)}</li> 
                    
            
        }
    },

    {
        name: "Ammagedon",
        id: 20999,
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
        passive: (mon) => {
            const prev = mon.maxHealth
            mon.maxHealth *= 2
            mon.temp.health *= 2
            mon.temp.maxHealth += mon.maxHealth - prev
        },
        description: (animon, attack) => {
            const { baseAD, baseAP } = animon;
            return (
                <li>
                    {attack.name} deals n{" "}
                    <span className={attack.type === "AP" ? "text-blue-600" : "text-orange-500"}>
                        {Math.floor(attack.baseDMG + baseAD * attack.adScaling + baseAP * attack.apScaling)}
                    </span>{" "}
                    ={" "}
                    <span className="text-orange-500">
                        {attack.baseDMG} + {baseAD * attack.adScaling} ({attack.adScaling * 100}%)
                    </span>{" "}
                    +{" "}
                    <span className={"text-blue-600"}>
                        {attack.baseDMG} + {baseAP * attack.apScaling} ({attack.apScaling * 100}%)
                    </span>
                </li>
            );
        }
       

    },
    
];