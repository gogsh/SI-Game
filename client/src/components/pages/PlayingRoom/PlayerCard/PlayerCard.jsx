import React from 'react'
import classes from './PlayerCard.module.scss'
import Icon from '../../../UI/Icon/Icon'

function PlayerCard({ index, data, slotSelectionHandler }) {
  let selectedPlayerData = data.find((item) => {
    if (index === item.slotNumber) {
      console.log('selectedPlayerData')
      console.log(item)
      return item
    }
  })
  let notSelectedPlayer = <div className={classes.PlayerCard_notSelected_player}
    onClick={slotSelectionHandler}
    id={`slot-${index}`}
  >
    <Icon
      name={'plus'}
      size={60}
      pointerEvents={'none'}
    ></Icon>
  </div>
  let notSelectedLeader = <div className={classes.PlayerCard_notSelected_leader}
    onClick={slotSelectionHandler}
    id={`slot-${index}`}

  >
    <Icon
      name={'plus'}
      size={60}
      pointerEvents={'none'}
    ></Icon>
  </div >

  let card = index !== 0
    ? selectedPlayerData ? <div id={`slot-${index}`} className={classes.PlayerCard_player}>
      <img src={selectedPlayerData.avatarLink} alt="" />
      <div className={classes.PlayerCard_player_rightSide}>
        <span>{selectedPlayerData.nickname}</span>
        <strong>{selectedPlayerData.score}</strong>
      </div>
    </div> : notSelectedPlayer
    : selectedPlayerData ? <div className={classes.PlayerCard_leader} id={`slot-${index}`} >
      <img src={selectedPlayerData.avatarLink} alt="" />
      <strong>{selectedPlayerData.nickname}</strong>
      <span>ведущий</span>
    </div>
      : notSelectedLeader
  return (
    <>
      {
        card
      }
    </>
  )
}

export default PlayerCard
