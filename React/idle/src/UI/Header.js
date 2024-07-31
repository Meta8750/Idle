import React from "react";
import styles from '../UIcss/Header.module.css'

function Header({activeTab, skills}) {
    const ProgressBar = {
        
        width: '100px',
    };
    console.log(skills)
    

    return (
        <div>
            <div className={styles.header}>
                <p className={styles.p}>{activeTab}</p>
            </div>
            <div className={styles.ProgressBar}>
                <i style={ProgressBar} className={styles.i}></i>
            
            </div>
        </div>
    )
}

export default Header;