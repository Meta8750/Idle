import React from "react";
import { useState } from "react";
// import styles from '../UIcss/S.module.css'
import styles from "./Startpage.module.css"


function Startpage() {
    
    return (
       <body className={styles.startpage}>
        <header>
            <div>
                <a href="./LoginPage.js">Login</a> <a>Register</a>
            </div>
        </header>
        
        <aside></aside>
        
        <main>

            <div className={styles.login}>
                <img src="./backgrounds/japan_hill.jpg"></img>
                <p>Login</p>
            </div>

        </main>
        
        <footer></footer>
       
       </body>
    )
}

export default Startpage;