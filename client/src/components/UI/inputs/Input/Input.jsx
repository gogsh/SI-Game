import React from 'react'
import classes from './Input.module.scss'
import HintIcon from '../../Icon/HintIcon'

function Input(props) {
  
  return (
    <div className={classes.Input}>
      <span>{props.lableText}</span>
      <div className={classes.Input_rightSide}>
        {
          props.hint ? <HintIcon
          name={'question'}
          color={'#ECECEC'}
          size={22}
          hint={props.hint}
        /> : <div></div>
        }        
        <input name = {props.name} type={props.type} onChange={props.changeHandler} value={props.data} placeholder={props.placeholder} />
      </div>
    </div>
  )
}

export default Input
