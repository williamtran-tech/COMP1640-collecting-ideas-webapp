import React from 'react'
import ListIdeas from '../components/ListIdeas'
import Navbar from '../components/Navigation'

const IdeasPage = ({isLoggedIn, setIsLoggedIn }) => {

  return (
    <>
      <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}></Navbar>
      <ListIdeas></ListIdeas>
    </>
   
  )
}
export default IdeasPage