import React from 'react';



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

export const descData = [
    {
      
        id: 60000,
        description: (mon, attack) => {
            const { baseAD, baseAP } = mon;
            return <li>{attack.name} deals{" "} single target magic damage {displayDmg(mon, attack)}</li> 
                    
            
        }
    },


        
    
];