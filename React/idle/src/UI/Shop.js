import React, { useState, useEffect } from 'react';
import ShopItem from '../system/ShopItem';



  const handleProcess = () => {
    
  }


function Shop({player}) {
    const [items, setItem] = useState({

        stone :     new ShopItem("Stone", 1, 1, 1, 0, 0,10,"Mining"),
        copper:     new ShopItem("Copper", 1, 1, 1, 0, 0,10,"Mining"),
   
    });
  


    return (  
        <div>
            <h1>Shop</h1>
            {items.stone.triggerEvent(player,1)}
        </div>
    );
}

export default Shop;