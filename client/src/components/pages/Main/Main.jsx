import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { chatSocket, lobbySocket } from '../../../socket'
import { useHttp } from '../../../hooks/http.hook'

import classes from './Main.module.scss'

import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'

import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'
import ActiveRooms from '../../UI/ActiveRooms/ActiveRooms'
import Navbar from '../../UI/Navbar/Navbar'
import SecondaryButton from '../../UI/buttons/SecondaryButton/SecondaryButtonLarge'
import Chat from '../../UI/Chat/Chat'
import LobbyCreator from '../../complexed/LobbyCreator/LobbyCreator'

import messageReducer from '../../../reducers/messageReducer'
import createdLobbysReducer from '../../../reducers/createdLobbysReducer'
import {createGameStatus} from '../../../DataCreators/Lobby'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'



function Main() {
  // user data:
  const Auth = useContext(AuthContext)

  // lobbys data:
  const [createdLobbys, createdLobbysDispatch] = useReducer(createdLobbysReducer, [])
  // chat:
  const [messages, dispatch] = useReducer(messageReducer, [])


  // create lobby:
  const { loading, request } = useHttp()

  const [modalActive, setModalActive] = useState(false)
  const [lobbyData, setLobbyData] = useState({
    name: 'фывфыв',
    password: '',
    numberOfPlayers: 2,
    isSelected: false,
    packId: null,
    difficulty: null,
    numberOfRounds: null,
    logo: '',
    packName: '',
    gameStatus: createGameStatus()
  })
  const [allPacks, setAllPacks] = useState([])

  const modalChangeHandlers = {
    onChangeInput: (e) => {
      e.preventDefault()
      e.stopPropagation()
      setLobbyData({
        ...lobbyData,
        [e.target.name]: e.target.value
      })
    },
    onChangeDropdown: (e) => {
      e.preventDefault()
      setLobbyData({
        ...lobbyData,
        numberOfPlayers: Number(e.target.value)
      })
    },
    onClickSelectedPack: (e) => {
      e.preventDefault()
      const dataArr = e.target.name.split('__')
      const formIsValid = validateFields()
      if (formIsValid) {
        setLobbyData({
          ...lobbyData,
          packId: allPacks[Number(dataArr[1])]._id,
          difficulty: Number(dataArr[3]),
          numberOfRounds: Number(dataArr[2]),
          isSelected: true,
          logo: dataArr[4],
          packName: dataArr[5]
        })
      }
    }
  }

  const joinLobby = (e) => {
    const data = e.target.id.split('__')
    if (data[1] !== 'FULL') {
      lobbySocket.emit('LOBBY:JOIN', ({ lobbyId: data[0], nickname: Auth.nickname, avatarLink: Auth.avatarLink }))
    } else {
      e.preventDefault()
      toast.error('Достигнут максимум игроков')
    }
  }

  const addMessage = (message) => {
    console.log('from back', message)
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }
  const showLobbys = (lobbys) => {
    createdLobbysDispatch({
      type: 'ADD_LOBBYS',
      payload: lobbys
    })
  }


  useEffect(() => {
    chatSocket.on('CHAT:NEW_MESSAGE', addMessage)
    if (createdLobbys.length < 1) {
      chatSocket.on('LOBBY:INFO', showLobbys)
      chatSocket.emit('LOBBY:GET_LOBBYS', showLobbys)
    }
    return () => createdLobbysDispatch({
      type: 'ADD_LOBBYS',
      payload: []
    })
  }, [])



  function validateFields() {
    if (lobbyData.name.length < 5) {
      toast.error('Название лобби должно быть длиннее 4 символов')
      return false
    }
    if (lobbyData.numberOfPlayers === 1) {
      toast.error('Вы собрались играть в одиночку?')
      return false
    }
    return true
  }

  function createGameHandler(e) {
    lobbySocket.emit('LOBBY:CREATE', ({ lobbyData, nickname: Auth.nickname, avatarLink: Auth.avatarLink }))
  }

  async function modalOpen(e) {
    e.preventDefault()
    setModalActive(true)
    const data = await request('/api/packsLibrary/allPacks', 'POST')
    setAllPacks(data.reverse())
  }

  window.socket = chatSocket

  return (
    <div className={classes.Main}>
      <ToastContainer />
      <SmallColumn>
        <SmallProfile
          userName={Auth.nickname}
          avatar={Auth.avatarLink}
        />
        <PrimaryButton
          text={'Создать игру'}
          onClick={modalOpen}
        />
        <ActiveRooms
          rooms={createdLobbys}
          headerAlign={'right'}
          header={'Список игр'}
          joinLobby={joinLobby}
        />
      </SmallColumn>

      <LargeColumn>
        <Navbar />
        <SecondaryButton
          text={'Редактор паков'}
          linkTo={'/editor'}
        />
        <Chat
          {...Auth}
          messages={messages}
          onAddMessage={addMessage}
        />
      </LargeColumn>
      <LobbyCreator
        modalActive={modalActive}
        setModalActive={setModalActive}
        lobbyData={lobbyData}
        allPacks={allPacks}
        loading={loading}
        changeHandlers={modalChangeHandlers}
        createGame={createGameHandler}
      />

    </div>
  )
}

export default Main