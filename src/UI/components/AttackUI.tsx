import React from "react";
import styles from '../../UIcss/components/AttackUI.module.css';

export function AttackUI ({attack}) {
    return (
        <div className={`${styles.attackBox}`}>
            <div>{attack.baseDMG} + <span className="text-orange-500">{attack.adScaling * 100}%</span> + <span className="text-blue-500">{attack.apScaling * 100}%</span></div>
            
            <p><span className={ `${attack.type === "AD" ? "text-orange-500" : "text-blue-500"}`}>{attack.name}</span> </p>
            <p className={attack.currentCD === 0 ? "hidden" : ""}>{attack.currentCD}</p> 
            <p>{attack.element}</p>
          
        </div>
    );
}