import React from "react";
import styles from '../../UIcss/components/AttackUI.module.css';

export function AttackUI ({attack}) {
    return (
        <div className={`${styles.attackBox} ${attack.type === "AD" ? "text-orange-500" : "text-blue-500"}`}>
            <div>base {attack.baseDMG} + AD:{attack.adScaling * 100}% AP:{attack.apScaling * 100}%</div>
            <p><span className={ `${attack.type === "AD" ? "text-orange-500" : "text-blue-500"}`}>{attack.name}</span> </p> 
            <p>{attack.element}</p>
          
        </div>
    );
}