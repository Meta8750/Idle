import React, { useState, useEffect } from 'react';
import styles from '../UIcss/Main.module.css';
import Mining from './Mining';
import Player from '../system/Player.js';
import Inventory from './Inventory.js';

function Main({ activeTab, skills}) {
  const [activity, setActivity] = useState(null);
  const [time, setTime] = useState(0);
  const [inventory, setInventory] = useState([]);

  // Funktion zum Hinzufügen oder Aktualisieren eines Items im Inventar
  const updateItem = (item) => {
        setInventory((prevInventory) => {
        const existingItemIndex = prevInventory.findIndex(i => i.name === item.name);
        if (existingItemIndex >= 0) {
            // Item existiert, aktualisiere die Menge
            const updatedInventory = [...prevInventory];
            updatedInventory[existingItemIndex] = {
            ...updatedInventory[existingItemIndex],
            quantity: updatedInventory[existingItemIndex].quantity + item.quantity
            };
            return updatedInventory;
        } else {
            // Item existiert nicht, füge es hinzu
            return [...prevInventory, { name: item.name, quantity: item.quantity }];
        }
        });
    };



  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div>
      <div className={activeTab === 'Player' ? styles.visible : styles.hidden}>
        <Player time={time} setTime={setTime} updateItem={updateItem} activity={activity} skills={skills}/>
      </div>
      <div className={activeTab === 'Inventory' ? styles.visible : styles.hidden}>
        <Inventory inventory={inventory}/>
      </div>
      <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
        <Mining setActivity={setActivity} />
      </div>
      
    </div>
  );
}

export default Main;