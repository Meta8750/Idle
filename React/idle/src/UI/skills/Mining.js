import React from 'react';
import styles from '../../UIcss/skills/Mining.module.css';
import { useState } from 'react';
import Material from './Material';



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
      stone :     new Material("stone", 1, 1, 1, 0, 0,10,"Mining"),
      copper:     new Material("copper", 1, 1, 1, 0, 0,10,"Mining"),
      tin:        new Material("tin", 1, 1, 1, 0, 0,10,"Mining"), 
      cole:       new Material("cole", 1, 1, 1, 0, 0,10,"Mining"),

      iron:       new Material("iron", 1, 1, 1, 0, 0,10,"Mining"),
      gold:       new Material("gold", 1, 1, 1, 0, 0,10,"Mining"),  
      emerald:    new Material("emerald", 1, 1, 1, 0, 0,10,"Mining"),
      crystal:    new Material("crystal", 1, 1, 1, 0, 0,10,"Mining"),

      Beryll:     new Material("Beryll", 1, 1, 1, 0, 0,10,"Mining"),
      Azurit:     new Material("Azurit", 1, 1, 1, 0, 0,10,"Mining"), 
      Pyrit:      new Material("Pyrit", 1, 1, 1, 0, 0,10,"Mining"),
      Uranini:    new Material("Uranini", 1, 1, 1, 0, 0,10,"Mining"),
      
      celestial:  new Material("celestial", 1, 1, 1, 0, 0,10,"Mining"),
      astral:     new Material("astral", 1, 1, 1, 0, 0,10,"Mining"),
      dragonite:  new Material("dragonite", 1, 1, 1, 0, 0,10,"Mining"),
      darkmatter: new Material("darkmatter", 1, 1, 1, 1, 0,10,"Mining"),
    
    }
  });
  // <p>{ores.type[ore].minLevel}</p> <p>{ores.type[ore].nextLevel}</p>  <p>{ores.type[ore].exp}</p>

    return (
        <div className={styles.mainContainer}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index} onClick={() =>  handleSelection(ores.type[ore])}>
                    <p>{ore}</p>
                   
                    <p>{ores.type[ore].mastery}</p>
                    
                    <p>{ores.type[ore].masteryExp}</p>
                    
                    {player.getActivity() ? (<i style={player.getActivity().name === ores.type[ore].name ? progressBarStyle : notActive} className={styles.i}></i>) : (<i></i>)}
                </div>
            
            ))}
        </div>
    )
   
}

export default Mining;