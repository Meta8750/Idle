import React, { useState, useEffect } from 'react';
import ShopItem from '../system/ShopItem';



  const handleProcess = () => {
    
  }


function Shop({player}) {
    const [items, setItem] = useState({

        stone :     new ShopItem("Stone", 1, 1, 1, 0, 0,10,"Mining"),
        copper:     new ShopItem("Copper", 1, 1, 1, 0, 0,10,"Mining"),
   
    });
  
// {items.stone.triggerEvent(player,1)} 

    return (  
        <div>
            <h1>Shop</h1>
           
        </div>
    );
}

export default Shop;