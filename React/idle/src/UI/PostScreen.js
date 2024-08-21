import React from "react";
// import styles from '../UIcss/postScreen.module.css'

function PostScreen({team, arena, result}){
        
        
        if (result === "won") {
            return (
                <div>
                    
                    <h1>Victory</h1>
                    
                    {team.map((mon, index) => {
                        mon.exp += arena.expDrop
                        mon.levelProgess()
                        
                    })}
                   
        
        
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