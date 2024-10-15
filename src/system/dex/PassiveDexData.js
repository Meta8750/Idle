

export const passiveData = [
    {
        id:50000,
        passive: (mon, phase) => {
            if (phase === "End phase"){
                mon.setHealth(10)
            }
           
           
        }
    },
    {
        id:50001,
        passive: (mon, phase) => {
            if(phase === "End phase"){
                mon.temp.stats.baseArmor += 10
                mon.temp.stats.baseMR += 10
                mon.status =  {
                    aggro: 3
                }
            }
            }
           
    },
    
]

