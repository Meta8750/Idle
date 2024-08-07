import React from "react";
import styles from '../UIcss/Header.module.css'

function Header({player}) {
    
    const playerSkill = player.getSkills(player.getCurrentSkill)

    const progressBarWidth =  playerSkill ? (playerSkill.exp / playerSkill.nextLevel) * 100 + '%' : '0%';

    const progressBarStyle = {
      width: progressBarWidth,

    };

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.p}>{player.getActiveTab()}</p>
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