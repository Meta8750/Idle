import React from "react";
import styles from '../UIcss/Header.module.css'

function Header({activeTab, skills}) {
    const progressBarWidth = skills ? (skills.exp / skills.nextLevel) * 100 + '%' : '0%';

   
    const progressBarStyle = {
      width: progressBarWidth,

    };

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.p}>{activeTab}</p>
            </div>
            <div className={styles.ProgressBar}>
                <i style={progressBarStyle} className={styles.i}></i>
            
            </div>
        </div>
    )
}

export default Header;