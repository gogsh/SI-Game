import React from 'react'
import SubHeader from '../SubHeader/SubHeader'
import classes from './Chat.module.scss'

function Chat() {
  return (
    <div className={classes.Chat}>
      <SubHeader
        headerAlign={'left'}
        header={'Чат'}
      />
      <div className={classes.Chat_body}>
        

      </div>

      <div className={classes.Chat_footer}>

      </div>

    </div>
  )
}

export default Chat
