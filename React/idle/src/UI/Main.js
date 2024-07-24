// Main.js
import React from 'react';
import Hub from './Hub.js'

function Main({ activeTab }) {
  const renderContent = () => {
    switch(activeTab) {
      case 0:
        return <Hub />;
      case 1:
        return <h2>Profile Content</h2>;
      case 2:
        return <h2>Settings Content</h2>;
      case 3:
        return <h2>Logout Content</h2>;
      default:
        return <h2>Home Content</h2>;
    }
  };

  return (
    <div>
      {renderContent()}
    </div>
  );
}

export default Main;