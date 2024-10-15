import React from 'react';
import styles from '../../UIcss/components/ItemStars.module.css'

interface Item {
  name: string;
  stars: number;
  tier:number;
}

const ItemStars: React.FC<{ item: Item }> = ({ num }) => {
 
  const starArray = Array(num).fill('★');
 

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