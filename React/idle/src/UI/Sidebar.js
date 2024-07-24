import React from "react";
import { useState } from "react";
import styles from '../UIcss/Sidebar.module.css'


function Sidebar({ activeTab, setActiveTab }) {
    
    const tabs = ["Hub", "Profile", "Shop","Settings", "Logout"];

    return (
        <div className={styles.sidebar}>
            <div>
                <h1>My Sidebar</h1>
            </div>
            <ul className={styles.list}>
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={activeTab === index ? styles.active : ''}
                        onClick={() => setActiveTab(index)}
                        
                    >   
                        {tab}
                    </li>
                    ))}
                
            </ul>
        </div>
    )
}

export default Sidebar;