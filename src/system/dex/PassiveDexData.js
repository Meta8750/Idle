

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
                mon.temp.stats.armour += 10
                mon.temp.stats.MR += 10
               
                mon.status =  {
                    aggro: 3
                }
            }
            }
           
    },
    
]

