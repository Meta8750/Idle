import React from "react";
import { useEffect, useState, useContext} from "react";
import { auth } from "../firebaseConfig.js";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState("");
    const [isEmailUser, setIsEmailUser] = useState(false);
    const [userLoggedIn, setUserLoggedIn] = useState(false)
    const [loading, setLoginLoading] = useState(true)
    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, initializeUser);
        return () => unsubscribe(); 
    }, []);
    
    async function initializeUser(user) {
        if (user) {
            setCurrentUser({...user})
            setUserLoggedIn(true)
        } else {
            setCurrentUser(null);
            setUserLoggedIn(false);
        }
        setLoginLoading(false)
    }
    
    
    const value = {
        currentUser,
        setCurrentUser,
        userLoggedIn,
        loading,
        isEmailUser,
    }
    
    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>

    )
}

