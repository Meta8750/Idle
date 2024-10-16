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
            fight.startFight(player, batch , 40000)
            fight.type = "Raid"
            enemyCreated = true
            fight.currentBatch[1].boss = true

            for(const enemy of  fight.currentBatch){
                enemy.level = lv - 1

                if (enemy.level != 1){
                    enemy.exp = enemy.nextLevel 
                    enemy.levelProgess(enemy.level)
                }
                if (enemy.boss === true){
                    console.log(enemy)
                    enemy.stats.maxHealth *= 10
                    enemy.health = enemy.stats.maxHealth
                }
                }
            }
        }
        return(
        
            <div>
                <div className={enemyCreated ? "hidden" : "flex"}>
                    <button onClick={()=> startRaid([[10001, 10044, 10001]], 10)}>Raid 1</button>
                </div> 
                <Battle player={player} fight={fight}/>
            </div>
        )
}
    
   



export default Raid;