import React from 'react'
import classes from './PlayingField.module.scss'
import SiLogo from '../../../../images/si.png'
import Loader from '../../../UI/Loader/Loader'
import Timer from '../../../UI/Timer/Timer'

import { isUrl } from '../../../../helpers/urlHelper'

function PlayingField({ lobbyState, packData, isLeader }) {

  const renderComponent = () => {
    switch (lobbyState.gameStatus.status) {
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
                      className={classes.PlayingField_prepairing_body_rigthSide_container_button}
                      disabled={lobbyState.gameStatus.players.length <= 1 ? true : false }>
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
      default:
        return <></>
    }
  }
  return (
    <>
      <Timer
        time={10}
      />
      {
        packData
          ? renderComponent()
          : <Loader />
      }
    </>
  )
}

export default PlayingField
