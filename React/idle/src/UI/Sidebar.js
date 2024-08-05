import React from "react";
import { useState } from "react";
import styles from '../UIcss/Sidebar.module.css'


function Sidebar({ activeTab, setActiveTab, player}) {
    
    const tabs = ["Hub", "Player", "Inventory","Shop","Cutting", "Mining", "Settings", "Logout"];

    return (
        <div className={styles.sidebar}>
            <div>
                <h1>My Sidebar</h1>
            </div>
            <ul className={styles.list}>
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={activeTab === tab ? styles.active : ''}
                        onClick={() => setActiveTab(tab)}
                        
                    >   
                        {tab}{tab === 'Shop' ? <p>{player.coins}</p> : <p></p>}
                    </li>
                    ))}
                
            </ul>
        </div>
    )
}

export default Sidebar;