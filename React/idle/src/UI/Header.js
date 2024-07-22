import React from "react";
import styles from '../UIcss/Header.module.css'

function Header() {
    return (
        <div className={styles.header}>
            <p className={styles.p}>Current Aktivity</p>
        </div>
    )
}

export default Header;