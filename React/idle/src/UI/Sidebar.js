import React from "react";
import { useState } from "react";
import styles from '../UIcss/Sidebar.module.css'


function Sidebar() {
    const [activeTab, setActiveTab] = useState();

    


    return (
        <div className={styles.sidebar}>
            <div>
                <h1>My Sidebar</h1>
            </div>
            <ul className={styles.list}>
                <li>Test1</li>
                <li>Test2</li>
                <li>Test3</li>
                <li>Test4</li>
                
            </ul>
        </div>
    )
}

export default Sidebar;