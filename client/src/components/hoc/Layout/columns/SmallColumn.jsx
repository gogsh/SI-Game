import React from 'react'
import classes from './SmallColumn.module.scss'

function SmallColumn (props) {
  return (
    <div className={classes.SmallColumn}>
      {props.children}
    </div>
  )
}

export default SmallColumn