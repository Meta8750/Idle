import React from "react";
import { useEffect } from "react";
// import styles from '../UIcss/postScreen.module.css'

function PostScreen({team, arena, result, setResult}){
    useEffect(() => {
        if (result === "won") {
            team.forEach(mon => {
                mon.exp += arena.expDrop
                mon.levelProgess()
            });
        }
    }, [result]);
    const handleResult = () => {
        setResult(null)
    }
        
        
        if (result === "won") {
            return (
                <div>
                    
                    <h1>Victory</h1>
                    
                    <button onClick={ () => handleResult()}>Next</button>
                   
        
        
                </div>
            );
        } else {
            return (
                <div>
                    <h1>Defeat</h1>
                    <div>You lose</div>
                </div>
            );
        }
        


}

export default PostScreen;