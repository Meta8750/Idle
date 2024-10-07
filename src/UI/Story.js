import React from "react";
import Battle from "./Battle";
import Fight from '../system/Fight.ts'
import GenBattle from "../system/GenBattle.ts";

let fight = new Fight()
let genBattle = new GenBattle()
let enemyCreated = false

function Story({player}){

    const storyProgess = () => {
        player.section +=1
        if (player.section > 5) {
            player.section = 1
            player.zone++
        }
        startStory()
    }

    const startStory = () => {
        if (player.team.length != 0) {
            fight.startFight(player, genBattle.getStory(player.section, player.zone), 40000)
            fight.type = "Story"
            enemyCreated = true
            for (const batch of fight.arena.enemys){
              
                for(const enemy of batch){
                    enemy.level = player.section + (player.zone * 10) -1
                    enemy.exp = enemy.nextLevel 
                    enemy.levelProgess()
                }
            }
        }
    }

    return(
        
        <div>
            <div className={enemyCreated ? "hidden" : "flex"}>
                <button onClick={()=> startStory()}></button>
            </div> <p>{player.zone}-{player.section}</p>
            <button className={fight.result === "won" ? "flex" : "hidden"} onClick={()=> storyProgess()}>Next</button>
            <Battle player={player} fight={fight}/>
        </div>
    )
}

export default Story;