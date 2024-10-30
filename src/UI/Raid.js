import React from "react";
import Battle from "./Battle.js";
import Fight from '../system/Fight.ts'
import GenBattle from "../system/GenBattle.ts";

let fight = new Fight()
let genBattle = new GenBattle()
let enemyCreated = false

function Raid({player}){

    const startRaid = (batch, lv) => {
        if (player.team.length != 0) {
            fight.startFight(player, batch , 40000, lv)
            fight.type = "Raid"

            }
        }
        return(
        
            <div>
                <div className={fight.state === "Combat" ? "hidden" : "flex"}>
                    <div>
                        <button onClick={()=> startRaid([[10001, 10044, 10001]], 10)}>Raid: Storm Terror Rec Lv: 10</button>
                        <button onClick={()=> startRaid([[10001, 10044, 10001]], 10)}>Raid: Storm Terror Rec Lv: 10</button>
                    </div>
                </div> 
                <Battle player={player} fight={fight}/>
            </div>
        )
}
    
   



export default Raid;