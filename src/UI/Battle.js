import React from "react";
import { useState, useEffect } from "react";
import styles from '../UIcss/Battle.module.css'
import Monstats from './MonStats.js'
import Fight from "../system/Fight.ts";
import StatusEffect from "./components/StatusEffects.tsx";

const battleLogs = []


function Battle({ player, fight }) {

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
        <div className={`${styles.damageIndicator} ${fight.dmgTracker[mon.uid] > 0 ? "!text-green-400" : ""}`}>
        {Math.round(fight.dmgTracker[mon.uid])}
      </div>
      )
    }
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

  const hpBar = (mon) => {
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



  const renderTeam = () => {
    return player.getTeam().map((mon, index) => (
      <div 
        key={index}
        className={`${styles.mon}  ${borderUI(mon)}`}
      >
        <p>{mon.name} {mon.level}</p>

        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(mon)}>{mon.stats.maxHealth}\{mon.health}</div></div>

        {digitUI(mon)}

        <StatusEffect mon={mon} />

        <img onClick={() => fight.handleTarget(mon)}  class="w-52 h-52" alt={mon.name} src={mon.img}></img>

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
        className={`${styles.enemy} ${borderUI(enemy)}`}
      >
        <p>{enemy.name} {enemy.level}</p>
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(enemy)}>{enemy.stats.maxHealth}\{enemy.health}</div></div>
        {fight.dmgTracker[enemy.uid] && (
          <div className={styles.damageIndicator}>
            {fight.dmgTracker[enemy.uid]}
          </div>
        )}
        <StatusEffect mon={enemy} />
        <img class="w-52 h-52" alt={enemy.name} src={enemy.img}></img>
      </div>

    ));
  };

  return (
    <div>
      <div>
        <button onClick={() => autoBattler()}>Auto Battle</button>
        <button onClick={() => ff()}>FF</button>
      </div>
      {fight.arena ? (
        <div className={styles.arena}>
          <div className={styles.enemyContainer}>
            {renderEnemies()}
          </div>
          <div className={styles.teamContainer}>
            {renderTeam()}
          </div>

          <div class={styles.order}>{fight.attackOrder.map((mon, index) => (
            <span className={`${styles.orderTab} ${fight.attackOrder[fight.currentAttackerIndex] === mon ? styles.activeOrder : ""} ${fight.attackTarget === mon ? styles.target : ""}`}>
              {mon.ally ? (<i></i>) : ""} {mon.name}
              {mon.alive ? "" : (<p>: dead</p>)}
            </span>
          ))}</div>
          <p>Attack Target: {fight.attackTarget.name}</p>

          <div className={styles.battleLogsContainer}>
            {fight.battleLogs.map((battleLog, index) => (
              <p key={index}>{battleLog}</p>
            ))}
          </div>
          <Monstats mon={fight.attackTarget} />
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