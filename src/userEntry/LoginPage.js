import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./LoginPage.module.css"

import { docreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "./auth.js";
import { useAuth } from "./Auth.jsx";
import { Navigate } from 'react-router-dom';

function LoginPage() {
     const { userLoggedIn } = useAuth()
    
    const [tab, setTab] = useState('login');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [error, setError] = useState("");

   const onSubmit = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
        setIsSigningIn(true);
        try {
            await doSignInWithEmailAndPassword( email, password);
         
        } catch (error) {
            setError(error.message);
            setIsSigningIn(false);
        }
    } 
   }
   
   const onSubmitReg = async (e) => {
    e.preventDefault();
    if (!isRegistering){
        setIsRefistering(true);
        await doCreateUserWithEmailAndPassword(email, password)
    }
   }

  
    return (
        <div  className={styles.loginPage}>
        <header>
            
        </header>
        
        
        <main className={styles.login}>
                
                <div className={tab === "login" ? "block" : 'hidden'}>
                    <h1>Login</h1>
                    
                    
                    <input placeholder="Email" type="email"></input>
                 
                    
        
                    <input placeholder="Password" type="password"></input>
                  
                    <p>Forgot Password?</p>
                    <button>Login</button>
                    <p>Don't have an account <button onClick={()=> setTab("register")}>Register</button></p>
                </div>

                <div className={tab === "register" ? "block" : 'hidden'}>
                    <h1>Register</h1>
                    <form>
                        <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input placeholder="Password" type="password"></input>
                        <input placeholder="Confirm Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit">Register</button>
                        <p>Already have an account <button onClick={()=> setTab("login")}>Login</button></p>
                    </form>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    
                </div>
           
        </main>
        
        <footer></footer>
       
       </div >
    )
}

export default LoginPage;