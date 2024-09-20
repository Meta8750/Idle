import React from "react";
import { useState, useEffect } from "react";
import styles from '../UIcss/Battle.module.css'
import Monstats from './MonStats.js'
import PostScreen from "./PostScreen.js";
import Fight from "../system/Fight.ts";

const battleLogs = []
let fight = new Fight()

function Battle({ player }) {

  const initializeBattle = (batch, exp) => {
    fight.startFight(player, batch, exp)
    
  }
 
  const hpBar = (mon) => {
    let pWidth = `${(mon.health / mon.maxHealth) * 100}%`; 
    if (mon.health <= 0){
      pWidth = '0%'
    }
    return {
      width: pWidth,
    };
  };

  const manaBar = (mon) =>{
    let pWidth = `${(mon.mana / mon.maxmana) * 100}%`;
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
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(mon)}>{mon.maxHealth}\{mon.health}</div></div>
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
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(enemy)}>{enemy.maxHealth}\{enemy.health}</div></div>
        <img class="w-52 h-52" alt ={enemy.name}src={enemy.img}></img>
      </div>
      
    ));
  };

  return (
    <div>
      <p>
        <button onClick={() =>initializeBattle([[10000, 10001, 10000]],100)}>Start Battle</button>
        <button onClick={() =>initializeBattle([[10001, 10001, 10001], [10000, 10001, 10001], [10001,10005,10001]],1000)}>Start Battle</button>
      </p>
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
                {battleLogs.map((battleLog, index) => (
                <p key={index}>{battleLog}</p>
              ))}
            </div>
            
              <Monstats mon={fight.attackTarget}/>
           
             
            </div>
        ) : (
          <p>No current Battle</p>
        )}
      
       <div className={fight.result === "won" ? styles.visible : styles.hidden}> <PostScreen team={player.getTeam()} arena={fight.lastFight} result={fight.result}/>1</div>
    </div>
  );
}

export default Battle;