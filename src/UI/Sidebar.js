import React from "react";
import { useState } from "react";
import styles from '../UIcss/Sidebar.module.css'


function Sidebar({player}) {

   
    
    const tabs = ["Hub", "Story","Rifts","Raid","Tower", "MonManager","Summoning","Inventory","Shop","Crafting", "Gambling", "Settings", "Logout"];

    return (
        <div>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0&icon_names=menu" />
            <span class="material-symbols-outlined" >menu</span>


        <div className={styles.sidebar}>
    


            
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
        </div>
    )
}

export default Sidebar;