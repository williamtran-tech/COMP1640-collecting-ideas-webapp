import React from 'react'
import { Routes, Route, useLocation } from "react-router-dom";
import IdeaDetailPage from './pages/IdeaDetailPage';
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import User from './pages/User';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import jwt_decode from 'jwt-decode';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location= useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      console.log(location.pathname)
      if (decodedToken.exp < currentTime) {
        
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login');
      } else {
        setIsLoggedIn(true);
      }
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [location,isLoggedIn, navigate]);

  const userInfo = isLoggedIn ? jwt_decode(localStorage.getItem('token')) : null;

  return (

        <Routes>
        <Route path="/" element={<LandingPage></LandingPage>}></Route>
        <Route path="/topics/:id" element={<IdeasPage></IdeasPage>}></Route>
        <Route path="/user" element={<User></User>}></Route>
        <Route path="/login" element={<LoginPage></LoginPage>}></Route>
        <Route path="/ideas/:id" element={ (<IdeaDetailPage></IdeaDetailPage>)}></Route>
       </Routes>



  );
}
export default App
