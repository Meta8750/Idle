import React, {useState, useEffect} from 'react';

import Hub from './Hub.js'
import Mining from './Mining.js';

import Player from '../system/Player.js';


function Main({ activeTab }) {

    const [activity, setActivity] = useState();
    const [time, setTime] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
                setTime((prev) => prev + 1);
        },1000);

        return () => {
            
            clearInterval(interval); 
            
            }
                
            
    }, [])

   

   


    const renderContent = () => {
    
    
        switch(activeTab) {
            case 0:
                return <Hub />;
            case 1:
                return <Player time={time} activity={activity}/>;
            case 2:
                return <h2>Shop Content<p>{time}</p></h2>;
            case 3:
                return <p>Cutting</p>  
            case 4:
                return <Mining activity={activity} setActivity={setActivity}/>;
            case 5:
                return <h2>Settings Content</h2>;
            case 6:
                return <h2>Logout Content</h2>;
            default:
                return <h2>Error</h2>;
    }
  };

  return (
    <div>
      {renderContent()}
      <p>{activity}</p>
    </div>
  );
  

}

export default Main;