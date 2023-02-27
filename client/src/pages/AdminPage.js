import React from 'react'
import Navbar from '../components/Navigation'

const AdminPage = ({isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
    <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
    <div>AdminPage</div>

    </>  
  )
}

export default AdminPage