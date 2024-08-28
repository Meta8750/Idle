import React from 'react';
import styles from '../../UIcss/skills/Mining.module.css';
import { useState, useEffect } from 'react';
import Material from './Material';



function Mining({time, player}) {
    const progressBarWidth = player.getCurrentSkill() ? ( time / (player.getCurrentSkill().CD + player.getActivity().additionalCD)) * 100 + '%' : '0%';
    const [ores, setOres] = useState({
      job: "mining",
      type: {
        stone :     new Material("Stone", 1, 1, 1, 0, 0,10,"Mining"),
        copper:     new Material("Copper", 1, 1, 1, 0, 0,10,"Mining"),
        tin:        new Material("Tin", 1, 1, 1, 0, 0,10,"Mining"), 
        cole:       new Material("Cole", 1, 1, 1, 0, 0,10,"Mining"),
  
        iron:       new Material("Iron", 1, 1, 1, 0, 0,10,"Mining"),
        gold:       new Material("Gold", 1, 1, 1, 0, 0,10,"Mining"),  
        emerald:    new Material("Emerald", 1, 1, 1, 0, 0,10,"Mining"),
        crystal:    new Material("Crystal", 1, 1, 1, 0, 0,10,"Mining"),
  
        beryll:     new Material("Beryll", 1, 1, 1, 0, 0,10,"Mining"),
        azurit:     new Material("Azurit", 1, 1, 1, 0, 0,10,"Mining"), 
        pyrit:      new Material("Pyrit", 1, 1, 1, 0, 0,10,"Mining"),
        uranini:    new Material("Uranini", 1, 1, 1, 0, 0,10,"Mining"),
        
        celestial:  new Material("Celestial", 1, 1, 1, 0, 0,10,"Mining"),
        astral:     new Material("Astral", 1, 1, 1, 0, 0,10,"Mining"),
        dragonite:  new Material("Dragonite", 1, 1, 1, 0, 0,10,"Mining"),
        darkmatter: new Material("Darkmatter", 1, 1, 1, 1, 0,10,"Mining"),
      
      }
    });

      
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

  // <p>{ores.type[ore].minLevel}</p> <p>{ores.type[ore].nextLevel}</p>  <p>{ores.type[ore].exp}</p>

    return (
        <div className={styles.mainContainer}>
            
            {Object.keys(ores.type).map((ore, index) => (
                <div className={styles.div} key={index}  onClick={() =>  handleSelection(ores.type[ore])}>
                    <p>{ore}</p>
              
                    {ores.type[ore].getImageElement("55px", "55px")}
                    <div className={styles.timeBar}>
                    {player.getActivity() ? (<i style={player.getActivity().name === ores.type[ore].name ? progressBarStyle : notActive} className={styles.timeBarI}></i>) : (<i></i>)}
                    </div>
                    <p class="">{ores.type[ore].mastery}</p>
                    <p>{ores.type[ore].masteryExp}</p>
                    <div className={styles.masteryBar}><i className={styles.masteryBarI} style={{ width: ores.type[ore].masteryBarWidth }}></i></div>
                    
                </div>
            ))}
        </div>
    )
   
}

export default Mining;