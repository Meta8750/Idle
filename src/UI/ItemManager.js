import React, { useState, useEffect } from 'react';
import styles from '../UIcss/ItemManager.module.css'
import ItemStar from './components/ItemStars.tsx'
import MonStats from './components/MonStats.tsx'



function ItemManager({player, mon, setTab})  {

 

  const [focusedItem, setFocusedItem] = useState(null);
 
  const [itemTab, setItemTab] = useState("chain");
 
  if (player.mons.length === 0 ||  mon === undefined) {
    return <p>No Mons available</p>; // break if player dont have mons
  }
  
  const handleSell = () => {
    if (focusedItem) {
      
        player.inventory.updateItem({name: focusedItem.name, quantity: -focusedItem.quantity});
       
      }
  };
  const equipItem = () => {
    
    if (focusedItem.equipped === true){
      player.removeItemFromMon(focusedItem.slotType, focusedItem.uid)
      
    } else {
      mon.equipItem(focusedItem);
    }
   
    
  }

  const focusingItem = (item) => {
      setFocusedItem(item);
  }
  
    return (
        <div className={styles.mainContainer}>
          <div className={styles.box}>
          
          {player.inventory.getArtifacts().map((item, index) => (
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
          <button onClick={() => setTab("mon")}>back</button>
                  <div className="" >
                      <p>{mon.name}</p>

                      <img class="w-52 h-52" alt ={mon.name}src={mon.img}></img>
                      <MonStats mon={mon} />
                      
                  </div>
              </div>
            
            
            <div className={styles.stats}>
              <div class="flex">
                <button className={styles.itemSelection} onClick={() => setItemTab("chain")}>chain</button>
                <button className={styles.itemSelection} onClick={() => setItemTab("ring")}>ring</button>
                <button className={styles.itemSelection} onClick={() => setItemTab("necklace")}>necklace</button>
                <button className={styles.itemSelection} onClick={() => setItemTab("head")}>head</button>
                <button className={styles.itemSelection} onClick={() => setItemTab("book")}>book</button>
              </div>
             

              {mon ? (
                
                
              <div>
                 
                {Object.entries(mon.equipment).map(([type, item]) => {
                  return (
                    <div class="flex">
                      {type === itemTab ? (<div>
                        {item != null ? (
                          <div>
                            <p>{item.name}</p>
                            
                        
                              {Object.entries(item.temp).map(([stat, value]) => {
                                return <p>{stat} {value}</p>})}
                                 
                            <img class="px-35" src={item.img}></img>
                            
                          </div> ) : <p></p>}  </div>) : (<p></p>)}
            
                        </div>
                        )
                    })}

              </div>) : ( <p>No Mon selected</p> )}

              {focusedItem ? (
                <div >
                <p>{focusedItem.name}</p>
                <p>{focusedItem.quantity}</p>
                <p>{focusedItem.value}</p>
                
                <button onClick={()=> focusedItem.randomStats()}>upgrade</button>
                {Object.entries(focusedItem.temp).map(([stat, value]) => {
                return <p>{stat} {value}</p> })}
                 
                <img class="px-35"src={focusedItem.img}></img>
                <button onClick={() => equipItem()}>equip</button>
            </div>  ) : (  <p>No Item selected</p>  )}
               
             
          </div>
        </div>
      );
    }

export default ItemManager;