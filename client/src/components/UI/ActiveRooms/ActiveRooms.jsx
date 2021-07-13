import React from 'react'
import classes from './ActiveRooms.module.scss'
import SubHeader from '../SubHeader/SubHeader'
import Search from '../inputs/Search/Search'
import Room from './Room/Room'


function ActiveRooms(props) {
  return (
    <div className={classes.ActiveRooms}>
      <SubHeader
        headerAlign = {props.headerAlign}
        header = {props.header}
      >
        <Search/>

      </SubHeader>
      {props.rooms.map((item, index) => {
        console.log(item)
        return (
          <Room
          key = {index}
          data = {item}
          />
        )
      })}
    </div>
  )
}

export default ActiveRooms
