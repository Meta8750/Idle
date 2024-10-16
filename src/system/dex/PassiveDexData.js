

export const passiveData = [
    {
        id:50000,
        effect: (mon, phase) => {
            if (phase === "End phase"){
                mon.setHealth(10)
                
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
                mon.stats.maxHealth *= 2.5
               
                mon.status =  {
                    aggro: 2
                }
            }
            }
           
    },
    
]

