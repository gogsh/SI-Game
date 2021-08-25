import React, { useEffect, useReducer, useState, useContext } from 'react'
import classes from './PlayingRoom.module.scss'
import { AuthContext } from '../../../context/AuthContext'
import { lobbySocket } from '../../../socket'

import { useHttp } from '../../../hooks/http.hook'

import lobbyReducer from '../../../reducers/lobbyReducer'
import { createGameStatus } from '../../../DataCreators/Lobby'


import PlayerCard from './PlayerCard/PlayerCard'
import ButtonsContainer from './ButtonsContainer/ButtonsContainer'
import Loader from '../../UI/Loader/Loader'



function PlayingRoom() {
  const Auth = useContext(AuthContext)

  const [lobbyState, lobbyReducerDispatch] = useReducer(lobbyReducer, false)
  const [slotSelected, setSlotSelected] = useState(false)
  const [isLeader, setLeader] = useState(false)


  const [packData, setPackData] = useState(null)
  const { loading, request, error } = useHttp()

  console.log('LOBBYSTATE:', lobbyState)


  const getLobbyState = (state) => {
    console.log('gettingState =(')
    console.log('REDUCER: ', state)
    lobbyReducerDispatch({
      type: 'LOBBY_DATA',
      payload: state,
    })
  }
  

  useEffect(() => {
    lobbySocket.on('LOBBY:JOIN', getLobbyState)
    return () => {
      lobbySocket.emit('LOBBY:DISCONNECT', { nickname: Auth.nickname, lobbyId: lobbyState.lobbyId })
    }
  }, [])

  useEffect(() => {
    if (lobbyState.packId !== null && packData == null) {
      getLobbyData(lobbyState.packId)
    }
    return () => setPackData(null)
  }, [lobbyState.packId])




  async function getLobbyData(id) {
    const data = await request('/api/packsLibrary/singlePack', 'POST', { id })
    setPackData(data)
  }

  const changeHandlers = {
    slotSelectionHandler: (e) => {
      const dataArr = e.target.id.split('-')
      if (dataArr[1] === '0') {
        setLeader(true)
      }
      lobbySocket.emit('LOBBY:SLOT_SELECTED', { lobbyId: lobbyState.lobbyId, nickname: Auth.nickname, slotNumber: Number(dataArr[1]) })

      setSlotSelected(true)
    },
    ButtonsContainer: {

    }
  }
  
  function generatePlayerSlots(playersArray, NoP) {
    const result = []
    for (let i = 1; i < NoP; i++) {
      result.push(
        <PlayerCard
          key={i}
          index={i}
          data={playersArray}
          slotSelectionHandler={changeHandlers.slotSelectionHandler}
        />
      )
    }
    return result
  }

  return (
    <>
      {
        lobbyState ?
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
                    <span>{`Раунд 1`}</span>
                    <h1>{'Название пака'}</h1>
                  </div>
                  <PlayerCard
                    index={0}
                    data={lobbyState.gameStatus.players}
                    slotSelectionHandler={changeHandlers.slotSelectionHandler}
                  />
                  <div className={classes.PlayingRoom_body_playingArea_info_systemMessages}>
                    Системные сообщения
                  </div>
                </div>
                <div className={classes.PlayingRoom_body_playingArea_table}>

                </div>
              </div>
              <ButtonsContainer
                isLeader={isLeader}
                clickHandlers={changeHandlers.ButtonsContainer}
                pause={lobbyState.gameStatus.pause}
              />
              <div className={classes.PlayingRoom_players}>
                {
                  generatePlayerSlots(lobbyState.gameStatus.players, lobbyState.numberOfPlayers)
                }
              </div>
            </div>

            <div className={classes.PlayingRoom_footer}>

            </div>
            PlayingRoom
          </div>
          : <Loader />
      }
    </>

  )
}

export default PlayingRoom
