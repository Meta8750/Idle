import React, { useState, useEffect } from 'react';
import styles from '../UIcss/ItemManager.module.css'
import ItemStar from './components/ItemStars.tsx'

function ItemManager({player})  {

  const [focusedItem, setFocusedItem] = useState(null);
  const [focusedMon, setFocusedMon] = useState(null);
  
  
  const handleSell = () => {
    if (focusedItem) {
      
        player.inventory.updateItem({name: focusedItem.name, quantity: -focusedItem.quantity});
       
        
      }
  };
  const equipItem = () => {
    if (focusedItem && focusedItem.equipped === false) {
      focusedMon.equipItem(focusedItem);
      
    } else {
      focusedMon.removeItem(focusedItem);
    }
  }

  const focusingItem = (item) => {
      setFocusedItem(item);
  }

  const focusingMon = (mon) =>{
      setFocusedMon(mon);
  }
  
    return (
        <div className={styles.mainContainer}>
          <div className={styles.box}>
          
          {player.inventory.getInventory().map((item, index) => (
                <ul className={styles.items} onClick={() => setFocusedItem(item)}>
                  <li key={index}>
                  <p class="px-0 m-0 f text-sm" >{item.name}</p>
                  <img class="px-1 w-9 mr-auto ml-auto" src={item.img}></img>
                  <h1 class="">{item.quantity}</h1>
                  <ItemStar item={item}/>
                  <span></span>
                </li>
                </ul>
              ))}
          </div>
          
          
          <div className={styles.team}>
          {player.getTeam() ? (
                player.getTeam().map((mon, index) => (
                  
                  <div className="" onClick={() => setFocusedMon(mon)}>
                      <p>{mon.name} {mon.level}</p>

                      <img class="w-52 h-52" alt ={mon.name}src={mon.img}></img>
                  </div>
                
              ))
            ) : (<p>d</p>)}</div>
            
            
            <div className={styles.stats}>
              {focusedItem ? (
                <div>
                  <p>{focusedItem.name}</p>
                  <p>{focusedItem.quantity}</p>
                  <p>{focusedItem.value}</p>
                  {Object.entries(focusedItem.temp).map(([stat, value]) => {
                  return <p>{stat} {value}</p>
                    })}
                  <img class="px-35" alt ={focusedItem.name}src={focusedItem.img}></img>
                  <button onClick={() => equipItem()}>equip</button>
              </div>  ) : (  <p>No Item selected</p>  )}

              {focusedMon ? (
                
                
                <div>
                  <p>{focusedMon.name}</p>
                  {Object.entries(focusedMon.equipment).map(([type, item]) => {
                  return ( <div class="flex">
                              <p>{type}</p> 
                              {item != null ? <p>:{" "} {item.name}</p>
                              : <p></p>}
                          </div>
                          )
                       })};

              </div>) : ( <p>No Mon selected</p> )}
               
             
          </div>
        </div>
      );
    }

export default ItemManager;