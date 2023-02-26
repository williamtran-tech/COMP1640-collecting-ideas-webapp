import React, { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import ListTopics from '../components/ListTopics'
import Navigation from '../components/Navigation'
import CheckToken from '../service/CheckToken'


const LandingPage = () => {
 return (
    <>
    <Navigation></Navigation>
    <ListTopics></ListTopics>
    </>
    
    )}

export default LandingPage