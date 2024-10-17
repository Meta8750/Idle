import React from "react";
import styles from '../../UIcss/components/FightStats.module.css'



function FightStats({mon, stats}){

    let dealing = {
        width: `${(mon.dmgDealt / stats[0]) * 100}%`,
    }
    let taking = {
        width: `${(mon.dmgTaken / stats[1]) * 100}%`,
    }
    let healing = {
        width: `${(mon.healingDone / stats[2]) * 100}%`,
    }
    
    return(
        <div className={styles.statsGraph}>
            <p>{mon.name}</p>
            <p style={dealing} className="bg-red-500"> {mon.dmgDealt}</p>
            <p style={taking}  className="bg-blue-500"> {mon.dmgTaken}</p>
            <p style={healing} className="bg-green-500"> {mon.healingDone}</p>
        </div>
    )
}

export default FightStats;