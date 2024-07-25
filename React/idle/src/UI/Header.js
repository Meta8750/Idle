import React from "react";
import styles from '../UIcss/Header.module.css'

function Header({activeTab}) {
    return (
        <div className={styles.header}>
            <p className={styles.p}>{activeTab}</p>
        </div>
    )
}

export default Header;