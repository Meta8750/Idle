import React from "react";
import { useState, useEffect } from "react";
import styles from '../UIcss/Battle.module.css'
import Monstats from './MonStats.js'
import Fight from "../system/Fight.ts";
import StatusEffect from "./components/StatusEffects.tsx";
import FightStats from "./components/FightStats.tsx"

const battleLogs = []


function Battle({ player, fight }) {

  const [battleLog, setBattleLog] = useState(false)

  const borderUI = (mon) => {
    
    if (fight.attackOrder[fight.currentAttackerIndex] === mon){
      return styles.activeMon
    }
    if (fight.attackTarget === mon){
      return styles.target
    }
  }

  const digitUI = (mon) => {
    if (fight.dmgTracker[mon.uid]){
      return (
        <div className={`
        ${styles.damageIndicator}
        ${fight.dmgTracker[mon.uid] > 0 ? "!text-green-400" : ""}
        ${fight.currentAttacker.elementMultiplier === 1.5 ? "!text-2xl !text-red-300" : ""}
         ${fight.currentAttacker.elementMultiplier === 0.5 ? "!text-2xl !text-gray-400" : ""}
        ${fight.currentAttacker.attackCritted ? "!text-3xl !text-red-600" : ""}`}>
        {Math.round(fight.dmgTracker[mon.uid])}
      </div>
      )
    }
  }

  const hpBar = (mon) => {
    return (
      <div className={styles.hpBar}>
        <div className={styles.hpUnder} style={hpBarCalc(mon)}></div>
        <div className={styles.hpFill} style={hpBarCalc(mon)}>{mon.health}\{mon.stats.maxHealth}</div>
      </div>
    )
    
  }
  

  const playAgain = () => {
    fight.startFight(player, fight.lastFight.enemyList, fight.lastFight.dropID)

  }

  const autoBattler = () => {
    if (fight.autoBattle) {
      fight.autoBattle = false

    } else {
      fight.autoBattle = true
      fight.advanceTurn()
    }
  }

  const ff = () => {
    fight.reset("lost")
  }

  const hpBarCalc = (mon) => {
    let pWidth = `${(mon.health / mon.stats.maxHealth) * 100}%`;
    if (mon.health <= 0) {
      pWidth = '0%'
    }
    return {
      width: pWidth,
    };
  };

  const manaBar = (mon) => {
    let pWidth = `${(mon.mana / mon.stats.maxmana) * 100}%`;
    if (mon.mana <= 0) { pWidth = '0%' } return { width: pWidth, };
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = event.key;
      // Überprüfen, ob die Taste zwischen 1 und 4 liegt
      if (key >= '1' && key <= '4') {
        handleAttackSelection(Number(key));
      }
      if (key === "q"){
        handleTargetSelection(4)
      }
      if (key === "w"){
        handleTargetSelection(5)
      }
      if (key === "e"){
        handleTargetSelection(6)
      }
      if (key === "re"){
        handleTargetSelection(7)
      }
      if (key === "a"){
        handleTargetSelection(0)
      }
      if (key === "s"){
        handleTargetSelection(1)
      }
      if (key === "d"){
        handleTargetSelection(2)
      }
      if (key === "f"){
        handleTargetSelection(3)
      }
    };
    // Event-Listener für Tasteneingaben hinzufügen
    window.addEventListener('keydown', handleKeyDown);
    // Event-Listener entfernen, wenn die Komponente unmontiert wird
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleAttackSelection = (num) =>{
    if (fight.currentAttacker){
      fight.handleAttack(fight.currentAttacker.attacks[num - 1], fight.currentAttacker)
      
    }
  }

  const handleTargetSelection = (num) => {
    if (fight.combinedUnits){
      fight.attackTarget = fight.combinedUnits[num]
    }
  }

  const renderTeam = () => {
    return fight.team.map((mon, index) => (
      <div 
        key={index}
        className={`${styles.mon}  ${borderUI(mon)}`}
      >
        <p>{mon.name} {mon.level}</p>
        {hpBar(mon)}
        {digitUI(mon)}

        <StatusEffect mon={mon} />

        <img onClick={() => fight.handleTarget(mon)}  class="w-60 h-52" alt={mon.name} src={mon.img}></img>

        <ul class={fight.currentAttacker === mon ? "" : ""}>
          {mon.attacks.map((attack, attackIndex) => (
            <li
              onClick={() => fight.handleAttack(attack, mon)}
              className={styles.attackOption}
            >
              {attack.name} {attack.currentCD > 0 ? attack.currentCD : ""} {attack.element}
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
        className={`${styles.enemy} ${borderUI(enemy)}`}
      >
        <p>{enemy.name} {enemy.level}</p>
        {hpBar(enemy)}
        
        {digitUI(enemy)}

        <StatusEffect mon={enemy} />
        <img class="w-60 h-52" alt={enemy.name} src={enemy.img}></img>
      </div>

    ));
  };

  return (
    <div>
      <div>
        <button onClick={() => autoBattler()}>Auto Battle</button>
        <button onClick={() => ff()}>FF</button>
        <button onClick={() => setBattleLog(true)}>Battelog</button>
      </div>
      {fight.arena ? (
        <div className={styles.arena}>
          <div className={styles.enemyContainer}>
            {renderEnemies()}
          </div>
          <div className={styles.teamContainer}>
            {renderTeam()}
          </div>
          <div className="flex flex-col grid-area:'stats">
        {fight.arena ? (
          fight.team.map((mon, index) => (
              <FightStats mon={mon} stats={fight.getHighestStats()}/>
          ))) : (<p></p>)}
        </div>
        <p>Round: {fight.round}</p>
          <div class={styles.order}>{fight.attackOrder.map((mon, index) => (
            <span className={`${styles.orderTab} ${fight.attackOrder[fight.currentAttackerIndex] === mon ? styles.activeOrder : ""} ${fight.attackTarget === mon ? styles.target : ""}`}>
              {mon.ally ? (<i></i>) : ""} {mon.name}
              {mon.alive ? "" : (<p>: dead</p>)}
            </span>
          ))}</div>

          <div className={battleLog ? styles.battleLogsContainer : "hidden"}>
            <button onClick={() => setBattleLog(false)}>X</button>
            {fight.battleLogs.map((battleLog, index) => (
              <p key={index}>{battleLog}</p>
            ))}
          </div>
          {/* <Monstats mon={fight.attackTarget} /> */}
        </div>
      ) : (
        <p>No current Battle</p>
      )}
      
      

      <div className={fight.result === "won" || fight.result === "lost" ? styles.visible : styles.hidden}>
        <p>{fight.result}</p>
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