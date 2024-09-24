import React from "react";
import styles from '../UIcss/Monstats.module.css'

function MonStats({mon}){
    
    if (mon != "none"){
        
        return (
            <div>
                <h1>{mon.name}</h1>
                {mon.getImageElement()}
                <li class="text-green-400" >{mon.stats.maxHealth}/{mon.health}</li>
                <li class="text-blue-300">{mon.stats.maxMana}/{mon.mana}</li>
                <li class="text-orange-500">AD: {mon.stats.baseAD}</li>
                <li class="text-blue-600">AP: {mon.stats.baseAP}</li>
                <li>MS: {mon.stats.baseMS}</li>
                <li>Armour: {mon.stats.baseArmour}</li>
                <li>MR: {mon.stats.baseMR}</li>
                <div>{mon.attacks.map((attack, index) => {
                    return attack.description(mon, attack)
                })}</div>
            </div>
        );

    } else {
        return <p>No Stats available!</p>
    }
    
}

export default MonStats;