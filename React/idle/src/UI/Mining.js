import React from 'react';
import styles from '../UIcss/Mining.module.css'
import { useState } from 'react';




function Mining({setActivity}) {
    
    const [ores, setOres] = useState({
    
    job: "mining",
    type: {
      stone:    {name: "stone", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      iron:     {name: "iron", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      bronze:   {name: "bronze", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      silver:   {name: "silver", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      gold:     {name: "gold", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      emerald:  {name: "emerald", quantity: 1, exp: 1,  gold : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "mining"},
      
    
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