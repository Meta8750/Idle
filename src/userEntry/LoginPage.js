import React, { useEffect } from "react";
import { useState } from "react";

import styles from "./LoginPage.module.css"

import { doCreateUserWithEmailAndPassword, doSignInWithEmailAndPassword } from "./auth.js";
import { useAuth } from "./Auth.jsx";
import { Navigate } from 'react-router-dom';
import { useNavigate } from "react-router-dom"; 

function LoginPage() {
    const { userLoggedIn } = useAuth()

    const [tab, setTab] = useState('login');
    const navigate = useNavigate(); 

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSigningIn, setIsSigningIn] = useState(false);
    const [isRegistering, setIsRegistering] = useState(false);
    const [errorMessage, setErrorMessage] = useState('')

    const onSubmitLog = async (e) => {
        e.preventDefault();
        if (!isSigningIn) {
            
            try {
                setIsSigningIn(true);
                await doSignInWithEmailAndPassword(email, password);
                // doSendEmailVerification()
                navigate("/");

            } catch (error) {
                console.log(error);
                setErrorMessage("Email or password is incorrect");
                setIsSigningIn(false);
            }
        }
    }

    const onSubmitReg = async (e) => {
        e.preventDefault();
        if (!isRegistering) {
            try {
                await doCreateUserWithEmailAndPassword(email, password)
                setIsRegistering(true);
            } catch (e) {
                handleError(e)
                setIsRegistering(false);
            }
        }
    }

    const handleError = (error) => {
        if (error.code === "auth/email-already-in-use") {
            setErrorMessage("This email address is already in use.");
        } else if (error.code === "auth/weak-password") {
            setErrorMessage("The password must be at least 6 characters long");
        } else if (error.code === "auth/invalid-email") {
            setErrorMessage("The email address entered is invalid");
        } else {
            setErrorMessage("An unknown error has occurred. Please try again");
        }
    };


    return (
        <div className={styles.loginPage}>
            <header>

            </header>


            <main className={styles.login}>

                <div className={tab === "login" ? "block" : 'hidden'}>
                    <h1>Login</h1>

                    <form onSubmit={onSubmitLog}>
                        <input 
                            placeholder="Email" 
                            type="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)} 
                        />

                        <input 
                            placeholder="Password" 
                            type="password" 
                            autoComplete='current-password' 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        <p>Forgot Password?</p>
                        <button type="submit" disabled={isRegistering}>Login</button>
                    </form>
                    <p>Don't have an account <button onClick={() => setTab("register")}>Register</button></p>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
                </div>

                <div className={tab === "register" ? "block" : 'hidden'}>
                    <h1>Register</h1>
                    <form onSubmit={onSubmitReg}>

                        <input 
                            placeholder="Email" 
                            type="email" 
                            disabled={isRegistering} 
                            value={email} onChange={(e) => setEmail(e.target.value)} 
                        />
                       

                        <input placeholder="Password" type="password" disabled={isRegistering}></input>
                        <input placeholder="Confirm Password" type="password" disabled={isRegistering} value={password} onChange={(e) => setPassword(e.target.value)}></input>
                        <button type="submit" disabled={isRegistering}>Register</button> {isRegistering ? 'Signing Up...' : 'Sign Up'}
                        <p>Already have an account <button type="submit" onClick={() => setTab("login")}>Login</button></p>
                    </form>
                    {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                </div>

            </main>

            <footer></footer>

        </div >
    )
}

export default LoginPage;