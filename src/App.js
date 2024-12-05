import './App.css';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';

import { useAuth } from "./userEntry/Auth.jsx";
import { AuthProvider } from "./userEntry/Auth.jsx";


import MainPage from './MainPage.jsx'
import LoginPage from './userEntry/LoginPage.js'



function App() {


 
    return (
      <AuthProvider>
      <Router>
        <Routes>
          <Route path="LoginPage" element={<LoginPage />} />
        </Routes>
      </Router>
      </AuthProvider>
    );


}

  


export default App;

