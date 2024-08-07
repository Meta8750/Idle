import './App.css';
import { useState, useEffect } from 'react';

import styles from './UIcss/Main.module.css';
import Sidebar from '../src/UI/Sidebar.js';
import Header from '../src/UI/Header';
import Mining from './UI/Mining';
import Inventory from './UI/Inventory.js';
import Player from './system/Player.js';
import Logout from './system/Logout';

const player = new Player();

function App() {

  

 
  
  const [activeTab, setActiveTab] = useState("player");

  const [time, setTime] = useState(0);
  const [inventory, setInventory] = useState([]);


  
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
      setTime((prev) => {
        let newTime = prev + 0.01
        newTime = player.progress(newTime)
        return newTime
      });
      
    }, 10);

    return () => {
      clearInterval(interval);
      
    };
  }, []);
  
  

  
  return (
    <div className="App">
      <header> <Header  activeTab={activeTab} player={player}/> </header>
      <aside> <Sidebar  activeTab={activeTab} setActiveTab={setActiveTab}  player={player} setTime={setTime} time={time}/> </aside>
      <main className={styles.main}> 
        <div>
          <div className={activeTab === 'Inventory' ? styles.visible : styles.hidden}>
            <Inventory inventory={inventory} updateItem={updateItem} player={player}/>
          </div>
          <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
            <Mining  time={time} player={player}/>
          </div>
          <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
            <Logout   time={time} player={player}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

