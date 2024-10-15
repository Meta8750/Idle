import React from "react";
import { useState } from "react";

import ItemManager  from "./ItemManager.js";
import ItemStars from "./components/ItemStars.tsx";
import MonStats from "./components/MonStats.tsx";

import styles from '../UIcss/MonManager.module.css'



function MonManager({player}) {

    const [focusedMon, setFocusedMon] = useState();
    const [teamIndex, setTeamIndex] = useState();
    const [tab, setTab] = useState("mon");

   const test = () => {
    player.setMons(10000)
    player.setMons(10003)
    player.setMons(10005)
    player.setMons(10044)
    player.setMons(10095)
    player.setTeam(player.getMons(0), 0)  
    player.setTeam(player.getMons(1), 0) 
    player.setTeam(player.getMons(2), 0)  
    player.setTeam(player.getMons(3), 0)  

   }
    const setFocus = (mon) => {
        setFocusedMon(mon);
    };

    const setTeam = (mon) => {
      player.setTeam(mon, teamIndex);
    }

    const getTeamMon = (i) => {
        setFocusedMon(player.getTeam(i))
        setTeamIndex(i);
    }
    
    return (
      <div>
        <p className={tab === "item"  ? 'block' : ' hidden'} ><ItemManager player={player} mon={focusedMon} setTab={setTab}/></p>
          <div  className={tab === "mon" ? styles.MonManager : ' hidden'}>
          <div className={styles.team}>
            <button class="" onClick={() => test()}></button>
              {player.getTeam() ? (
                player.getTeam().map((mon, index) => (
                  
                  <div onClick={() => getTeamMon(index)} className={`${styles.boxSlot} ${teamIndex === index ? "border border-red-100" : "border-s-red-100"}`}>
                   
                      <p>{mon.name} {mon.level}</p>
                      <img class="w-52 h-52" alt ={mon.name}src={mon.img}></img>
                  </div>
                
              ))
            ) : (<p>d</p>)}

          </div>
          <div className={styles.stats}>
              {focusedMon ? (
                
                <div>
                <img class="w-52 h-52" alt ={focusedMon.name}src={focusedMon.img}></img>
                <MonStats mon={focusedMon} />
               
                <button class="px-10"onClick={() => setTeam(focusedMon)} >get in Team</button>
                <button onClick={() => setTab("item")}>equipment</button>
                
                </div>
            
            ) : (<p>none</p>)}

          </div>
          
          <div className={styles.box}>
            {player.getMons() ? (
                player.getMons().map((mon, index) => (
                  <div onClick={() => setFocus(mon)} className={styles.boxSlot}>
                      <header>
                        <img className="!w-10 h-10" src={`/icons/type/${mon.element}.png`}></img>
                        <h1> Lv. {mon.level}00</h1>
                      </header>
                      <i className={player.team.some(teamMon => teamMon.uid === mon.uid) ? "" : "hidden"}>
                        deployed
                      </i>
                      <img class="w-32 h-32" alt ={mon.name}src={mon.img}></img>
                      <span><ItemStars num={mon.tier}/></span>
                        <p>{mon.name} {mon.role}</p>
                       
                      
                    
                      
                  </div>    
              ))
            ) : (<p>none</p>)}
            </div>
            </div></div>
    )
}

export default MonManager;