import React from 'react'
import classes from './HintIcon.module.scss'
import Icon from './Icon'

function HintIcon(props) {
  return (
    <div className={classes.HintIcon} data-tooltip={props.hint} >
      <Icon
        name={props.name}
        color={props.color}
        size={props.size}
      />
    </div>
  )
}

export default HintIcon
