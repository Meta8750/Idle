import React from "react";
import { useState } from "react";
import Animon from "../system/Animon.ts";

import styles from '../UIcss/MonManager.module.css'


function MonManager({player}) {

    const [focusedMon, setFocusedMon] = useState();

   const test = () => {
    player.setMons(10000)
    player.setMons(10001)
    player.setMons(10005)
    player.setTeam(player.getMons(0), 0)  
    player.setTeam(player.getMons(1), 0) 
    player.setTeam(player.getMons(2), 0)  

   }
    const setFocus = (mon) => {
        setFocusedMon(mon);
    };

    const setTeam = (mon) => {
      player.setTeam(mon, 0);
    }
    
    return (
          <div className={styles.MonManager}>
          <div className={styles.team}>
            <button class="" onClick={() => test()}></button>
              {player.getTeam() ? (
                player.getTeam().map((mon, index) => (
                  
                  <div className={styles.boxSlot}>
                   
                      <p>{mon.name} {mon.level}</p>
                      <img class="w-52 h-52" alt ={mon.name}src={mon.img}></img>
                  </div>
                
              ))
            ) : (<p>d</p>)}

          </div>
          <div className={styles.stats}>
              {focusedMon ? (
                
                <div>
                <img></img>
                {focusedMon.getImageElement("300px", "300px")}
                <p>{focusedMon.name}</p>
                <p>Level: {focusedMon.level}</p>
                <p>Exp: {focusedMon.exp}/{focusedMon.nextLevel}</p>
                <p>HP: {focusedMon.health}/{focusedMon.stats.maxHealth}</p>
                <p>Defense: {focusedMon.defense}</p>
                <p>Speed: {focusedMon.speed}</p>
                <p>Type: {focusedMon.type}</p>
                <p>Attacks: {focusedMon.attacks[0].name}</p>
                {focusedMon.attacks.map((attack, index) =>(
                  <li>{attack.name}</li>
                ))}
                <p>UID: {focusedMon.uid}</p>
                <button class="px-10"onClick={() => setTeam(focusedMon)} >get in Team</button>
                
                </div>
            
            ) : (<p>none</p>)}

          </div>
          
          <div className={styles.box}>
            {player.getMons() ? (
                player.getMons().map((mon, index) => (
                  <div onClick={() => setFocus(mon)} className={styles.boxSlot}>
                   
                      <p>{mon.name} {mon.level}</p>
                      
                      <img class="w-32 h-32" alt ={mon.name}src={mon.img}></img>
                     
                  </div>    
              ))
            ) : (<p>none</p>)}
            </div>
            </div>
    )
}

export default MonManager;