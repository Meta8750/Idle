import React from "react";
import { useState } from "react";
import Animon from "../system/Animon.js";

import styles from '../UIcss/MonManager.module.css'


function MonManager({player}) {

    const [focusedMon, setFocusedMon] = useState();
    
    const style = {
      width: "100px",
      height: "100px",
      objectFit: "cover",
  };
   // (name, id, level, rarity, type, role,maxhealth, ad, ap, armor, mr, ges);
    
  
   const test = () => {
    const Vagabund = new Animon("Vagabund", 0, 1, "common", "Fire","DD", 100, 10,1,0,0,100);
    player.setMons(Vagabund)
    const Wolf = new Animon("Wolf", 1, 1, "common", "Fire","DD",  100, 10,1,0,0,100);
    player.setMons(Wolf)
    
   
    player.setTeam(player.getMons(0), 0) 
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
            <button onClick={() => test()}></button>
              {player.getTeam() ? (
                player.getTeam().map((mon, index) => (
                  
                  <div className={styles.boxSlot}>
                    {console.log(mon)}
                      <p>{mon.name} {mon.level}</p>
                      {mon.getImageElement()}
                  </div>
                
              ))
            ) : (<p>d</p>)}

          </div>
          <div className={styles.stats}>
              {focusedMon ? (
                
                <div>
                {focusedMon.getImageElement("300px", "300px")}
                <p>{focusedMon.name}</p>
                <p>Level: {focusedMon.level}</p>
                <p>Exp: {focusedMon.exp}/{focusedMon.maxExp}</p>
                <p>HP: {focusedMon.health}/{focusedMon.maxHealth}</p>
                <p>Defense: {focusedMon.defense}</p>
                <p>Speed: {focusedMon.speed}</p>
                <p>Type: {focusedMon.type}</p>
                <p>UID: {focusedMon.uid}</p>
                <button onClick={() => setTeam(focusedMon)} >get in Team</button>
                </div>
            
            ) : (<p>none</p>)}

          </div>
          
          <div className={styles.box}>
            {player.getMons() ? (
                player.getMons().map((mon, index) => (
                  <div onClick={() => setFocus(mon)} className={styles.boxSlot}>
                    {console.log(mon)}
                      <p>{mon.name} {mon.level}</p>
                      {mon.getImageElement()}
                  </div>    
              ))
            ) : (<p>none</p>)}
            </div>
            </div>
            
            
        
  
       
    )
}

export default MonManager;