import './App.css';
import { useState, useEffect } from 'react';

import styles from './UIcss/Main.module.css';
import Sidebar from '../src/UI/Sidebar.js';
import Header from '../src/UI/Header';

import Mining from './UI/skills/Mining.js';
import Gambling from './UI/skills/Gambling.js';
import Smithing from './UI/skills/Smithing.js';
import Cutting from './UI/skills/Cutting.js';
import Crafting from './UI/skills/Crafting.js';

import DisplayInventory from './UI/DisplayInventory.js';
import MonManager from './UI/MonManager.js';
import Battle from './UI/Battle.js';
import Shop from './UI/Shop.js';

import Player from './system/Player.ts';
import Logout from './system/Logout.js';
import Casino from './system/Casino.ts';

let flag = false
const player = new Player();
const casino = new Casino();
function App() {
  const [time, setTime] = useState(0);
  
 

  useEffect(() => {
    const tick = () => {
      setTime((prev) => {
        let newTime = prev + 0.0167;  
        if (flag){newTime = 0}
        return newTime
      });
      requestAnimationFrame(tick);
    };
    tick();  
    return () => {
    };
  }, []);
  
  const activeTab = player.getActiveTab()
  flag = player.progress(time)
  

  return (
    <div className="App">
      <header> <Header player={player}/> </header>
      <aside> <Sidebar player={player} setTime={setTime} time={time}/> </aside>
      <main className={styles.main}> 
        <div>
          <div className={activeTab === 'Inventory' ? styles.visible : styles.hidden}>
            <DisplayInventory  player={player} />
          </div>
          <div className={activeTab === 'Shop' ? styles.visible : styles.hidden}>
            <Shop  player={player} />
          </div>
          <div className={activeTab === 'Battle' ? styles.visible : styles.hidden}>
            <Battle  time={time} player={player}/>
          </div>
          <div  className={activeTab === 'MonManager' ? styles.visible : styles.hidden}>
            <MonManager player={player}/>
          </div>
          <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
            <Mining  time={time} player={player}/>
          </div>
          <div className={activeTab === 'Cutting' ? styles.visible : styles.hidden}>
            <Cutting  time={time} player={player}/>
          </div>
          <div className={activeTab === 'Smithing' ? styles.visible : styles.hidden}>
            <Smithing  time={time} player={player}/>
          </div>
          <div className={activeTab === 'Crafting' ? styles.visible : styles.hidden}>
            <Crafting  time={time} player={player}/>
          </div>
          <div className={activeTab === 'Gambling' ? styles.visible : styles.hidden}>
            <Gambling player={player} casino={casino}/>
          </div>
          <div className={activeTab === 'Logout' ? styles.visible : styles.hidden}>
            <Logout   time={time} player={player}/>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;

