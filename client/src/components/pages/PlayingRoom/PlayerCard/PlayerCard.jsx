import React, { useState, useEffect } from 'react'
import classes from './PlayerCard.module.scss'
import Icon from '../../../UI/Icon/Icon'

function PlayerCard({ type, slotSelected, slotSelectionHandler}) {
  const [points, setPoints] = useState('')  
  // if (slotSelected) return (
  //   <>
  //     {type === 'leader' && leaderInfo !== null
  //       ? <div className={classes.PlayerCard_leader}>
  //         <img src={leaderInfo.avatarLink} alt="" />
  //         <strong>{leaderInfo.nickname}</strong>
  //         <span>ведущий</span>
  //       </div>
  //       : <div>

  //       </div>
  //     }
  //   </>
  // )
  // else return (
  //   <>
  //     {
  //       type === 'leader' ?
  //         <div className={classes.PlayerCard_notSelected_leader} onClick={slotSelectionHandler} id={type}>
  //           <Icon
  //             name={'plus'}
  //             size={60}
  //             clickHandler={slotSelectionHandler}
  //             pointerEvents={'none'}
  //           ></Icon>
  //         </div > :
  //         <div className={classes.PlayerCard_notSelected_player}>
  //           <Icon
  //             name={'plus'}
  //             size={60}
  //             clickHandler={slotSelectionHandler}
  //             pointerEvents={'none'}
  //           ></Icon>
  //         </div>
  //     }
  //   </>
  // )
  return <div></div>
}

export default PlayerCard
