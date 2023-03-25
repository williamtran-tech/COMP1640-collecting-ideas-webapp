import React from 'react'
import IdeaDetail from '../components/IdeaDetail'
import Navbar from '../components/Navigation'
import checkToken from '../service/checkToken'


const IdeaDetailPage = ({isLoggedIn, setIsLoggedIn }) => {
  const token = checkToken()
  console.log(token)
  return (
      <>
        <Navbar  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}  ></Navbar>
        <IdeaDetail token={token}></IdeaDetail>
      </>
  )
}

export default IdeaDetailPage