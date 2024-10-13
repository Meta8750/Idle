

export const passiveData = [
    {
        id:50000,
        passive: (mon) => {
            mon.health += 10;
           
        }
    },
    {
        id:50001,
        passive: (mon) => {
            mon.stats.baseArmor += 10
            mon.stats.baseMR += 10
            mon.status =  {
                aggro: 3
            }
        }
    },
    
]

