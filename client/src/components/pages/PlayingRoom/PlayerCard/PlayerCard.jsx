import React from 'react'
import classes from './PlayerCard.module.scss'
import Icon from '../../../UI/Icon/Icon'

function PlayerCard({ index, data, slotSelectionHandler }) {
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
    ? data.find((item) => {
      if (index === item.slotNumber) {
        return <div id={`slot-${index}`} className={classes.PlayerCard_player}>
          <img src={item.avatarLink} alt="" />
          <strong>{item.nickname}</strong>
          <span>ведущий</span>
        </div>
      }
    }) || notSelectedPlayer
    : data.find((item) => {
      if (index === item.slotNumber) {
        return <div className={classes.PlayerCard_leader} id={`slot-${index}`} >
          <img src={item.avatarLink} alt="" />
          <strong>{item.nickname}</strong>
          <span>ведущий</span>
        </div>
      } 
    }) || notSelectedLeader
  

  return (
    <>
      {
        card
      }
    </>
  )
}

export default PlayerCard
