import React from 'react'
import classes from './SmallProfile.module.scss'

function SmallProfile(props) {
  return (
    <div className={classes.SmallProfile}>
      <div className={classes.avatar}></div>
        <span className={classes.userName}>{props.userName}</span>
      <div className={classes.avatar}></div>
    </div>
  )
}

export default SmallProfile
