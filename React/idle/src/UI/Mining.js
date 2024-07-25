import React from 'react';
import styles from '../UIcss/Mining.module.css'
import { useState } from 'react';




function Mining({setActivity}) {
    
    const [ores, setOres] = useState({
    
    job: "mining",
    type: {
      stone:    {exp: 1,  minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      iron:     {exp: 3,   minLevel : 3, mastery : 0, additionalCD : 0, job: "mining"},
    
    }
  });

    return (
        <div className={styles.Mining}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index} onClick={() => setActivity(ores.type[ore])}>
                    <p>{ore}</p>
                    
                    <p>{ores.type[ore].exp}</p>
                    <p>{ores.type[ore].mastery}</p>
                    
                </div>
            
            ))}
        </div>
    )
   
}

export default Mining;