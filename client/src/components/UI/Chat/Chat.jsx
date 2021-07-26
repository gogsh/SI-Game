import React, { useState, useEffect } from 'react'
import SubHeader from '../SubHeader/SubHeader'
import classes from './Chat.module.scss'
import { chatSocket } from '../../../socket'

function Chat({ nickname, avatarLink, messages, onAddMessage }) {
  const body = document.querySelector(`.${classes.Chat_body}`)
  const [messageValue, setMassageValue] = useState('')
  const onSendMessage = (event) => {
    if (event.key === "Enter" && messageValue !== '') {
      event.preventDefault()
      
      chatSocket.emit('CHAT:NEW_MESSAGE', {
        nickname,
        text: messageValue,
        avatarLink
      })
      
      setMassageValue('')
    }
  }

  useEffect(() => {
    if(body) {
      body.scrollTo({
        top: body.scrollHeight,
        behavior: 'smooth'
      })
    }
    
  }, [messages, body])

  const currentTime = () => {
    let date = new Date()
    return (date.getMinutes().length < 2) 
    ? date.getHours().toString() + ':' + '0' + date.getMinutes().toString() 
    : date.getHours().toString() + ':' + date.getMinutes().toString()
  }




  return (
    <div className={classes.Chat}>
      <SubHeader
        headerAlign={'left'}
        header={'Чат'}
      />
      <div className={classes.Chat_body}>
        {messages.map((message, index) => (
          <div  key={message + index} className={classes.Chat_body_container}>
            <div className={classes.Chat_body_container_header}>
              <div className={classes.Chat_body_container_header_leftSide}>
                <img src={message.avatarLink} alt="" />
                <span>{message.nickname}</span>
              </div>
              <span>{currentTime()}</span>
            </div>
            <p className={classes.Chat_body_container_message}>{message.text}</p>
          </div>
        ))
        }
      </div>





      <div className={classes.Chat_footer}>
        <div className={classes.avatar}> <img src={avatarLink} alt="" /> </div>
        <textarea name="" value={messageValue} rows="2" placeholder='Напишите что-нибудь' onKeyPress={onSendMessage} onChange={(e) => setMassageValue(e.target.value)}></textarea>
      </div>

    </div>
  )
}

export default Chat
