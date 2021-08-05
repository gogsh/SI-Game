import React from 'react'
import classes from './Question.module.scss'

function Question(props) {
  return (
    <input type="radio" name={props.name}  value={props.value} onChange={props.changeHandler}/>
  )
}

export default Question
