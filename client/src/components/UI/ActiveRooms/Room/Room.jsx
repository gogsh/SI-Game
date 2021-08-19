import React from 'react'
import classes from './Room.module.scss'


function Room({ roomData }) {
  // {name, numberOfPlayers, players, packName}
  console.log(roomData)

  return (
    <div className={classes.Room}>
      <div className={classes.Room_leftSide}>
        <strong>{roomData.name}</strong>
        <span>{roomData.packName}</span>
      </div>
      <div className={classes.Room_rigthSide}>
        <div className={classes.Room_rigthSide_images}>
          {roomData.players ?
            roomData.players.map((player) => {
              return <div className={classes.Room_rigthSide_images_container}>
                <img src={player.avatarLink} alt="" />
              </div>
            }) : null
          }
        </div>
        <span className={classes.Room_rigthSide_currentPlayers}>{`${roomData.players.length}/${roomData.numberOfPlayers}`}</span>
      </div>
    </div>
  )
}

export default Room