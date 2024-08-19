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
   //name,id,level,rarity type,role,maxhealth,healthGrowth,baseAD,ADGrowth,baseAP,APGrowth,baseArmor,armorGrowth,baseMR,MRGrowth,baseMS,MSGrowth
    
  
   const test = () => {
    
    player.setMons(0)
    
    player.setMons(1)
    
   
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