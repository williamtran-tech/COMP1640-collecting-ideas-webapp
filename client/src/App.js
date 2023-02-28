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
import AdminPage from './pages/AdminPage';
 import config from './service/headerToken';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setuserRole] =useState()
  const location= useLocation()
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (token && config) {
      const decodedToken = jwt_decode(token);
      const currentTime = Date.now() / 1000; // Convert to seconds
      setuserRole(decodedToken.roleId)
      
      if (decodedToken.exp < currentTime) {
        alert("Your token is expired")
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        navigate('/login');
      } 
      // if(userRole===2 || userRole===3){
      //   navigate()
      // }
    } else {
      setIsLoggedIn(false);
      navigate('/login');
    }
  }, [location,isLoggedIn, navigate]);

  // const userInfo = isLoggedIn ? jwt_decode(localStorage.getItem('token')) : null;

  return (
        <Routes>
          {userRole === 2 || userRole === 3 ? (<Route path="/" element={<AdminPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>} />) : 
          ( <><Route path="/" index element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LandingPage>}></Route>
          <Route path="/topics/:id" element={<IdeasPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeasPage>}></Route>
          <Route path="/user" element={<User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></User>}></Route>
          <Route path="/ideas/:id" element={(<IdeaDetailPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeaDetailPage>)}></Route></>)}
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LoginPage>}></Route>
       </Routes>
  );
}
export default App
