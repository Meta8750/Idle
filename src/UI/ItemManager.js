import React, { useState, useEffect } from 'react';
import styles from '../UIcss/ItemManager.module.css'

function ItemManager({player})  {

  const [focusedItem, setFocusedItem] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  
  const handleSell = () => {
    if (focusedItem) {
        player.setCoins(focusedItem.value * sellQuantity)
      
        player.inventory.updateItem({name: focusedItem.name, quantity: -focusedItem.quantity});
        focusedItem.quantity -= sellQuantity;
        setSellQuantity(focusedItem.quantity)
        
      }
  };

  const handleSliderChange = (e) => {
    setSellQuantity(Number(e.target.value));
  };
  
    return (
        <div className={styles.inventory}>
          <div className={styles.storage}>
          
          {player.inventory.getInventory().map((item, index) => (
                <ul onClick={() => setFocusedItem(item)}>
                  <li key={index}>
                  <p class="px-0 m-0 f text-sm" >{item.name}</p>
                  <img class="px-1 w-9 mr-auto ml-auto" alt ={item.name}src={item.img}></img>
                  <h1 class="">{item.quantity}</h1>
                </li>
                </ul>
              ))}
          </div>
            <div className={styles.details}>
              {focusedItem ? (
                <div>
                  <p>{focusedItem.name}</p>
                  <p>{focusedItem.quantity}</p>
                  <p>{focusedItem.value}</p>
                  <img class="px-35" alt ={focusedItem.name}src={focusedItem.img}></img>
                  
              </div>
              ) : (
                <p>No Item selected</p>
              )}
          </div>
        </div>
      );
    }

export default ItemManager;