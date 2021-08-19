import React, { useEffect } from 'react'
import classes from './PlayingRoom.module.scss'
import { lobbySocket } from '../../../socket'



function PlayingRoom() {
  lobbySocket.on('LOBBY:JOIN', (lobbys) => console.log(lobbys))

  // useEffect(() => {
  // })

  return (
    <div className={classes.PlayingRoom}>
      PlayingRoom
    </div>
  )
}

export default PlayingRoom
