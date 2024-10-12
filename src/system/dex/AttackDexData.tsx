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
    heal: boolean,
    aoe: boolean,
    buffs?: {},
    debuffs?: {},
    status?:{},
    passive: (animon : any) => void
    description: (animon: any, attack: AttackData) => JSX.Element;
    
}

const displayDmg = (animon: any, attack: any) => {
    return (
       
            <div>
            <span className={attack.type === "AP" ? "text-blue-600" : "text-orange-500"}>
                {Math.floor(attack.baseDMG + animon.stats.baseAD * attack.adScaling + animon.stats.baseAP * attack.apScaling)}
            </span>{" "}
            ={" "} {attack.baseDMG} {" "}
            <span className="text-orange-500">
                 + {animon.stats.baseAD * attack.adScaling} ({attack.adScaling * 100}%)
            </span>{" "}
            {" "}
            <span className={"text-blue-600"}>
                 + {animon.stats.baseAP * attack.apScaling} ({attack.apScaling * 100}%)
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

        heal: false,
        aoe: false,

        passive: (mon) => {
            
        },
        
        description: (mon, attack) => {
            const { baseAD, baseAP } = mon;
            return <li>{attack.name} deals{" "} single target magic damage {displayDmg(mon, attack)}</li> 
                    
            
        }
    },

    {
        name: "Death Lotus",
        id: 20001,
        level: 1,
        type: "AP",
        baseDMG: 40,
        adScaling: 1,
        apScaling: 0.5,
        manaCost: 10,
        armorPen:0,
        mrPen:0,
        heal: false,
        aoe: false,

        status:{
            bleeding: 3,
            poised: 3,
            burning: 3,
        },

        passive: (mon) => {
            
            if (mon.kills > 0){
                mon.kills = 0 
                return true // true == reset mon is allowed to attack again
            }
           
        },
        
        description: (animon, attack) => {
            const { baseAD, baseAP } = animon;
            return (
                <div>
                    <p>{attack.name} deals{" "} single target magic damage {displayDmg(animon, attack)}</p> 
                    <p>the attacker gets an extra round if the target die's</p>
                </div>
            )
                    
        }
    },

    {
        name: "Bite",
        id: 20002,
        level: 1,
        type: "AD",
        baseDMG: 10,
        adScaling: 1,
        apScaling: 0.1,
        manaCost: 10,
        armorPen:0.1,
        mrPen:0,
        heal: false,
        aoe:false,
        passive: (mon) => {
           // mon.health *= 0.1
        },
        description: (mon, attack) => {
            return (
                <div>
                    <p>{attack.name} heals {displayDmg(mon, attack)}</p> 
                </div>
            );
        }
       
    },

    {
        name: "Thunder",
        id: 20003,
        level: 1,
        type: "AP",
        baseDMG: 1,
        adScaling: 2,
        apScaling: 0,
        manaCost: 10,
        armorPen:0,
        mrPen:0,
        heal: false,
        aoe:false,
        passive: (mon) => {
           // mon.health *= 0.1
        },
        description: (mon, attack) => {
            return (
                <div>
                    <p>{attack.name} heals {displayDmg(mon, attack)}</p> 
                </div>
            );
        }
       
    },

    {
        name: "Quick Attack",
        id: 20004,
        level: 1,
        type: "AD",
        baseDMG: 10,
        adScaling: 1,
        apScaling: 0,
        manaCost: 10,
        armorPen:0,
        mrPen:0,
        heal: false,
        aoe:false,
        passive: (mon) => {
           mon.temp.MS += 10
        },
        description: (mon, attack) => {
            return (
                <div>
                    <p>{attack.name} heals {displayDmg(mon, attack)}</p> 
                </div>
            );
        }
       
    },
    

    {
        name: "Ammagedon",
        id: 20999,
        level: 1,
        type: "AD",
        baseDMG: 10,
        adScaling: 1,
        apScaling: 0,
        manaCost: 10,
        armorPen:0,
        mrPen:0,
        heal: false,
        aoe:true,
        passive: (mon) => {
            const prev = mon.stats.maxHealth
            mon.stats.maxHealth *= 2
            mon.temp.health *= 2
            mon.temp.maxHealth += mon.stats.maxHealth - prev
            mon.health += mon.stats.maxHealth - prev
        },
        description: (mon, attack) => {
            return (
                <div>
                    <p>{attack.name} deals{" "} aor ad magic damage {displayDmg(mon, attack)}</p> 
                    <p>the attacker gets an extra round if the target die's</p>
                </div>
            );
        }
       
    },
    

    {
        name: "Heal",
        id: 21000,
        level: 1,
        type: "AP",
        baseDMG: 10,
        adScaling: 0,
        apScaling: 1,
        manaCost: 10,
        armorPen:0,
        mrPen:0,
        heal: true,
        aoe:false,
        passive: (mon) => {
           // mon.health *= 0.1
        },
        description: (mon, attack) => {
            return (
                <div>
                    <p>{attack.name} heals {displayDmg(mon, attack)}</p> 
                </div>
            );
        }
       
    },

    
    
];