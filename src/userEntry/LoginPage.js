import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./LoginPage.module.css"

import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "./auth.js";
import { useAuth } from "./Auth.jsx";
import { Navigate } from 'react-router-dom';

function LoginPage() {
    const { userLoggedIn } = useAuth()
    
    const [tab, setTab] = useState('login');

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

   const onSubmitLog = async (e) => {
    e.preventDefault();
    if(!isSigningIn) {
        setIsSigningIn(true);
        try {
            await doSignInWithEmailAndPassword( email, password);
              // doSendEmailVerification()
         
        } catch (error) {
            setErrorMessage(error.message);
            setIsSigningIn(false);
        }
    } 
   }
   
   const onSubmitReg = async (e) => {
    e.preventDefault();
    if (!isRegistering){
        try {
        setIsRegistering(true);
        await doCreateUserWithEmailAndPassword(email, password)
        } catch (e) {
            setErrorMessage(e.message);
            setIsRegistering(false);
    }
    }
   }

  
    return (
        <div  className={styles.loginPage}>
        <header>
            
        </header>
        
        
        <main className={styles.login}>
                
                <div className={tab === "login" ? "block" : 'hidden'}>
                    <h1>Login</h1>
                    
                    <form onSubmit={onSubmitLog}>
                    <input placeholder="Email" type="email" value={email}></input>
        
                    <input placeholder="Password" type="password" autoComplete='current-password' value={password}></input>
                  
                    <p>Forgot Password?</p>
                    <button type="submit" disabled={isRegistering}>Login</button>
                    </form>
                    <p>Don't have an account <button onClick={()=> setTab("register")}>Register</button></p>
                </div>

                <div className={tab === "register" ? "block" : 'hidden'}>
                    <h1>Register</h1>
                    <form onSubmit={onSubmitReg}>
                        <input placeholder="Email" type="email" disabled={isRegistering} value={email} onChange={(e) => setEmail(e.target.value)}></input>
                        <input placeholder="Password" type="password" disabled={isRegistering}></input>
                        <input placeholder="Confirm Password" type="password" disabled={isRegistering} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit" disabled={isRegistering}>Register</button> {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        <p>Already have an account <button type="submit" onClick={()=> setTab("login")}>Login</button></p>
                    </form>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                    
                </div>
           
        </main>
        
        <footer></footer>
       
       </div >
    )
}

export default LoginPage;