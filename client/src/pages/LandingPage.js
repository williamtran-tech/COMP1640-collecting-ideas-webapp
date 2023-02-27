import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import ListTopics from '../components/ListTopics'
import Navigation from '../components/Navigation'
import CheckToken from '../service/CheckToken'


const LandingPage = ({isLoggedIn, setIsLoggedIn }) => {
 return (
    <>
      <Navigation isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navigation>
      <ListTopics></ListTopics>
    </>
  )}

export default LandingPage