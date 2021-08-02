import React from 'react'
import classes from './Input.module.scss'
import HintIcon from '../../Icon/HintIcon'

function Input(props) {
  
  return (
    <div className={classes.Input}>
      <span>{props.lableText}</span>
      <div className={classes.Input_rightSide}>
        <HintIcon
          name={'question'}
          color={'#ECECEC'}
          size={25}
          hint={props.hint}
        />
        <input name = {props.name} type="text" onChange={props.changeHandler} value={props.data} />
      </div>
    </div>
  )
}

export default Input
