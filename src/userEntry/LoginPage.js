import React from "react";
import { useState } from "react";
// import styles from '../UIcss/S.module.css'
import styles from "./LoginPage.module.css"


function LoginPage() {
    
    return (
        <div  className={styles.loginPage}>
        <header>
            
        </header>
        
        
        <main className={styles.login}>
                
                <div>
                    <h1>Login</h1>
                    
                    
                    <input placeholder="Email" type="email"></input>
                 
                    
        
                    <input placeholder="Password" type="password"></input>
                  
                    <p>Forgot Password?</p>
                    <button>Login</button>
                    <p>Don't have an account <span>Register</span></p>
                </div>
           
        </main>
        
        <footer></footer>
       
       </div >
    )
}

export default LoginPage;