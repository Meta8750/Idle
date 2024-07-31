import React, { useState, useEffect } from 'react';
import styles from '../UIcss/Inventory.module.css'

function Inventory({inventory})  {

  const [focusedItem, setFocusedItem] = useState(null);
  
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
                  <button>sell</button>
              </div>
              ) : (
                <p>No Item selected</p>
              )}
          </div>
        </div>
      );
    }

export default Inventory;