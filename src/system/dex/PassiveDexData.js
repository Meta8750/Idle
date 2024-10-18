

export const passiveData = [
    {
        id:50000,
        effect: (mon, phase, defender) => {
            if (phase === "End phase"){
                mon.setHealth(10)
                mon.shield += 10
             
                if(mon.kills > 0){
                    mon.roundReset = 1 // use = to make sure its not a stacking effect
                    mon.kills = 0
                }
            }
        }
    },
    {
        id:50001,
        effect: (mon, phase) => {
           
            if(phase === "End phase"){
                mon.stats.armour += 10
                mon.stats.MR += 10
                mon.status =  {
                    aggro: 3
                }
            }
        }
    },
    {
        id:50002,
        effect: (mon, phase) => {
            if(phase === "End phase"){
                mon.stats.armour += 10
                mon.stats.MR += 10
                mon.stats.baseAmour += mon.stats.maxHealth * 0.01
                mon.stats.maxHealth += 5
                mon.status =  {
                    aggro: 1
                }
            }
        }
    },
    {
        id:50003,
        effect: (mon, phase, defender) => {
            if(phase === "End phase"){
                if ((defender.status.bleeding || 0) > 0 ){
                    defender.health -= mon.dmg / 0.4
                 }
            }
        }
    },
    
]

