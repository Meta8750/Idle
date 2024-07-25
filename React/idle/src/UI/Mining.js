import React from 'react';
import styles from '../UIcss/Mining.module.css'
import { useState } from 'react';




function Mining({setActivity}) {
    
    const [ores, setOres] = useState({
    mastery: 0,
    job: "mining",
    type: {
      stone: { level: 1, exp: 1, nextLevel : 10, curve : 1.5, minLevel : 1, mastery : 0},
      iron: { level: 1, exp: 1, nextLevel : 15, curve : 1.6, minLevel : 3, mastery : 0},
    
      
    }
  });

  
    return (
        <div className={styles.Mining}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index} onClick={() => setActivity(ores.type[ore])}>
                    <p>{ore}</p>
                    <p>{ores.type[ore].level}</p>
                    <p>{ores.type[ore].exp}</p>
                    <p>{ores.type[ore].nextLevel}</p>
                    <p>{ores.type[ore].mastery}</p>
                    
                </div>
            
            
            ))}
        </div>
    )
   
}

export default Mining;