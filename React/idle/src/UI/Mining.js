import React from 'react';
import styles from '../UIcss/Mining.module.css'
import { useState } from 'react';




function Mining({time, player}) {
    
    const progressBarWidth = player.getCurrentSkill() ? ( time / player.getCurrentSkill().CD) * 100 + '%' : '0%';

        const progressBarStyle = {
          width: progressBarWidth,
        };
        const notActive = {
          display: 'none',
        }

    const handleSelection = (selectedItem) => {
      player.setActivity(selectedItem);
      
    }
   
    
    const [ores, setOres] = useState({
    
    job: "mining",
    type: {
      stone:    {name: "stone", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      iron:     {name: "iron", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      bronze:   {name: "bronze", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      silver:   {name: "silver", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      gold:     {name: "gold", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      emerald:  {name: "emerald", quantity: 1, exp: 1,  value : 1, minLevel : 1, mastery : 0, additionalCD : 0, job: "Mining"},
      
    
    }
  });

    return (
        <div className={styles.Mining}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index} onClick={() =>  handleSelection(ores.type[ore])}>
                    <p>{ore}</p>
                    <p>{ores.type[ore].exp}</p>
                    <p>{ores.type[ore].mastery}</p>
                    {player.getActivity() ? (<i style={player.getActivity().name === ores.type[ore].name ? progressBarStyle : notActive} className={styles.i}></i>) : (<i></i>)}
                </div>
            
            ))}
        </div>
    )
   
}

export default Mining;