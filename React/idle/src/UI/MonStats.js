import React from "react";
import styles from '../UIcss/Monstats.module.css'

function MonStats({mon}){
    
    if (mon != "none"){
        
        return (
            <div>
                <h1>{mon.name}</h1>
                {mon.getImageElement()}
                <li>{mon.maxhealth}/{mon.health}</li>
                <li>{mon.maxMana}/{mon.mana}</li>
                <li>{mon.baseMS}</li>
                <div>{mon.attacks.map((attack, index) => {
                    return <li>
                    {attack.name} deals <span className={attack.type === "AP" ? styles.ap : styles.ad}>{Math.floor(attack.baseDMG + (mon.baseAD * attack.adScaling) + (mon.baseAP * attack.apScaling))}
                    </span> = <span className={styles.ad}> {attack.baseDMG} + {(attack.adScaling * 100)}% 
                    </span> + <span className={styles.ap}> {attack.baseDMG} + {(attack.apScaling * 100)}%
                    </span></li>
                })}</div>
               
    
    
            </div>
        );

    } else {
        return <p>No Stats available!</p>
    }
    
}

export default MonStats;