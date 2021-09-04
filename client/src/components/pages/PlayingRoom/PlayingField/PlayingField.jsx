import React, { useEffect, useContext } from 'react'
import classes from './PlayingField.module.scss'
import SiLogo from '../../../../images/si.png'
import Loader from '../../../UI/Loader/Loader'

import ChooseWhoStart from './ChooseWhoStart/ChooseWhoStart'

import { isUrl } from '../../../../helpers/urlHelper'
import { TimerContext } from '../../../../context/TimerContext'

function PlayingField({ lobbyState, packData, isLeader, startGameHandler, chooseWhoStartHandler }) {

  const Timers = useContext(TimerContext)

  useEffect(() => {
    console.log('2133131', document.getElementById('runningDiv'))
    // if (lobbyState.gameStatus.status === 'showing-themes') {
    //   document.getElementById('runningDiv').animate([
    //     {
    //       marginTop: '300px'

    //     },
    //     {
    //       marginTop: '-300%'

    //     }
    //   ], {
    //     duration: Timers['showing-themes'],
    //     iterations: Infinity
    //   });
    // }
  }, [])

  const renderComponent = () => {
    switch (lobbyState.gameStatus.status) {
      // TODO: make component for prepairing
      case 'prepairing':
        return <div className={classes.PlayingField_prepairing}>
          <div className={classes.PlayingField_prepairing_header}>
            <div className={classes.PlayingField_prepairing_header_leftSide}>
              <img src={isUrl(packData.logo) ? packData.logo : SiLogo} alt={''} />
            </div>
            <div className={classes.PlayingField_prepairing_header_rigthSide}>
              <div className={classes.PlayingField_prepairing_header_rigthSide_packName}>
                <span>{packData.name}</span>
              </div>
              <div className={classes.PlayingField_prepairing_header_rigthSide_info}>
                <span className={classes.PlayingField_prepairing_header_rigthSide_info_autor}>
                  автор: {packData.author}
                </span>
                <span className={classes.PlayingField_prepairing_header_rigthSide_info_discription}>
                  {packData.discription}
                </span>
              </div>
            </div>
          </div>
          <div className={classes.PlayingField_prepairing_body}>
            <div className={classes.PlayingField_prepairing_body_leftSide}>
              <div className={classes.PlayingField_prepairing_body_leftSide_info}>
                <span>Кол-во раундов</span>
                <strong>{packData.numberOfRounds}</strong>
              </div>
              <div className={classes.PlayingField_prepairing_body_leftSide_info}>
                {
                  packData.difficulty !== ''
                    ? <>
                      <span>Сложность</span>
                      <strong>{packData.difficulty}</strong>
                    </>
                    : null
                }
              </div>
            </div>
            <div className={classes.PlayingField_prepairing_body_rigthSide}>
              {
                isLeader
                  ? <div className={classes.PlayingField_prepairing_body_rigthSide_container}>
                    {
                      lobbyState.gameStatus.players.length <= 1
                        ? <span className={classes.PlayingField_prepairing_body_rigthSide_container_alert}>Нужен хотя бы один игрок</span>
                        : lobbyState.numberOfPlayers !== lobbyState.gameStatus.players.length
                          ? <span className={classes.PlayingField_prepairing_body_rigthSide_container_alert}>Игра начнется в неполном лобби!</span>
                          : <></>
                    }
                    <button
                      onClick={startGameHandler}
                      className={classes.PlayingField_prepairing_body_rigthSide_container_button}
                      disabled={lobbyState.gameStatus.players.length <= 1 ? true : false}>
                      Начать игру
                    </button>
                  </div>
                  : <div className={classes.PlayingField_prepairing_body_rigthSide_container}>
                    <span>Ожидание старта игры...</span>
                  </div>
              }
            </div>
          </div>
        </div>
      case 'choose-who-start':
        return <ChooseWhoStart
          isLeader={isLeader}
          players={lobbyState.gameStatus.players}
          chooseWhoStartHandler={chooseWhoStartHandler}
        />
      case 'showing-round':
        return <div className={classes.Showing_round}>{
          packData.rounds[lobbyState.gameStatus.currentRound].RoundName
          || `Раунд №${lobbyState.gameStatus.currentRound}`
        }</div>
      case 'showing-themes':
        return <div className={classes.Showing_themes}>
          <div className={classes.Showing_themes_animatedDiv}>
            {packData.rounds[0].themes.map((theme, index) => {
              return <div key={index}><span>{theme.themeName}</span></div>
            })}
          </div>
        </div>
      case 'choosing':
        return <div>choosing</div>
      default:
        return <></>
    }
  }
  return (
    <>
      {
        packData
          ? renderComponent()
          : <Loader />
      }
    </>
  )
}

export default PlayingField
