import React, { useState, useEffect } from 'react';
import styles from '../UIcss/Inventory.module.css'

function DisplayInventory({player})  {

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
                  <p>{item.name}</p>
                  <h1>{item.quantity}</h1>
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
                  <button onClick={handleSell}>sell</button>
                  <input
                      type="range"
                      id="sellSlider"
                      min="0"
                      max={focusedItem.quantity}
                      value={sellQuantity}
                      onChange={handleSliderChange}
                    />
                  <p>{sellQuantity}</p>
              </div>
              ) : (
                <p>No Item selected</p>
              )}
          </div>
        </div>
      );
    }

export default DisplayInventory;