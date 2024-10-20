import React from "react";
import styles from '../UIcss/Header.module.css'

function Header({player}) {
    
    const playerSkill = player.getCurrentTabSkill()
    
    const progressBarWidth =  playerSkill ? (playerSkill.exp / playerSkill.nextLevel) * 100 + '%' : '0%';

    const progressBarStyle = {
      width: progressBarWidth,

    };
    
    return (
        <div className={styles.header}>
            <div className={styles.dataBar}>
                <p>{player.name} Lv. {player.level}</p>
                <p className={styles.p}>{player.getActiveTab()}</p>
                <p>coins: {player.coins} | essence: {player.essence} | gems: {player.gems} </p>
            </div>
            <div className={styles.ProgressBar}>
                <i style={progressBarStyle} className={styles.i}></i>
                {playerSkill ? (
                    <div className={styles.progessInfo}>
                        <p className={styles.levelBar}>{playerSkill.level}/{playerSkill.maxLevel}</p>
                        <p className={styles.expBar}>{playerSkill.exp} / {playerSkill.nextLevel}</p>
                    </div> ) : <p></p>}
               
            </div>
        </div>
    )
}

export default Header;