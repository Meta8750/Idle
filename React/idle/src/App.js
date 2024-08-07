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
  const [time, setTime] = useState(0);
  
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

  const activeTab = player.getActiveTab()
  
  return (
    <div className="App">
      <header> <Header player={player}/> </header>
      <aside> <Sidebar player={player} setTime={setTime} time={time}/> </aside>
      <main className={styles.main}> 
        <div>
          <div className={activeTab === 'Inventory' ? styles.visible : styles.hidden}>
            <Inventory  player={player} />
          </div>
          <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
            <Mining  time={time} player={player}/>
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

