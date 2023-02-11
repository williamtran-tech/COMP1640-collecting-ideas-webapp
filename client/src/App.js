import React, {useEffect, useState} from 'react'
import Header from './components/header'
import Game from './components/tictactoe'
import Clock from './components/lifecycle'

function App() {
  const [backendData, setBackendData] = useState([{}])

  useEffect(() => {
    fetch("/ideas").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])

  return (
    <div className='app'>
        <Header>hello</Header>
        {(typeof backendData.message === 'undefined') ? (
          <p>Loading..</p>
        ) : (
          <p>{backendData.message}</p>
          )}
        {(typeof backendData.ideas === 'undefined') ? (
          <p>Loading ideas..</p>
        ) : (
          backendData.ideas.map((idea) => (
            <>
                <p key={idea.id}>{idea.id}</p>
                <p>{idea.idea}</p>
                <p>{idea.category}</p>
                <p>{idea.topic}</p>
                <p>{idea.closure_date}</p>
                <p>{idea.final_closure_date}</p>
                <p>{idea.created_date}</p>
            </>
          ))
        )}
        <Game />
        <Clock />
        <Clock />
        <Clock />
        
    </div>
  );
}
export default App
