import React, { useContext } from 'react'
import classes from './ChooseWhoStart.module.scss'
import Timer from '../../../../UI/Timer/Timer'
import { TimerContext } from '../../../../../context/TimerContext'
import RandomImage from './../../../../../images/random.png'

function ChooseWhoStart({ isLeader, players }) {
  const Timers = useContext(TimerContext)
  return (
    <>
      <Timer
        time={Timers['choose-who-start']}
      />
      <div className={classes.ChooseWhoStart}>
        {isLeader ?
          <div className={classes.ChooseWhoStart_leader}>
            <h1> Выберите того, кто первый будет выбирать вопрос: </h1>
            <div className={classes.ChooseWhoStart_leader_choosePlayer}>
              <div className={classes.ChooseWhoStart_leader_choosePlayer_players}>
                {players.map((player, index) => {
                  console.log('rendering player', player)
                  if (player.slotNumber && player.slotNumber !== 0) {
                    return <div
                      key={index}
                      className={classes.ChooseWhoStart_leader_choosePlayer_players_button}
                    >
                      <img src={player.avatarLink} alt="" />
                      <span>{player.nickname}</span>
                    </div>
                  } else return null
                })
                }
              </div>
              <div className={classes.ChooseWhoStart_leader_choosePlayer_players_random}>
                <img src={RandomImage} alt="" />
                <span>Выбрать случайно</span>
              </div>
            </div>
          </div>
          : <div className={classes.ChooseWhoStart_player}>
            <h1> Подождите, пока ведущий выберет того, кто будет отвечать </h1>
          </div>
        }
      </div>
    </>
  )
}

export default ChooseWhoStart
