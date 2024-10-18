import React from 'react';
import styles from '../../UIcss/components/TextColor.module.css'

interface Item {
  name: string;
  stars: number;
  tier:number;
}

const ItemStars: React.FC<{ item: Item }> = ({ num }) => {
 
  const starArray = Array(num).fill('★');
  
  const tierStyles = {
    [styles.tier1]: num === 1,
    [styles.tier2]: num === 2,
    [styles.tier3]: num === 3,
    [styles.tier4]: num === 4,
    [styles.rainbowText]: num >= 5,
  };

  return (
    <div>
      
      <div className={` ${ Object.keys(tierStyles).find(key => tierStyles[key]) }`}>
        
         {Array(num).fill('').map((_, index) => (
          <span >★</span>
        ))} 
      </div>
    </div>
  );
};

export default ItemStars;