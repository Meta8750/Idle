import React from "react";
import styles from '../UIcss/Logout.module.css'
import { useAuth } from "../userEntry/Auth.jsx";

function Logout({activeTab, skills}) {
    const { logout } = useAuth(); // Logout-Funktion aus Auth-Context

    const handleLogout = async () => {
        try {
            await logout();
            console.log("User successfully logged out");
        } catch (error) {
            console.error("Error logging out:", error);
        }
    };

    return (
        <div>
            <h1>Welcome to the Main Page</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;