import React from 'react';
import styles from '../../UIcss/components/ItemStars.module.css'

interface Item {
  name: string;
  stars: number;
}

const ItemStars: React.FC<{ item: Item }> = ({ item }) => {
  const starArray = Array(item.stars).fill('★'); 
  return (
    <div>
      
      <div className="stars">
        {starArray.map((_, index) => (
          <span key={index} >★</span>
        ))}
        {/* {Array(item.stars).fill('').map((_, index) => (
          <span key={index + item.stars} className={styles.rainbowText}>★</span>
        ))} */}
      </div>
    </div>
  );
};

export default ItemStars;