import React, { useState } from 'react'
import SubHeader from '../SubHeader/SubHeader'
import classes from './Chat.module.scss'
import { chatSocket } from '../../../socket'

function Chat({ nickname, avatarLink, messages, onAddMessage }) {
  const [messageValue, setMassageValue] = useState('')
  const onSendMessage = (event) => {
    if (event.key === "Enter") {
      event.preventDefault()
      chatSocket.emit('CHAT:NEW_MESSAGE', {
        nickname,
        text: messageValue
      })
      console.log('message sended')
      // onAddMessage({nickname, text: messageValue})   

      setMassageValue('')
    }
  }
  

  

  return (
    <div className={classes.Chat}>
      <SubHeader
        headerAlign={'left'}
        header={'Чат'}
      />
      <div className={classes.Chat_body}>
        {messages.map((message, index) => (
            <div key={message + index}>
              <p>{message.text}</p>
              <div>
                <span>{message.nickname}</span>
              </div>
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
