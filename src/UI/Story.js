import React from "react";
import Battle from "./Battle";
import Fight from '../system/Fight.ts'
import GenBattle from "../system/GenBattle.ts";

let fight = new Fight()
let genBattle = new GenBattle()

function Story({player}){

    const startStory = () => {
        if (player.team.length != 0) {
            fight.startFight(player, genBattle.getStory(), 40000)
            console.log(fight.arena.enemys)
            for (const batch of fight.arena.enemys){
                console.log(batch)
                for(const enemy of batch){
                    enemy.level = 9
                    enemy.exp = 99999999999 * 999999999999
                    enemy.levelProgess()
                }
            }
        }
    }

    return(
        
        <div>
            <div>
                <button onClick={()=> startStory()}></button>
            </div>
            <Battle player={player} fight={fight}/>
        </div>
    )
}

export default Story;