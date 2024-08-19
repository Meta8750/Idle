import React from 'react';
import styles from '../../UIcss/skills/Mining.module.css';
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
      
      if (player.getSkills('Mining').level >= selectedItem.minLevel) {
        player.setActivity(selectedItem);
      }
      
    }
   
    const [ores, setOres] = useState({
    
    job: "mining",
    type: {
      stone:    {name: "stone", quantity: 1, exp: 1,  value : 1, minLevel : 0, mastery : 0, additionalCD : 0, job: "Mining"},
      copper:   {name: "copper", quantity: 1, exp: 1,  value : 1, minLevel : 5, mastery : 0, additionalCD : 0, job: "Mining"},
      tin:      {name: "tin", quantity: 1, exp: 1,  value : 1, minLevel : 10, mastery : 0, additionalCD : 0, job: "Mining"},
      cole:     {name: "cole", quantity: 1, exp: 1,  value : 1, minLevel : 15, mastery : 0, additionalCD : 0, job: "Mining"},

      iron:     {name: "iron", quantity: 1, exp: 2,  value : 1, minLevel : 15, mastery : 0, additionalCD : 5, job: "Mining"},
      gold:     {name: "gold", quantity: 1, exp: 15,  value : 1, minLevel : 20, mastery : 0, additionalCD : 0, job: "Mining"},
      emerald:  {name: "emerald", quantity: 1, exp: 20,  value : 1, minLevel : 25, mastery : 0, additionalCD : 0, job: "Mining"},
      crystal:  {name: "crystal", quantity: 1, exp: 20,  value : 1, minLevel : 30, mastery : 0, additionalCD : 0, job: "Mining"},

      Beryll:   {name: "Beryll", quantity: 1, exp: 20,  value : 1, minLevel : 35, mastery : 0, additionalCD : 0, job: "Mining"},
      Azurit:   {name: "Azurit", quantity: 1, exp: 20,  value : 1, minLevel : 40, mastery : 0, additionalCD : 0, job: "Mining"},
      Pyrit:    {name: "Pyrit", quantity: 1, exp: 20,  value : 1, minLevel : 45, mastery : 0, additionalCD : 0, job: "Mining"},
      Uraninit: {name: "Uraninit", quantity: 1, exp: 20,  value : 1, minLevel : 50, mastery : 0, additionalCD : 0, job: "Mining"},
      
      celestial:{name: "celestial", quantity: 1, exp: 20,  value : 1, minLevel : 55, mastery : 0, additionalCD : 0, job: "Mining"},
      astral:   {name: "astral", quantity: 1, exp: 20,  value : 1, minLevel : 55, mastery : 0,  additionalCD : 0, job: "Mining"},
      dragonite: {name: "dragonite", quantity: 1, exp: 20,  value : 1, minLevel : 55, mastery : 0, additionalCD : 0, job: "Mining"},
      darkMatter:{name: "darkMatter", quantity: 1, exp: 20,  value : 1, minLevel : 100, mastery : 0, additionalCD : 0, job: "Mining"},
    
    }
  });

    return (
        <div className={styles.mainContainer}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index} onClick={() =>  handleSelection(ores.type[ore])}>
                    <p>{ore}</p>
                    <p>{ores.type[ore].exp}</p>
                    <p>{ores.type[ore].mastery}</p>
                    <p>{ores.type[ore].minLevel}</p>
                    {player.getActivity() ? (<i style={player.getActivity().name === ores.type[ore].name ? progressBarStyle : notActive} className={styles.i}></i>) : (<i></i>)}
                </div>
            
            ))}
        </div>
    )
   
}

export default Mining;