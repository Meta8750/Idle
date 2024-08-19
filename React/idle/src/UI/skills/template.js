import React from 'react';
// import styles from '../../UIcss/skills/Mining.module.css'
import { useState } from 'react';




function Mining({time, player}) {

    const progressBarWidth = player.getCurrentSkill() ? ( time / (player.getCurrentSkill().CD + player.getActivity().additionalCD)) * 100 + '%' : '0%';

        const progressBarStyle = {
          width: progressBarWidth,
        };
        const notActive = {
          display: 'none',
        }

    const handleSelection = (selectedItem) => {
      
      if (player.getSkills('').level >= selectedItem.minLevel) {
        player.setActivity(selectedItem);
      }
      
    }
   
    const [materials, setOres] = useState({
    
    job: "",
    type: {
      stone:    {name: "", quantity: 1, exp: 1,  value : 1, minLevel : 0, mastery : 0, additionalCD : 0, job: ""},
 
   
    }
  });

    return (
        <div className={styles.mainContainer}>
            
            {Object.keys(materials.type).map((material, index) => (
                <div className={styles.div} key={index} onClick={() =>  handleSelection(materials.type[material])}>
                    <p>{material}</p>
                    <p>{materials.type[material].exp}</p>
                    <p>{materials.type[material].mastery}</p>
                    <p>{materials.type[material].minLevel}</p>
                    {player.getActivity() ? (<i style={player.getActivity().name === materials.type[material].name ? progressBarStyle : notActive} className={styles.i}></i>) : (<i></i>)}
                </div>
            
            ))}
        </div>
    )
   
}

export default Mining;