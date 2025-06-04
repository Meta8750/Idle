import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { useAuth } from "./userEntry/Auth.jsx";
import MainPage from './MainPage.jsx'
import LoginPage from './userEntry/LoginPage.js'

function App() {

    const { userLoggedIn } = useAuth();
    console.log(userLoggedIn);

    return (

      <Router>
        <Routes>
          <Route path="/"   element={userLoggedIn ? <MainPage /> : <Navigate to="/LoginPage" replace />} />
          <Route path="/" element={<Navigate to="/LoginPage" replace />} />
          <Route path="/LoginPage" element={<LoginPage />} />
        </Routes>
      </Router>
     
    );
}

export default App;

