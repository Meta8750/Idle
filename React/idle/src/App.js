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

  const [player, setPlayer] = useState({
    name: 'Player1',
    health: 100,
    level: 1,
    exp: 0,
    coins: 0
    
  });
  
  // Funktion zum Hinzufügen oder Aktualisieren eines Items im Inventar
  const updateItem = (item) => {
        setInventory((prevInventory) => {
        const existingItemIndex = prevInventory.findIndex(i => i.name === item.name);
        if (existingItemIndex >= 0) {
            
            const updatedInventory = [...prevInventory];
            updatedInventory[existingItemIndex] = {
            ...updatedInventory[existingItemIndex],
            quantity: updatedInventory[existingItemIndex].quantity + item.quantity
            };
            return updatedInventory;
        } else {
            
            return [...prevInventory, { name: item.name, quantity: item.quantity , value: item.value}];
        }
        });
    };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.01);
      
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const initialSkills = {
    Mining: { level: 1, maxLevel: 100, exp: 0, nextLevel: 0 , CD: 2},
    Cutting: { level: 1, maxLevel: 100, exp: 0, nextLevel: 0, CD: 2},
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
 
  const updateSkillExp = (skillName, exp) => {
    setSkills((prevSkills) => {
      const updatedSkill = { ...prevSkills[skillName] };
      
      updatedSkill.exp += exp;
      
      if (updatedSkill.exp >= updatedSkill.nextLevel) {
        updatedSkill.level += 1;
        updatedSkill.exp = 0; 
        updatedSkill.nextLevel = calculateNextLevel(updatedSkill.level);
      }

      return {
        ...prevSkills,
        [skillName]: updatedSkill,
      };
    });}

  
  return (
    <div className="App">
      <header> <Header  activeTab={activeTab} skills={activity ? skills[activeTab] : null}/> </header>
      <aside> <Sidebar  activeTab={activeTab} setActiveTab={setActiveTab} player={player}/> </aside>
      <main className={styles.main}> 
        <div>
          <div className={activeTab === 'Player' ? styles.visible : styles.hidden}>
            <Player time={time} setTime={setTime} updateItem={updateItem} activity={activity} skills={skills} updateSkillExp={updateSkillExp} player={player} setPlayer={setPlayer}/>
          </div>
          <div className={activeTab === 'Inventory' ? styles.visible : styles.hidden}>
            <Inventory inventory={inventory} updateItem={updateItem} setPlayer={setPlayer}/>
          </div>
          <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
            <Mining activity={activity} setActivity={setActivity} time={time} skills={skills['Mining']}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

