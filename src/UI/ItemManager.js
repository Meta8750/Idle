import React, { useState, useEffect } from 'react';
import styles from '../UIcss/ItemManager.module.css'
import ItemStar from './components/ItemStars.tsx'
import MonStats from './components/MonStats.tsx'

function ItemManager({ player, mon, setTab }) {

  const [focusedItem, setFocusedItem] = useState(null);
  const [itemTab, setItemTab] = useState("chain");

  if (player.mons.length === 0 || mon === undefined) {
    return <p>No Mons available</p>; // break if player dont have mons
  }


  const equipItem = () => {

    if (focusedItem.equipped === true) {
      player.removeItemFromMon(focusedItem.uid)

    } else {
      mon.equipItem(focusedItem);
    }
  }

  const upgradeItem = () => {
    focusedItem.name != "Riven Mod" ? focusedItem.upgradeStats(focusedItem) : focusedItem.randomStats(focusedItem)
  
  }

  return (
    <div className={styles.mainContainer}>

      <div className={styles.box}>

        {player.inventory.getArtifacts().map((item, index) => (
          <ul className={`${styles.items} ${item === focusedItem ? styles.focusedItem : ""} ${item.equipped ? styles.equippedItem: ""}`} onClick={() => setFocusedItem(item)}>
            <li key={index}>
              <p class="px-0 m-0 f text-sm" >{item.name}</p>
              <img class="px-1 w-9 mr-auto ml-auto" src={item.img}></img>
              <h1 class="">{item.quantity}</h1>
              <ItemStar num={item.stars} />
              <span></span>
            </li>
          </ul>
        ))}
      </div>

      <div className={styles.team}>

        <button onClick={() => setTab("mon")}>back</button>
        <p>{mon.name}</p>

        <p>{mon.capacity} / {mon.usedCapacity}</p>
        <MonStats mon={mon} />

      </div>

      <div className={styles.equipment}>
        {mon.equipment.map((item, itemIndex) => {
          return (

            <div >
              {item ? (<div>

                <p>{item.name}</p>
                <p>{item.level}</p>
                <p>{item.capacity}</p>

                <img class="px-35" src={item.img}></img>

              </div>) : (<div className={styles.emptySlot}></div>)}

            </div>

          )
        })}
      </div>


      <div className={styles.stats}>
        {focusedItem ? (
          <div >
            <p>{focusedItem.name} Level: {focusedItem.level}/{focusedItem.maxLevel}</p>

            {Object.entries(focusedItem.stats).map(([stat, value]) => {
              return <p>{stat} {Number.isInteger(value) ? value : `${Math.round(value * 100)}%`}</p>
            })}

            <img class="px-35" src={focusedItem.img}></img>
            <button onClick={() => equipItem()}>equip</button>
            <button onClick={() => upgradeItem()}>Upgrade</button>
          </div>) : (<p>No Item selected</p>)}

      </div>
    </div>

  );
}
//  <button onClick={() => focusedItem.randomStats()}>upgrade</button>
export default ItemManager;