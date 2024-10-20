import React from "react";
import { useState } from "react";

import ItemManager from "./ItemManager.js";
import ItemStars from "./components/ItemStars.tsx";
import MonStats from "./components/MonStats.tsx";
import { AttackUI } from "./components/AttackUI.tsx";

import styles from '../UIcss/Laboratory.module.css'



function Laboratory({ player }) {

  const [focusedMon, setFocusedMon] = useState();
  const [teamIndex, setTeamIndex] = useState();
  const [tab, setTab] = useState("monManager");
  const [fAttack, setFAttack] = useState([null, 5])

  const [newAttack, setNewAttack] = useState()

  const [searchTerm, setSearchTerm] = useState('');


  const setFocus = (mon) => {
    setFocusedMon(mon);
  };

  const extract = (mon) => {
    player.inventory.updateItem({ name: `${mon.name}cell`, quantity: 5, value: 100 })
    player.deleteMon(mon.uid)
    setFocusedMon(null)
  }
  const extractAttack = (mon) => {
    if (fAttack[0] != null) {
      player.inventory.updateItem(fAttack[0])
      player.deleteMon(mon.uid)
      setFAttack([null, 5])
      setFocusedMon(null)
    }
  }
  const tierUpgrade = (mon) => {
    mon.upgradeTier()
    if ((player.inventory.findItem(`${mon.name}cell`)?.quantity || 0) >= mon.reqCells) {
      mon.upgradeTier()
    }
  }

  const applyNewAttack = () => {
    focusedMon.attacks[fAttack[1]] = newAttack
  }

  const switchTab = (newTab) => {
    setTab(newTab)
    setFocusedMon(null)
  }

  const upgrade = (mon) => {
    if (player.essence === 0){
      alert("no essence")
    }
    if (player.essence >= mon.nextLevel) {
        mon.exp += mon.nextLevel
        player.essence -= mon.nextLevel
    } else {
      mon.exp += player.essence
      player.essence = 0
    }
    
    mon.levelProgess()
  }

  const expBar = (mon) => {
    let pWidth = `${(mon.exp / mon.nextLevel) * 100}%`;
    if (mon.exp <= 0) {
      pWidth = '0%'
    }
    return {
      width: pWidth,
    };
  }


  return (
    <div className={styles.MonManager}>
      <div className={styles.stats}>
        {focusedMon ? (

          <div>
            <img class="w-52 h-52" alt={focusedMon.name} src={focusedMon.img}></img>
            <MonStats mon={focusedMon} />


            <button class="px-10" onClick={() => extract(focusedMon)}>extract cell</button>
            <button class="px-10" onClick={() => tierUpgrade(focusedMon)}>tier+</button>
            <button class="px-10" onClick={() => extractAttack(focusedMon)}>extract attack</button>
            <button class="px-10" onClick={() => setTab("attackManager")}>Attack Manager</button>
            <button class="px-10" onClick={() => setTab("levelManager")}>Leveling</button>

            <div className={styles.attacks}>
              {focusedMon.attacks.map((attack, attackIndex) => (
                <div onClick={() => setFAttack([attack, attackIndex])} className={fAttack[1] === attackIndex ? "!border-red-500 border-s-8" : ""}>
                  <AttackUI attack={attack} />
                </div>))}
            </div>

          </div>

        ) : (<p>none</p>)}

      </div>
      <div className={`${styles.attackManager} ${tab === "attackManager" ? "" : "!hidden"}`}>
        <div className={styles.monAttacks}>
          {focusedMon ? (
            focusedMon.attacks.map((attack, attackIndex) => (

              <div onClick={() => setFAttack([attack, attackIndex])} className={fAttack[1] === attackIndex ? "!border-red-500 border-s-8" : ""}>

                <AttackUI attack={attack} />
              </div>
            ))) : (<p></p>)}
        </div>

        <div className={styles.funtions}>
          <button onClick={() => applyNewAttack()} >apply</button>

          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)} // Setzt den Suchterm
          />

          <button onClick={() => setTab("monManager")}>X</button>
        </div>


        <div className={styles.items}>
          {player.inventory.filteredItems(searchTerm).map((item, index) => (
            <div className={styles.attacks} onClick={() => setNewAttack(item)}>
              <div className={newAttack === item ? "!border-red-500 border-s-8" : ""}>
                <AttackUI attack={item} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`${styles.box} ${tab === "monManager" ? "" : "!hidden"}`}>
        {player.getMons() ? (
          player.getMons().map((mon, index) => (
            <div onClick={() => setFocus(mon)} className={`${styles.boxSlot} ${focusedMon === mon ? styles.focusedBox : ""}`}>
              <header>
                <img className="!w-10 h-10" src={`/icons/element/${mon.element}.png`}></img>
                <h1> Lv. {mon.level}</h1>
              </header>
              <i className={player.team.some(teamMon => teamMon.uid === mon.uid) ? "" : "hidden"}>
                deployed
              </i>
              <img class="w-28 h-28" alt={mon.name} src={mon.img}></img>
              <span><ItemStars num={mon.tier} />{player.inventory.findItem(`${mon.name}cell`)?.quantity || 0} / {mon.reqCells}</span>
              <p>{mon.name} {mon.role}</p>
            </div>
          ))
        ) : (<p>none</p>)}
      </div>
      {focusedMon ? (
        <div className={`${styles.levelManager} ${tab === "levelManager" ? "" : "!hidden"}`}>
          
            <div className={styles.mon}>
            <img class="w-28 h-28" alt={focusedMon.name} src={focusedMon.img}></img>
              <p>{focusedMon.level}</p>
              <div className={styles.expBar}>
                
                <p className={styles.expBarFill} style={expBar(focusedMon)}>{focusedMon.exp}/{focusedMon.nextLevel}</p>
              </div>
            </div>
            
            <div className={styles.cost}>
              <p>{focusedMon.level}</p>
            </div>
            
            <div className={styles.upgrade}>
              <p>{focusedMon.level}</p>
              <button onClick={()=> upgrade(focusedMon)}>upgrade</button>
            </div>
      
      </div>
    ) : (<p></p>)}
    </div>
  )
}

export default Laboratory;