import logo from './logo.svg';
import './App.css';

import Sidebar from '../src/UI/Sidebar.js';
import Header from '../src/UI/Header';

function App() {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <aside>
        <Sidebar />
      </aside>
    </div>
  );
}

export default App;
