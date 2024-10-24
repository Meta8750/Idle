

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
    {
        id:50004,
        effect: (mon, phase, defender) => {
            if(phase === "End phase"){
                mon.stats.baseArmour *= 1.3
                mon.stats.baseMR *= 1.2
                mon.setHealth((mon.stats.maxHealth - mon.health) * 0.4)
            }
        }
    },
    {
        id:50005,
        effect: (mon, phase, defender) => {
            if(phase === "End phase"){
                mon.status = {
                    aggro:3
                }
                mon.baseAD += 10
            }
        }
    },
    {
        id:50006,
        effect: (mon, phase, defender) => {
               if (mon.alive === false && mon.id === 10115 && phase === "End phase"){
                mon.alive = true
                mon.img = `/animon/10116.gif`
                mon.stats.maxHealth *= 1.3
                mon.health = mon.stats.maxHealth
                mon.stats.baseArmour += 300
                mon.stats.baseMR += 100
                mon.stats.baseAD *= mon.stats.maxHealth * 0.05
                mon.lifeSteal += 0.1
                mon.id++
                
               
            }
        }
    },
    {
        id:50007,
        effect: (mon, phase, defender) => {
            if ((defender.status.burning || 0) > 0 ){
                defender.health -= mon.dmg / 0.3
             }
        }
    },
    {
        id:50008,
        effect: (mon, phase, defender) => {
            if(phase === "End phase"){
                mon.shield += defender.health *= 0.05
            }
        }
    },
    {
        id:50009,
        effect: (mon, phase, defender) => {
            if(phase === "End phase"){
                mon.stats.baseAD += 30
            }
           
        }
    },
    {
        id:50010,
        effect: (mon, phase, defender) => {
            if ((defender.status.burning || 0) > 0 ){
                defender.health -= mon.dmg 
            }  
        }
    },

    {
        id:50011,
        effect: (mon, phase, defender) => {
            if (mon.kills > 0 && mon.id === 10117 && phase === "End phase"){
                mon.alive = true
                mon.img = `/animon/10118.gif`
                mon.stats.maxHealth += 100
                mon.health = mon.stats.maxHealth
                mon.stats.baseArmour += 20
                mon.stats.baseMR += 20
                mon.stats.baseAP -= mon.stats.baseAD
                mon.stats.baseAD += mon.stats.baseAP
                mon.lifeSteal += 0.1
                mon.id++
                mon.element = "Fire"
                mon.attacks.push()
                mon.kills = 0
            }
            if (mon.kills > 0){
                mon.stats.baseAD *= 1.3
                mon.kills--
            }
        }
    },
    
]

