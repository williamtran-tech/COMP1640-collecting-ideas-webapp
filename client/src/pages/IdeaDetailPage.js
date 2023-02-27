import React from 'react'
import IdeaDetail from '../components/IdeaDetail'
import Navbar from '../components/Navigation'


const IdeaDetailPage = ({isLoggedIn, setIsLoggedIn }) => {

  return (
      <>
        <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} ></Navbar>
        <IdeaDetail></IdeaDetail>
      </>
  )
}

export default IdeaDetailPage