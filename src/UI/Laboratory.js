import React from "react";
import { useState } from "react";

import ItemManager  from "./ItemManager.js";
import ItemStars from "./components/ItemStars.tsx";
import MonStats from "./components/MonStats.tsx";

import styles from '../UIcss/Laboratory.module.css'



function Laboratory({player}) {

    const [focusedMon, setFocusedMon] = useState();
    const [teamIndex, setTeamIndex] = useState();
    const [tab, setTab] = useState("mon");
    const [attack, setAttack] = useState()

  
    const setFocus = (mon) => {
        setFocusedMon(mon);
    };

    const extract = (mon) => {
        player.inventory.updateItem({name: `${mon.name}cell`, quantity: 5, value: 100})
        player.deleteMon(mon.uid)
        setFocusedMon(null)
    }
    const extractAttack = (mon) => {
        player.inventory.updateItem(attack)
        player.deleteMon(mon.uid)
        setAttack(null)
    }
    const tierUpgrade = (mon) => {
        mon.upgradeTier()
        if ((player.inventory.findItem(`${mon.name}cell`)?.quantity || 0) >= mon.reqCells){
            mon.upgradeTier()
        }
    }

   

    return (
        <div  className={tab === "mon" ? styles.MonManager : ' hidden'}>
          <div className={styles.stats}>
              {focusedMon ? (
                
                <div>
                <img class="w-52 h-52" alt ={focusedMon.name}src={focusedMon.img}></img>
                <MonStats mon={focusedMon} />
               
                <button class="px-10" >get in Team</button>
                <button class="px-10" onClick={() => extract(focusedMon)}>extract cell</button>
                <button class="px-10" onClick={() => tierUpgrade(focusedMon)}>tier+</button>
                <button class="px-10" onClick={() => extractAttack(focusedMon)}>extract attack</button>
                <div className={styles.attacks}>
                {focusedMon.attacks.map((attack, attackIndex) => (
                <p
                    onClick={() => setAttack(attack)}
                    className={styles.attackOption}
                    >
                    {attack.name} {attack.currentCD > 0 ? attack.currentCD : ""} {attack.element}
                    </p> ))}
                </div>
                
                </div>
            
            ) : (<p>none</p>)}

          </div>
         
          
          <div className={styles.box}>
            {player.getMons() ? (
                player.getMons().map((mon, index) => (
                  <div onClick={() => setFocus(mon)} className={`${styles.boxSlot} ${focusedMon === mon ? styles.focusedBox :  ""}` }>
                      <header>
                        <img className="!w-10 h-10" src={`/icons/element/${mon.element}.png`}></img>
                        <h1> Lv. {mon.level}</h1>
                      </header>
                      <i className={player.team.some(teamMon => teamMon.uid === mon.uid) ? "" : "hidden"}>
                        deployed
                      </i>
                      <img class="w-28 h-28" alt ={mon.name}src={mon.img}></img>
                      <span><ItemStars num={mon.tier}/>{player.inventory.findItem(`${mon.name}cell`)?.quantity || 0} / {mon.reqCells}</span>
                        <p>{mon.name} {mon.role}</p>
                       
                      
                    
                      
                  </div>    
              ))
            ) : (<p>none</p>)}
            </div>
            </div>
    )
}

export default Laboratory;