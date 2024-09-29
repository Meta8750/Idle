import React from "react";
import { useState } from "react";
import styles from '../UIcss/Sidebar.module.css'


function Sidebar({player}) {

  
    
    const tabs = ["Hub", "Battle","Rifts","Tower", "MonManager","Summoning","Inventory","Shop","Crafting", "Gambling", "Settings", "Logout"];

    return (
        <div className={styles.sidebar}>
            <div>
                <h1>My Sidebar</h1>
            </div>
            <ul className={styles.list}>
                {tabs.map((tab, index) => (
                    <li
                        key={index}
                        className={player.getActiveTab() === tab ? styles.active : ''}
                        onClick={() => player.setActiveTab(tab)}
                    >   
                        {tab} {player.getSkills(tab) ? player.getSkills(tab).level : ""} {tab === 'Shop' ? player.getCoins()  : ''}
                    </li>
                    ))}
                
            </ul>
        </div>
    )
}

export default Sidebar;