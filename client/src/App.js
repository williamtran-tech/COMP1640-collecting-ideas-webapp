import React from 'react'
import { Routes, Route} from "react-router-dom";
import IdeaDetailPage from './pages/IdeaDetailPage';
import IdeasPage from './pages/IdeasPage';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import User from './pages/User';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import checkToken from './service/checkToken';
import Layout from './components/AdminComponent/Layout';


import TopicTable from './components/AdminComponent/TopicManagement/TopicTable';
import UserManagement from './components/AdminComponent/UserMagement/UserManagement';
import StatisticLayout from './components/AdminComponent/Statistic/StatisticLayout';
import NotFound from './pages/NotFound';
import VerifyAccount from './pages/VerifyAccount';
import { useLocation } from 'react-router-dom';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import CategoryManagement from './components/AdminComponent/CategoryManagement/CategoryManagement';
import DepartmentManagement from './components/AdminComponent/DepartmentManagement/DepartmentManagement';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [deadline, setDeadline] = useState(new Date());
  const [userRole, setUserRole] = useState();
  const navigate = useNavigate();
  const location= useLocation()
  useEffect(() => {
    document.title = "Green Idea";
    const decodedToken = checkToken();
    if (decodedToken) {
      setUserRole(decodedToken.roleId);
      setIsLoggedIn(true);
    } else if(!location.pathname.startsWith('/accounts/verify', '/accounts/forgot-password') 
           && !location.pathname.startsWith('/accounts/reset-password') 
           && !location.pathname.startsWith('/accounts/forgot-password')) 
           {
          setIsLoggedIn(false);
          navigate('/login');
          }
  }, [navigate,isLoggedIn]);

  // const userInfo = isLoggedIn ? jwt_decode(localStorage.getItem('token')) : null;
// <AdminPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
  return (
        <Routes>
          {userRole === 2 || userRole === 3|| userRole === 4 ? (
          <>
          <Route path="/"  element={<Layout userRole={userRole}></Layout>}>
            <Route path="/" index element={<TopicTable></TopicTable>} />
            <Route path="/users" element={<UserManagement></UserManagement>} />
            <Route path="/statistic" element={<StatisticLayout></StatisticLayout>} />
            <Route path="/category" element={<CategoryManagement></CategoryManagement>} />
            <Route path="/department" element={<DepartmentManagement></DepartmentManagement>} />
            
          </Route>
            <Route path="/topics" element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LandingPage>}></Route>
            <Route path="/topics/:id" element={<IdeasPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeasPage>}></Route>
            <Route path="/ideas/:id" element={(<IdeaDetailPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeaDetailPage>)}></Route>
          </>
          ) : 
          ( <>
          <Route path="/topics"  element={<LandingPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LandingPage>}></Route>
          <Route path="/topics/:id" element={<IdeasPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeasPage>}></Route>
          <Route path="/user/:id" element={<User isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></User>}></Route>
          <Route path="/ideas/:id" element={(<IdeaDetailPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></IdeaDetailPage>)}></Route>
          </>)}
          <Route path="/accounts/verify" element={<VerifyAccount></VerifyAccount>}> </Route>
          <Route path="/accounts/reset-password" element={<ResetPassword></ResetPassword>}> </Route>
          <Route path="/accounts/forgot-password" element={<ForgotPassword></ForgotPassword>}> </Route>
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></LoginPage>}></Route>
          <Route path="*" element={<NotFound></NotFound>} />
       </Routes>
  );
}
export default App
