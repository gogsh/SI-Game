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

  const Auth = useContext(AuthContext)

  const [lobbyState, lobbyReducerDispatch] = useReducer(lobbyReducer, initialLobbyState)
  const [slotSelected, setSlotSelected] = useState(false)
  const [isLeader, setLeader] = useState(false)

  const [packData, setPackData] = useState(null)
  const { loading, request, error } = useHttp()

  console.log('LOBBYSTATE:', lobbyState)


  const getLobbyState = (state) => {
    console.log('gettingState =(')
    lobbyReducerDispatch({
      type: 'LOBBY_DATA',
      payload: state,
    })
  }

  useEffect(() => {
    lobbySocket.on('LOBBY:JOIN', getLobbyState)
    return () => {
      console.log(lobbyState.lobbyId)
      lobbySocket.emit('LOBBY:DISCONNECT', {nickname: Auth.nickname, lobbyId: lobbyState.lobbyId})
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
      if (e.target.id === 'leader') {
        setLeader(true)
        const leaderInfo = { nickname: Auth.nickname, avatarLink: Auth.avatarLink }
        lobbyReducerDispatch({
          type: 'LEADER_IN',
          payload: leaderInfo,
        })
        // lobbySocket.emit('LOBBY:UPDATE_STATE', lobbyState)        

      }
      setSlotSelected(true)
    },
    ButtonsContainer: {

    }
  }

  const generatePlayerSlots = (NoP) => {
    let result = []
    for (let i = 0; i < NoP - 1; i++) {
      result.push(<PlayerCard
        key={i}
        nickname={'Никнейм'}
        slotSelected={slotSelected}
        avatarLink={'https://avatars.mds.yandex.net/get-zen_doc/1888987/pub_5d592ddd9f272100ad6d2183_5d593005ae56cc00ac3bcdf8/scale_1200'}
        slotSelectionHandler={changeHandlers.slotSelectionHandler}
      />)
    }
    return result
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
                    <span>{`Раунд 1`}</span>
                    <h1>{'Название пака'}</h1>
                  </div>
                  <PlayerCard
                    type={'leader'}
                    state={lobbyState}
                    slotSelected={slotSelected}
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
                  generatePlayerSlots(lobbyState.numberOfPlayers)
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
