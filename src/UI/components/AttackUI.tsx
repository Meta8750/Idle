import React from "react";
import styles from '../../UIcss/components/AttackUI.module.css';

export function AttackUI ({attack}) {
    return (
        <div className={styles.attackBox}>
            <p>{attack.name} </p> <p>{attack.element}</p>
          
        </div>
    );
}