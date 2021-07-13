import React, { Component } from 'react'
import classes from './Main.module.scss'
import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'
import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'
import ActiveRooms from '../../UI/ActiveRooms/ActiveRooms'
import Navbar from '../../UI/Navbar/Navbar'
import SecondaryButton from '../../UI/buttons/SecondaryButton/SecondaryButtonLarge'
import Chat from '../../UI/Chat/Chat'

class Main extends Component {
  state = {
    userName: 'NAME',
    header: 'Список игр',
    primaryButtonText: 'Создать игру',
    secondaryButtonText: 'Редактор паков',
    headerAlign: 'right',
    rooms: [
      {
        roomName: 'roomName',
        packName: 'история',
        curentUsers: 4,
        maxUsers: 5,
        withPassword: true
      },
      {
        roomName: 'GoodBoys',
        packName: 'COME ALL FASTAAAAAAA',
        curentUsers: 2,
        maxUsers: 4,
        withPassword: false
      },
      {
        roomName: 'another room',
        packName: 'animePAK',
        curentUsers: 1,
        maxUsers: 4,
        withPassword: false
      },
    ]
  }
  
  render () {

    function createGameHandler() {
      console.log('createGameHandler отработал');
    }

    return (
      <div className={classes.Main}>
        <SmallColumn>
          <SmallProfile
            userName = {this.state.userName}
          />
          <PrimaryButton
            text = {this.state.primaryButtonText}
            clickHandler = {createGameHandler}
          />
          <ActiveRooms
            rooms = {this.state.rooms}
            headerAlign = {this.state.headerAlign}
            header = {this.state.header}
          />

        </SmallColumn>
        
        <LargeColumn>
          <Navbar/>
            <SecondaryButton
              text = {this.state.secondaryButtonText}
              linkTo = {'/editor'}
            />
            <Chat></Chat>
        </LargeColumn>
      </div>
    )
  }
}

export default Main