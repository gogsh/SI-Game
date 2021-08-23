import React, { useEffect, useReducer, useState } from 'react'
import classes from './PlayingRoom.module.scss'
import { lobbySocket } from '../../../socket'

import { useHttp } from '../../../hooks/http.hook'

import lobbyReducer from '../../../reducers/lobbyReducer'
import { createGameStatus } from '../../../DataCreators/Lobby'


import PlayerCard from './PlayerCard/PlayerCard'
import Loader from '../../UI/Loader/Loader'



function PlayingRoom() {
  const initialLobbyState = {
    name: '',
    password: '',
    numberOfPlayers: 0,
    isSelected: false,
    packId: null,
    difficulty: null,
    numberOfRounds: null,
    logo: '',
    packName: '',
    gameStatus: createGameStatus()
  }
  console.log('PlayingRoom render')
  const [lobbyState, lobbyReducerDispatch] = useReducer(lobbyReducer, initialLobbyState)

  const [packData, setPackData] = useState(null)
  const { loading, request, error } = useHttp()



  console.log(lobbyState)
  console.log(packData)


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

  useEffect(() => {
    if (lobbyState.packId !== null && packData == null) {
      console.log('requesting:', lobbyState.packId)
      getLobbyData(lobbyState.packId)
    }
  }, [lobbyState.packId])


  async function getLobbyData(id) {
    const data = await request('/api/packsLibrary/singlePack', 'POST', { id })
    setPackData(data)
  }



  return (
    <>
      {
        !loading ?
          <div className={classes.PlayingRoom}>
            <div className={classes.PlayingRoom_header}>
              <div className={classes.PlayingRoom_header_leftSide}>
                <h1>{lobbyState.name}</h1>
                <span> {lobbyState.packName}</span>
              </div>
              <div className={classes.PlayingRoom_header_rigthSide}>
                <button>Выйти</button>
              </div>
            </div>

            <div className={classes.PlayingRoom_body}>
              <div className={classes.PlayingRoom_body_playingArea}>
                <div className={classes.PlayingRoom_body_playingArea_info}>
                  <div className={classes.PlayingRoom_body_playingArea_info_currentRound}>
                    <span>{`Раунд ${lobbyState.gameStatus.currentQuestion}`}</span>
                    <h1>{lobbyState.gameStatus.currentQuestion || ''}</h1>
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
          : <div>Loader</div>
      }
    </>

  )
}

export default PlayingRoom
