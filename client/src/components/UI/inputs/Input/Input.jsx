import React from 'react'
import classes from './Input.module.scss'
import HintIcon from '../../Icon/HintIcon'

function Input(props) {
  return (
    <div className ={classes.Input}>
      <span>{props.lableText}</span>
      <HintIcon
        name={'question'}
        color={'#ECECEC'}
        size={25}
        hint = {props.hint}
      />
      <input type="text" onChange={props.changeHandler} />
    </div>
  )
}

export default Input
