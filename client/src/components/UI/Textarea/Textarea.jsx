import React from 'react'
import classes from './Textarea.module.scss'
import HintIcon from '../Icon/HintIcon'

function Textarea(props) {
  return (
    <div className={classes.Textarea}>
       <span>{props.lableText}</span>
       <HintIcon
        name={'question'}
        color={'#ECECEC'}
        size={25}
        hint = {props.hint}
      />
      <textarea name="" id="" rows="2" value={props.text || '' } ></textarea>
    </div>
  )
}

export default Textarea
