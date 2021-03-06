import React, { useEffect, useReducer, useState, useContext } from 'react'
import classes from './PlayingRoom.module.scss'
import { AuthContext } from '../../../context/AuthContext'
import { TimerContext } from '../../../context/TimerContext'
import { lobbySocket } from '../../../socket'

import { useHttp } from '../../../hooks/http.hook'

import lobbyReducer from '../../../reducers/lobbyReducer'
import { createGameStatus } from '../../../DataCreators/Lobby'


import PlayerCard from './PlayerCard/PlayerCard'
import PlayingField from './PlayingField/PlayingField'
import ButtonsContainer from './ButtonsContainer/ButtonsContainer'
import Loader from '../../UI/Loader/Loader'



function PlayingRoom() {
  const Auth = useContext(AuthContext)
  const Timers = useContext(TimerContext)

  const [lobbyState, lobbyReducerDispatch] = useReducer(lobbyReducer, false)
  const [slotSelected, setSlotSelected] = useState(false)
  const [isLeader, setLeader] = useState(false)
  const [status, setStatus] = useState('')


  const [packData, setPackData] = useState(null)
  const { loading, request, error } = useHttp()

  console.log('LOBBYSTATE:', lobbyState)
  console.log('PACKDATA', packData)


  const getLobbyState = (state) => {
    lobbyReducerDispatch({
      type: 'LOBBY_DATA',
      payload: state,
    })
  }




  useEffect(() => {
    lobbySocket.on('LOBBY:UPDATE_STATE', getLobbyState)
    return () => {
      lobbySocket.emit('LOBBY:DISCONNECT', {
        lobbyId: localStorage.currentLobby,
        userId: Auth.userId
      })
    }
  }, [])



  if (lobbyState.lobbyId && localStorage.currentLobby !== lobbyState.lobbyId) {
    localStorage.setItem('currentLobby', lobbyState.lobbyId)
  }

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
        console.log('LEADER')
        setLeader(true)
      } else {
        setLeader(false)
      }
      lobbySocket.emit('LOBBY:SLOT_SELECTED', {
        lobbyId: localStorage.currentLobby,
        userId: Auth.userId,
        value: { slotNumber: Number(dataArr[1]) }
      })
      setSlotSelected(true)
    },

    startGameHandler: (e) => {
      e.preventDefault()
      lobbySocket.emit('LOBBY:GAME_START', {
        lobbyId: localStorage.currentLobby,
        status: 'choose-who-start',
      })
      setStatus('choose-who-start')
      changeHandlers.timeout = setTimeout(() => {
        console.log('?????????? 10 ???????????? ????????????????????')
        lobbySocket.emit('LOBBY:GAME_CHOOSE_WHO_START', {
          lobbyId: localStorage.currentLobby,
          status: 'showing-round',
          whoStart: Math.floor(Math.random() * lobbyState.numberOfPlayers + 1) - 1
        })
      }, Timers['choose-who-start'])
    },

    chooseWhoStartHandler: (e) => {
      if (e.currentTarget.id !== 'random') {
        const dataArr = e.currentTarget.id.split('-')
        lobbySocket.emit('LOBBY:GAME_CHOOSE_WHO_START', {
          lobbyId: localStorage.currentLobby,
          status: 'showing-round',
          whoStart: dataArr[1]
        })
      } else {
        lobbySocket.emit('LOBBY:GAME_CHOOSE_WHO_START', {
          lobbyId: localStorage.currentLobby,
          status: 'showing-round',
          whoStart: Math.floor(Math.random() * lobbyState.numberOfPlayers + 1) - 1
        })
      }

    },

    ButtonsContainer: {

    },
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
                <button>??????????</button>
              </div>
            </div>

            <div className={classes.PlayingRoom_body}>
              <div className={classes.PlayingRoom_body_playingArea}>
                <div className={classes.PlayingRoom_body_playingArea_info}>
                  <div className={classes.PlayingRoom_body_playingArea_info_currentRound}>
                    <span>{`?????????? 1`}</span>
                    <h1>{'???????????????? ????????'}</h1>
                  </div>
                  <PlayerCard
                    index={0}
                    data={lobbyState.gameStatus.players}
                    slotSelectionHandler={changeHandlers.slotSelectionHandler}
                  />
                  <div className={classes.PlayingRoom_body_playingArea_info_systemMessages}>
                    ?????????????????? ??????????????????
                  </div>
                </div>
                <div className={classes.PlayingRoom_body_playingArea_table}>
                  <PlayingField
                    lobbyState={lobbyState}
                    packData={packData}
                    isLeader={isLeader}
                    startGameHandler={changeHandlers.startGameHandler}
                    chooseWhoStartHandler={changeHandlers.chooseWhoStartHandler}
                  />
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
