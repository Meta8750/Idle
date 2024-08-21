import React from "react";
import { useState, useEffect } from "react";
import Arena from '../system/Arena.js'
import styles from '../UIcss/Battle.module.css'
import Monstats from './MonStats.js'

const battleLogs = []

function Battle({ player }) {
  const [arena, setArena] = useState(null);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [attackOrder, setAttackOrder] = useState([]);
  const [currentAttackerIndex, setCurrentAttackerIndex] = useState(0);
  const [attackTarget, setAttackTarget] = useState("none");
  
  const initializeBattle = (batch) => {
    const battleArena = new Arena(batch);
    battleArena.genEnemys();
    setArena(battleArena);
    setCurrentBatchIndex(0);
    battleLogs.push("Battle Started");
    const team = player.getTeam();
    const currentBatch = battleArena.enemys[0];
    const combinedUnits = [...team, ...currentBatch];
    const sortedUnits = combinedUnits.sort((a, b) => b.baseMS - a.baseMS);
    setAttackOrder(sortedUnits);
    setCurrentAttackerIndex(0);
  };

  const handleAttack = (attack, mon) => {
    const attacker = attackOrder[currentAttackerIndex];
    if (!attacker.alive) {
      advanceTurn();
      return;
    }
    if (attackTarget != "none") {
      // Apply damage, buffs, debuffs, etc.
      if (attack.aoe){
          arena.enemys[currentBatchIndex].map((enemy,index) =>{
          enemy.calculateDmg(attack, mon)
        })
      } else {
        battleLogs.push(`${attacker.name} uses ${attack.name} and dealt ${attackTarget.calculateDmg(attack, mon)}`);
      }
      const updatedOrder = [...attackOrder].sort((a, b) => b.baseMS - a.baseMS);
      
      setAttackOrder(updatedOrder);
      advanceTurn();
      setAttackTarget("none")
    }
  };

  const hpBar = (mon) => {
    let pWidth = `${(mon.health / mon.maxhealth) * 100}%`; 
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

  const enemyAi = (enemy) => {
    const attack = enemy.attacks[Math.floor(Math.random() * 3)];
    const target = player.getTeam()[Math.floor(Math.random() * 3)];
    battleLogs.push(`${enemy.name} uses ${attack.name} and dealt ${target.calculateDmg(attack, enemy)}`)
    // Re-calculate the attack order if necessary
    const updatedOrder = [...attackOrder].sort((a, b) => b.baseMS - a.baseMS);
    setAttackOrder(updatedOrder);
    advanceTurn();
  };

  const handleTarget = (target) => {
    setAttackTarget(target)
  }

  const advanceTurn = () => {
    let nextIndex = (currentAttackerIndex + 1) % attackOrder.length;
    while (!attackOrder[nextIndex].alive) {
      nextIndex = (nextIndex + 1) % attackOrder.length;
    }
    setCurrentAttackerIndex(nextIndex);
  };

  useEffect(() => {
    const currentAttacker = attackOrder[currentAttackerIndex];
    if (currentAttacker && arena && arena.enemys.flat().includes(currentAttacker)) {
      setTimeout(() => {
        enemyAi(currentAttacker);
      }, 1000);
      
    }
  }, [currentAttackerIndex]);

  const renderTeam = () => {
    return player.getTeam().map((mon, index) => (
      <div onClick={() => handleTarget(mon)}
        key={index}
        className={`${styles.mon} ${
          attackOrder[currentAttackerIndex] === mon ? styles.activeMon : ""
        }`}
      > 
        <p>{mon.name} {mon.level}</p>
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(mon)}>{mon.maxHealth}{mon.health}</div></div>
        {mon.getImageElement("200px", "200px")}
      
        <ul>
          {mon.attacks.map((attack, attackIndex) => (
            <li
              onClick={() => handleAttack(attack, mon)}
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
    if (!arena || !arena.enemys || arena.enemys.length === 0) return null;

    const currentBatch = arena.enemys[currentBatchIndex];

    if (!currentBatch) return <p>No more enemies!</p>;

    return currentBatch.map((enemy, index) => (
      
      <div onClick={() => handleTarget(enemy)}
        key={index}
        className={`${styles.enemy} ${
          attackOrder[currentAttackerIndex] === enemy ? styles.activeEnemy : ""
        }`}
      >
        <p>{enemy.name}</p>
        <div className={styles.hpBar}><div className={styles.hpFill} style={hpBar(enemy)}>{enemy.maxHealth}{enemy.health}</div></div>
        {enemy.getImageElement("200px", "200px")}
      </div>
      
    ));
  };

  const checkAndAdvanceBatch = () => {
    if (!arena || !arena.enemys) return;
    
    const currentBatch = arena.enemys[currentBatchIndex];
    const allDefeated = currentBatch.every(enemy => !enemy.alive);
    
    if (allDefeated) {
      if (currentBatchIndex < arena.enemys.length - 1) {
        // Advance to the next batch
        setCurrentBatchIndex(prevIndex => {
          const newIndex = prevIndex + 1;
          const team = player.getTeam();
          const newBatch = arena.enemys[newIndex];
          const combinedUnits = [...team, ...newBatch];
          const sortedUnits = combinedUnits.sort((a, b) => b.MS - a.MS);
          setAttackOrder(sortedUnits);
          setCurrentAttackerIndex(0);
          return newIndex;
        });
      } else {
        // All batches completed
        setArena(null);
      }
    }
  };
  
  useEffect(() => {
    checkAndAdvanceBatch();
  }, [arena, currentBatchIndex, attackOrder]);

  return (
    <div>
      <p>
        <button onClick={() =>initializeBattle([[0, 1, 0], [0, 1, 1]])}>Start Battle</button>
        <button onClick={() =>initializeBattle([[1, 1, 1], [0, 1, 1], [1,5,1]])}>Start Battle</button>
      </p>
        {arena ? (
             <div className={styles.arena}>
            <div className={styles.enemyContainer}>
              {renderEnemies()}
            </div>
            <div className={styles.teamContainer}>
              {renderTeam()}
            </div>
            <div>
              <p>Attack Order: {attackOrder.map((mon,index) => (
                <span className={`${styles.mon} ${
                  attackOrder[currentAttackerIndex] === mon ? styles.activeMon : ""
                }`}>{mon.name}</span>
              ))}</p>
              <p>Current Attacker: {attackOrder[currentAttackerIndex].name}</p>
              <p>Attack Target: {attackTarget.name}</p>
            </div>
            <div className={styles.battleLogsContainer}>
                {battleLogs.map((battleLog, index) => (
                <p key={index}>{battleLog}</p>
              ))}
            </div>
            
              <Monstats mon={attackTarget}/>
            </div>
        ) : (
          <p>No current Battle</p>
        )}
      
    </div>
  );
}

export default Battle;