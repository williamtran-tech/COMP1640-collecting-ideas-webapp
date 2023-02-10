import React from 'react'
import { Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import User from './pages/User';


function App() {
  return (
    <Routes>
    <Route path="/" element={<LandingPage></LandingPage>}></Route>
    <Route path="/user" element={<User></User>}></Route>
    </Routes>
  );
}
export default App
