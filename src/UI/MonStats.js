import React from "react";
import styles from '../UIcss/Monstats.module.css'

function MonStats({mon}){
    
    if (mon != "none"){
        
        return (
            <div>
                <h1>{mon.name}</h1>
                {mon.getImageElement()}
                <li class="text-green-400" >{mon.maxHealth}/{mon.health}</li>
                <li class="text-blue-300">{mon.maxMana}/{mon.mana}</li>
                <li class="text-orange-500">AD: {mon.baseAD}</li>
                <li class="text-blue-600">AP: {mon.baseAP}</li>
                <li>MS: {mon.baseMS}</li>
                <div>{mon.attacks.map((attack, index) => {
                    return <li>
                    {attack.name} deals <span className={attack.type === "AP" ? styles.ap : styles.ad}>{Math.floor(attack.baseDMG + (mon.baseAD * attack.adScaling) + (mon.baseAP * attack.apScaling))}
                    </span> = <span className={styles.ad}> {attack.baseDMG} + {mon.baseAD * attack.adScaling} ({(attack.adScaling * 100)}%) 
                    </span> + <span className={styles.ap}> {attack.baseDMG} + {mon.baseAP * attack.apScaling} ({(attack.apScaling * 100)}%)
                    </span></li>
                })}</div>
               
    
    
            </div>
        );

    } else {
        return <p>No Stats available!</p>
    }
    
}

export default MonStats;