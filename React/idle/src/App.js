import './App.css';
import { useState, useEffect } from 'react';

import Sidebar from '../src/UI/Sidebar.js';
import Header from '../src/UI/Header';
import styles from './UIcss/Main.module.css';
import Mining from './UI/Mining';
import Player from './system/Player.js';
import Inventory from './UI/Inventory.js';

function App() {
  
  const [activeTab, setActiveTab] = useState("player");
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

  const initialSkills = {
    Mining: { level: 1, exp: 0, nextLevel: 0 , CD: 2},
    Cutting: { level: 1, exp: 0, nextLevel: 0, CD: 2},
  };

  const calculateNextLevel = (level) => 0.5 * Math.pow(level, 3.5) + 9.5;

  const [skills, setSkills] = useState(() => {
    const skillsWithNextLevel = {};
    for (const skill in initialSkills) {
      skillsWithNextLevel[skill] = {
        ...initialSkills[skill],
        nextLevel: calculateNextLevel(initialSkills[skill].level),
      };
    }
    return skillsWithNextLevel;
  });
 
 
  
  
  return (
    <div className="App">
      <header> <Header  activeTab={activeTab} skills={activity ? skills[activity] : null}/> </header>
      <aside> <Sidebar  activeTab={activeTab} setActiveTab={setActiveTab} /> </aside>
      <main className={styles.main}> 
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
      </main>
    </div>
  );
}

export default App;
