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
        <Header></Header>
        {(typeof backendData.message === 'undefined') ? (
          <p>Loading..</p>
        ) : (
          <p>{backendData.message}</p>
          )}
        {(typeof backendData.tasks === 'undefined') ? (
          <p>Loading tasks..</p>
        ) : (
          backendData.tasks.map((task) => (
            <p key={task.id}>{task.task}</p>
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