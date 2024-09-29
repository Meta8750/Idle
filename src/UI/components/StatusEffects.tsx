import React from "react";
import styles from '../../UIcss/components/StatusEffects.module.css';

function StatusEffect({mon}){
    return(
        <div className={styles.statusBar}>
            {mon.status ? (Object.entries(mon.status).map(([statu, duration]) => {
            return <div className="flex">
                        <img src={`/icons/status/${statu}.png`} className="w-8 h-8"></img>
                        <p className={styles.digit}> {duration}</p>
                    </div>
            })) : (<p></p>)}
        </div>
    )
}

export default StatusEffect;

