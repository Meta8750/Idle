import React, { useState, useEffect } from 'react';
import styles from '../UIcss/Inventory.module.css'

function Inventory({inventory, updateItem, setPlayer})  {

  const [focusedItem, setFocusedItem] = useState(null);
  const [sellQuantity, setSellQuantity] = useState(1);
  
  const handleSell = () => {
    if (focusedItem) {
      setPlayer((prevPlayer) => ({
        ...prevPlayer,
        coins: prevPlayer.coins += (focusedItem.value * sellQuantity),
        }))
        updateItem({name: focusedItem.name, quantity: -focusedItem.quantity});
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
          
          {inventory.map((item, index) => (
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

export default Inventory;