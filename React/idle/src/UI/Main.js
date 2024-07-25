import React, {useState, useEffect} from 'react';

import styles from '../UIcss/Main.module.css';

import Hub from './Hub.js'
import Mining from './Mining.js';
import Player from '../system/Player.js';




function Main({ activeTab }) {

    const [activity, setActivity] = useState(null);
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
                setTime((prev) => prev + 1);
        },1000);

        return () => {
            
            clearInterval(interval);

            
            }
                
            
    }, [])

    

  return (
    <div>
      
      <div className={activeTab === 'Player' ? styles.visible : styles.hidden}>
        <Player time={time} activity={activity} />
      </div>
      <div className={activeTab === 'Mining' ? styles.visible : styles.hidden}>
        <Mining setActivity={setActivity}/>
      </div>
      <p>{activity}</p>
    </div>
  );
  

}

export default Main;