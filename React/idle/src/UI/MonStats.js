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
                    return <li>{attack.name} deals {attack.baseDMG} + <span className={styles.ad}>ad{(attack.adScaling * 100)}% </span>+ <span className={styles.ap}>ap{(attack.apScaling * 100)}%</span></li>
                })}</div>
               
    
    
            </div>
        );

    } else {
        return <p>No Stats available!</p>
    }
    
}

export default MonStats;