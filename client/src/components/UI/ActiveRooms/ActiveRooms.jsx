import React from 'react'
import classes from './ActiveRooms.module.scss'
import SubHeader from '../SubHeader/SubHeader'
import Search from '../inputs/Search/Search'
import Room from './Room/Room'
import Hint from '../Hint/Hint'

function ActiveRooms(props) {
  return (
    <div className={classes.ActiveRooms}>
      <SubHeader
        headerAlign={props.headerAlign}
        header={props.header}
      >
        <Search />

      </SubHeader>
      <div className={classes.ActiveRooms__container}>
        {props.rooms.length > 0 ?
          props.rooms.map((room, index) => {
            return (
              <Room
                key={index}
                roomData={room}
              />
            )
          }) : <Hint text={'Комнат нет'} />
        }
      </div>
    </div>
  )
}

export default ActiveRooms
