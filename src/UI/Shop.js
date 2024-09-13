import React, { useState, useEffect } from 'react';
import ShopItem from '../system/ShopItem.ts';


function Shop({player}) {
    const handleProcess = (player, item) => {
        item.triggerEvent(player, item)
      }

      const [items, setItems] = useState([
        new ShopItem("Stone", 1, 1, 0, [["stone", 1]]),
        new ShopItem("Sword", 1, 1, 1, [["stone", 1]]),
    ]);

  
// {items.stone.triggerEvent(player,1)} 

    return (  
        <div>
            <h1>Shop</h1>
            <div>{items.map((item, index) => (
                    <div key={index}>
                        <p>{item.name}</p>
                        <button onClick={() => handleProcess(player, item)}>
                            Buy
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;