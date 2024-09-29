import React from "react";
import { useState, useEffect } from "react";
import styles from '../UIcss/Battle.module.css'
import Monstats from './MonStats.js'
import Fight from "../system/Fight.ts";
import StatusEffect  from "./components/StatusEffects.tsx";

const battleLogs = []
let fight = new Fight()

function Battle({ player }) {
  const [fight] = useState(new Fight(updateDamage));

  const [dmgTracker,setDmgTracker] = useState({})

  function updateDamage(monId, damageAmount) {
    setDmgTracker((prevState) => ({
      ...prevState,
      [monId]: damageAmount,
    }));

    // Remove damage after 1 second
    setTimeout(() => {
      setDmgTracker((prevState) => ({
        
        ...prevState,
        [monId]: null,
      }));
    }, 2000); // 1 second duration for the damage display
  }

  const initializeBattle = (batch, drop) => {
    if (player.team.length != 0) {
      fight.startFight(player, batch, drop)
    }
    
  }

  const playAgain = () => {
    fight.startFight(player, fight.lastFight.enemyList, fight.lastFight.dropID)
    fight.advanceTurn()
  }

  const autoBattler = () => {
    if (fight.autoBattle){
      fight.autoBattle = false
      
    } else {
      fight.autoBattle = true
      fight.advanceTurn()

    }
      
  }
 
  const hpBar = (mon) => {
    let pWidth = `${(mon.health / mon.stats.maxHealth) * 100}%`; 
    if (mon.health <= 0){
      pWidth = '0%'
    }
    return {
      width: pWidth,
    };
  };

  const manaBar = (mon) =>{
    let pWidth = `${(mon.mana / mon.stats.maxmana) * 100}%`;
    if (mon.mana <= 0){ pWidth = '0%' } return { width: pWidth, };
  }



  const renderTeam = () => {
    return player.getTeam().map((mon, index) => (
      <div onClick={() => fight.handleTarget(mon)}
        key={index}
        className={`${styles.mon} ${
          fight.attackOrder[fight.currentAttackerIndex] === mon ? styles.activeMon : ""
        }`}
      > 
        <p>{mon.name} {mon.level}</p>
        <StatusEffect mon={mon}/>
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(mon)}>{mon.stats.maxHealth}\{mon.health}</div></div>
        {dmgTracker[mon.uid] && (
          <div className={styles.damageIndicator}>
            -{dmgTracker[mon.uid]}
          </div>
        )}
        <img class="w-52 h-52" alt ={mon.name}src={mon.img}></img>
        
        <ul class={fight.currentAttacker === mon ? "" : "hidden"}>
          {mon.attacks.map((attack, attackIndex) => (
            <li
              onClick={() => fight.handleAttack(attack, mon)}
              className={styles.attackOption}
            >
              {attack.name}
            </li>
          ))}
        </ul>
        </div>
      
    ));
  };

  const renderEnemies = () => {
    if (!fight.arena || !fight.arena.enemys || fight.arena.enemys.length === 0) return null;

    const currentBatch = fight.arena.enemys[fight.currentBatchIndex];

    if (!currentBatch) return <p>No more enemies!</p>;

    return currentBatch.map((enemy, index) => (
      <div onClick={() => fight.handleTarget(enemy)}
        key={index}
        className={`${styles.enemy} ${
          fight.attackOrder[fight.currentAttackerIndex] === enemy ? styles.activeEnemy : ""
        }`}
      >  
        <p>{enemy.name}</p>
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(enemy)}>{enemy.stats.maxHealth}\{enemy.health}</div></div>
        {dmgTracker[enemy.uid] && (
          <div className={styles.damageIndicator}>
          
            {dmgTracker[enemy.uid]}
          </div>
        )}
        <img class="w-52 h-52" alt ={enemy.name}src={enemy.img}></img>
      </div>
      
    ));
  };

  return (
    <div>
      <div className={fight.state === "outOfCombat" ? "" :  "hidden"}>
        <button onClick={() =>initializeBattle([[10000, 10001, 10000]], 40000)}>Start Battle</button>
        <button onClick={() =>initializeBattle([[10001, 10001, 10001], [10000, 10001, 10001], [10001,10005,10001]],40000)}>Start Battle</button>
      </div>
      <div>
        <button onClick={() => autoBattler()}>Auto Battle</button>
      </div>
        {fight.arena ? (
             <div className={styles.arena}>
            <div className={styles.enemyContainer}>
              {renderEnemies()}
            </div>
            <div className={styles.teamContainer}>
              {renderTeam()}
            </div>
            <div>
              <p>Attack Order: {fight.attackOrder.map((mon,index) => (
                <span className={`${styles.mon} ${
                  fight.attackOrder[fight.currentAttackerIndex] === mon ? styles.activeMon : ""
                }`}>{mon.name}</span>
              ))}</p>
              <p>Current Attacker: {fight.attackOrder[fight.currentAttackerIndex].name}</p>
              <p>Attack Target: {fight.attackTarget.name}</p>
            </div>
            <div className={styles.battleLogsContainer}>
                {fight.battleLogs.map((battleLog, index) => (
                <p key={index}>{battleLog}</p>
              ))}
            </div>
            
              <Monstats mon={fight.attackTarget}/>
           
             
            </div>
        ) : (
          <p>No current Battle</p>
        )}
      
       <div className={fight.result === "won" ? styles.visible : styles.hidden}>
         <p>Victory</p>
         <button onClick={() => playAgain()}>Again?</button>
          
         <p>{fight.drop ? (Object.entries(fight.drop).map(([name, drop]) => {
          return <p>{name} {drop}</p>
         })) : (<p></p>)}</p>
         <p></p>
         </div>
    </div>
  );
}

export default Battle;