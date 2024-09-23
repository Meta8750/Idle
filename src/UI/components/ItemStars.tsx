import React from 'react';

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
          <span key={index} className="star filled">★</span>
        ))}
        {Array(5 - item.stars).fill('').map((_, index) => (
          <span key={index + item.stars} className="star">★</span>
        ))}
      </div>
    </div>
  );
};

export default ItemStars;