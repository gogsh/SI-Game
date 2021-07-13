import React from 'react'
import classes from './LargeColumn.module.scss'

function LargeColumn (props) {
  return (
    <div className={classes.LargeColumn}>
      {props.children}
    </div>
  )
}

export default LargeColumn