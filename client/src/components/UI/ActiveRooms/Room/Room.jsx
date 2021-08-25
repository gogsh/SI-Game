import React from 'react'
import classes from './Room.module.scss'
import { Link } from 'react-router-dom'


function Room({ roomData, joinLobby }) {
  const players = roomData.gameStatus.players
  const isFull = roomData.numberOfPlayers >= players.length + 1
    ? false
    : true
  return (
    <Link to={isFull ? '' : '/playingRoom'} >
      <div className={classes.Room}
        onClick={joinLobby}
        id={`${roomData.lobbyId}__${isFull ? 'FULL' : 'OPEN'}`}>
        <div className={classes.Room_leftSide}>
          <strong >{roomData.name}</strong>
          <span > {roomData.packName}</span>
        </div>
        <div className={classes.Room_rigthSide}>
          <div className={classes.Room_rigthSide_images}>
            {players ?
              players.map((player, index) => {
                return <div className={classes.Room_rigthSide_images_container} key={index}>
                  <img src={player.avatarLink} alt="" />
                </div>
              }) : null
            }
          </div>
          <span className={classes.Room_rigthSide_currentPlayers}>{`${players.length}/${roomData.numberOfPlayers}`}</span>
        </div>
      </div>
    </Link>
  )
}

export default Room