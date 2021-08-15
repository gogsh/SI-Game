import React, { useContext, useEffect, useReducer, useState } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { chatSocket } from '../../../socket'

import classes from './Main.module.scss'

import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'

import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'
import ActiveRooms from '../../UI/ActiveRooms/ActiveRooms'
import Navbar from '../../UI/Navbar/Navbar'
import SecondaryButton from '../../UI/buttons/SecondaryButton/SecondaryButtonLarge'
import Chat from '../../UI/Chat/Chat'
import Modal from '../../UI/Modal/Modal'

import reducer from '../../../reducer/messageReducer'



function Main() {
  const Auth = useContext(AuthContext)
  const [messages, dispatch] = useReducer(reducer, [])
  const [modalActive, setModalActive] = useState(false)



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

  }

  function modalOpen(e) {
    e.preventDefault()
    setModalActive(true)
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
      <Modal
        active={modalActive}
        setActive={setModalActive}
      >
        
      </Modal>

    </div>
  )
}

export default Main