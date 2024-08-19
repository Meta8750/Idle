import React from "react";
import { useState, useEffect } from "react";
import Arena from '../system/Arena.js'
import styles from '../UIcss/Battle.module.css'

function Battle({ player }) {
  const [arena, setArena] = useState(null);
  const [currentBatchIndex, setCurrentBatchIndex] = useState(0);

  const initializeBattle = () => {
    const grassField = new Arena([[0, 1, 0], [0, 1, 0]]);
    grassField.genEnemys();
    setArena(grassField);
    setCurrentBatchIndex(0); // Start with the first batch of enemies
  };

  const renderTeam = () => {
    return player.getTeam().map((mon, index) => (
                  
      <div className={styles.boxSlot}>
       
          <p>{mon.name} {mon.level}</p>
          {mon.getImageElement()}
      </div>
  ))};

  const renderEnemies = () => {
    if (!arena || !arena.enemys || arena.enemys.length === 0) return null;

    const currentBatch = arena.enemys[currentBatchIndex];

    if (!currentBatch) return <p>No more enemies!</p>;

    return currentBatch.map((enemy, index) => (
      <div key={index} className={styles.enemy}>
        <p>{enemy.name}</p>
        <p>HP: {enemy.health}</p>
        {enemy.getImageElement()}
      </div>
    ));
  };

  const checkAndAdvanceBatch = () => {
    if (!arena || !arena.enemys) return;

    const currentBatch = arena.enemys[currentBatchIndex];
    const allDefeated = currentBatch.every(enemy => !enemy.alive);

    if (allDefeated && currentBatchIndex < arena.enemys.length - 1) {
      setCurrentBatchIndex(currentBatchIndex + 1);
    }
  };

  useEffect(() => {
    checkAndAdvanceBatch();
  }, [arena, currentBatchIndex]);

  return (
    <div>
      <p>
        <button onClick={initializeBattle}>Start Battle</button>
      </p>
      <div className={styles.arena}>
        {arena ? (
          <div>
            
            {renderEnemies()}
            {renderTeam()}
          </div>
        ) : (
          <p>No current Battle</p>
        )}
      </div>
    </div>
  );
}

export default Battle;