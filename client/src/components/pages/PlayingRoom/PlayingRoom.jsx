import React, { useEffect, useReducer } from 'react'
import classes from './PlayingRoom.module.scss'
import { lobbySocket } from '../../../socket'
import lobbyReducer from '../../../reducers/lobbyReducer'


import PlayerCard from './PlayerCard/PlayerCard'



function PlayingRoom() {
  window.socket = lobbySocket
  console.log('PlayingRoom render')
  const [lobbyState, lobbyReducerDispatch] = useReducer(lobbyReducer, {})
  console.log(lobbyState)

  const getLobbyState = (state) => {
    lobbyReducerDispatch({
      type: 'LOBBY_DATA',
      status: 'prepairing',
      payload: state,
    })    
  }
  useEffect(() => {
    lobbySocket.on('LOBBY:JOIN', getLobbyState)
  }, [])

  return (
    <div className={classes.PlayingRoom}>
      <div className={classes.PlayingRoom_header}>

      </div>

      <div className={classes.PlayingRoom_body}>

      </div>

      <div className={classes.PlayingRoom_body}>
        <div className={classes.PlayingRoom_body_playingArea}>
          <div className={classes.PlayingRoom_body_playingArea_info}>
            <div className={classes.PlayingRoom_body_playingArea_info_currentRound}>
              <span></span>
              <h1></h1>
            </div>
            <PlayerCard />
            <div className={classes.PlayingRoom_body_playingArea_info_systemMessages}>

            </div>
          </div>
          <div className={classes.PlayingRoom_body_playingArea_table}>

          </div>
        </div>
        <div className={classes.PlayingRoom_body_buttons}>

        </div>
        <div className={classes.PlayingRoom_players}>

        </div>
      </div>

      <div className={classes.PlayingRoom_footer}>

      </div>
      PlayingRoom
    </div>
  )
}

export default PlayingRoom
