import React from "react";
import { useState, useEffect } from "react";
import Arena from '../system/Arena.js'
import styles from '../UIcss/Battle.module.css'

function Battle({ player }) {
  const [arena, setArena] = useState(null);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);
  const [attackOrder, setAttackOrder] = useState([]);
  const [currentAttackerIndex, setCurrentAttackerIndex] = useState(0);
  const [attackTarget, setAttackTarget] = useState("none");

  const initializeBattle = () => {
    const grassField = new Arena([[0, 1, 0], [0, 1, 1]]);
    grassField.genEnemys();
    setArena(grassField);
    setCurrentBatchIndex(0);

    // Initialize attack order
    const team = player.getTeam();
    const currentBatch = grassField.enemys[0];
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
      console.log(`${attacker.name} uses ${attack.name}`);
      
      
      // Apply damage, buffs, debuffs, etc.
      if (attack.aoe){
        arena.enemys[currentBatchIndex].map((enemy,index) =>{
          enemy.calculateDmg(attack, mon)
          
        })

      } else {
        attackTarget.calculateDmg(attack, mon)
      }

      
      const updatedOrder = [...attackOrder].sort((a, b) => b.baseMS - a.baseMS);
      setAttackOrder(updatedOrder);
      
      advanceTurn();
      setAttackTarget("none")

    }
    
  };

  const hpBar = (mon) => {
    const pWidth = `${(mon.health / mon.maxhealth) * 100}%`; 
    
    return {
      width: pWidth,
    };
  };

  const enemyAi = (enemy) => {
    const attack = enemy.attacks[Math.floor(Math.random() * 3)];
    const target = player.getTeam()[Math.floor(Math.random() * 3)];
    
    target.calculateDmg(attack, enemy);

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
    // If the current attacker is an enemy, trigger the AI to take action
    const currentAttacker = attackOrder[currentAttackerIndex];
    if (currentAttacker && arena && arena.enemys.flat().includes(currentAttacker)) {
      enemyAi(currentAttacker);
      
    }
  }, [currentAttackerIndex]);

  const renderTeam = () => {
    return player.getTeam().map((mon, index) => (
      <div
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
              key={attackIndex}
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
        <p>HP: {enemy.health}</p>
        {enemy.getImageElement("200px", "200px")}
      </div>
      
    ));
  };

  const checkAndAdvanceBatch = () => {
    if (!arena || !arena.enemys) return;

    const currentBatch = arena.enemys[currentBatchIndex];
    const allDefeated = currentBatch.every(enemy => !enemy.alive);
    
    if (allDefeated && currentBatchIndex < arena.enemys.length - 1) {
      
      setCurrentBatchIndex(currentBatchIndex + 1);
      // Resetting the attack order for the new batch of enemies
      const team = player.getTeam();
      const newBatch = arena.enemys[currentBatchIndex + 1];
      const combinedUnits = [...team, ...newBatch];
      const sortedUnits = combinedUnits.sort((a, b) => b.MS - a.MS);
      setAttackOrder(sortedUnits);
      setCurrentAttackerIndex(0);
    }

    if (currentBatchIndex >= arena.enemys.length - 1){
      console.log("won")
    }

  };

  useEffect(() => {
    checkAndAdvanceBatch();
  }, [arena, currentAttackerIndex]);

  return (
    <div>
      <p>
        <button onClick={initializeBattle}>Start Battle</button>
      </p>
     
        {arena ? (
             <div className={styles.arena}>
            <div className={styles.enemyContainer}>
              {renderEnemies()}
            </div>
            <div className={styles.teamContainer}>
              {renderTeam()}
            </div>
            </div>

          
            

        ) : (
          <p>No current Battle</p>
        )}
      
    </div>
  );
}

export default Battle;