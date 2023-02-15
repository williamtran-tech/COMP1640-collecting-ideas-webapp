import React from 'react'
import { Routes, Route } from "react-router-dom";
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import User from './pages/User';


function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage></LandingPage>}></Route>
    <Route path="/topics/:id" element={<IdeasPage></IdeasPage>}></Route>
    <Route path="/user" element={<User></User>}></Route>
    <Route path="/login" element={<LoginPage></LoginPage>}></Route>

    </Routes>
  );
}
export default App
