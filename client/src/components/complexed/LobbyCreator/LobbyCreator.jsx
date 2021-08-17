import React from 'react'
import classes from './LobbyCreator.module.scss'
import Modal from '../../UI/Modal/Modal'
import Input from '../../UI/inputs/Input/Input'
import Dropdown from '../../UI/Dropdown/Dropdown'
import LibraryTable from '../LibraryTable/LibraryTable'
import PackSelectionCard from './PackSelectionCard/PackSelectionCard'
import Loader from '../../UI/Loader/Loader'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'

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
                placeholder={'Название пака'}
              />
              <Input
                lableText={'Пароль'}
                data={lobbyData.password}
                changeHandler={changeHandlers.onChangeInput}
                name={'password'}
                placeholder={'Название пака'}
                type={'password'}
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
        <span>{!lobbyData.isSelected? 'Выберите пак' : 'Пак выбран'}</span>

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
                <button className={classes.LobbyCreator__button_createPack} onClick={createGame}> Создать пак </button>
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
