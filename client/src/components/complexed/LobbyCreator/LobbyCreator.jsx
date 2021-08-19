import React from 'react'
import classes from './LobbyCreator.module.scss'
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/inputs/Input/Input'
import Dropdown from '../../UI/Dropdown/Dropdown'
import LibraryTable from '../LibraryTable/LibraryTable'
import PackSelectionCard from './PackSelectionCard/PackSelectionCard'
import Loader from '../../UI/Loader/Loader'
import { Link } from 'react-router-dom'

function LobbyCreator({ modalActive, setModalActive, lobbyData, allPacks, loading, changeHandlers, createGame }) {
  
  return (
    <Modal
      active={modalActive}
      setActive={setModalActive}
      closeIconPosition={'95%'}
    >
      <div className={classes.LobbyCreator}>
        <div className={classes.LobbyCreator__header}>
          <h1>Создать комнату</h1>
          <div className={classes.LobbyCreator__header__container}>
            <div className={classes.LobbyCreator__header__leftSide}>
              <Input
                lableText={'Навание'}
                data={lobbyData.name}
                changeHandler={changeHandlers.onChangeInput}
                name={'name'}
                placeholder={'Название лобби'}
              />
              <Input
                lableText={'Пароль'}
                data={lobbyData.password}
                changeHandler={changeHandlers.onChangeInput}
                name={'password'}
                placeholder={'Пароль от лобби'}
                type={'text'}
              />
            </div>
            <div className={classes.LobbyCreator__header__rightSide}>
              <Dropdown
                lableText={'Кол-во игроков'}
                hint={'Вместе с ведущим'}
                valuesArr={[1, 2, 3, 4, 5]}
                defaultValue={lobbyData.numberOfPlayers}
                changeHandler={changeHandlers.onChangeDropdown}
                name={'numberOfPlayers'}
              />
            </div>
          </div>
        </div>
        <span>{!lobbyData.isSelected ? 'Выберите пак' : 'Пак выбран'}</span>

        {!loading ?
          !lobbyData.isSelected
            ? <div className={classes.LobbyCreator__table}>
              <LibraryTable data={allPacks} changeHandler={changeHandlers.onClickSelectedPack} />
            </div>
            : <div className={classes.LobbyCreator__overview}>
              <PackSelectionCard
                data={lobbyData}
              />
              <div className={classes.LobbyCreator__info}>
                <span>SI GAME</span>
                <button className={classes.LobbyCreator__button_chooseOther} name={'isSelected'} onClick={changeHandlers.onChangeInput}> Выбрать другой </button>
                <Link to='/playingRoom' className={classes.LobbyCreator__button_container}>
                  <button className={classes.LobbyCreator__button_createPack} onClick={createGame}> Создать пак </button>
                </Link>
              </div>
            </div>
          :
          <Loader />
        }



      </div>
    </Modal>
  )
}

export default LobbyCreator
