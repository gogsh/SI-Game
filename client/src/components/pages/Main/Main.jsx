import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { chatSocket } from '../../../socket'
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

import reducer from '../../../reducer/messageReducer'



function Main() {
  // usee data:
  const Auth = useContext(AuthContext)
  // chat:
  const [messages, dispatch] = useReducer(reducer, [])

  // create lobby:
  const [modalActive, setModalActive] = useState(false)
  const { loading, request, error } = useHttp()
  const [lobbyData, setLobbyData] = useState({
    name: '',
    password: '',
    numberOfPlayers: 1,
    isSelected: false,    
    packId: null,
    difficulty: null,
    numberOfRounds: null,
    logo: '',
    packName: ''
  })
  const [allPacks, setAllPacks] = useState([])

  const modalChangeHandlers = {
    onChangeInput : (e) => {
      e.preventDefault()
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
      console.log(dataArr)
      setLobbyData({
        ...lobbyData,
        packId: allPacks[Number(dataArr[1])]._id,
        difficulty: Number(dataArr[3]),
        numberOfRounds:  Number(dataArr[2]),
        isSelected: true,
        logo: dataArr[4],
        packName: dataArr[5]
      })
      console.log(lobbyData)
    }
  }


  const addMessage = (message) => {
    console.log('from back', message)
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message
    })
  }

  useEffect(() => {
    chatSocket.on('CHAT:NEW_MESSAGE', addMessage)
  }, [])

  function createGameHandler(e) {
    console.log('123')
  }

  async function modalOpen (e)  {
    e.preventDefault()
    setModalActive(true)
    const data = await request('/api/packsLibrary/allPacks', 'POST')
    setAllPacks(data.reverse())
  }

  window.socket = chatSocket

  return (
    <div className={classes.Main}>
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
          rooms={[]}
          headerAlign={'right'}
          header={'Список игр'}
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
        loading = {loading}
        changeHandlers = {modalChangeHandlers}
        createGame = {createGameHandler}
      />

    </div>
  )
}

export default Main