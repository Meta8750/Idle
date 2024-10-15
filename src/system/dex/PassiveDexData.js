

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
                mon.temp.armour += 10
                mon.temp.MR += 10
               
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
                mon.temp.armour += 10
                mon.temp.MR += 10
                mon.temp.AD += mon.stats.maxHealth * 0.01
               
                mon.status =  {
                    aggro: 2
                }
            }
            }
           
    },
    
]

