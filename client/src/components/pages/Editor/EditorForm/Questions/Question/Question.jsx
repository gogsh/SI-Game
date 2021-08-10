import React from 'react'
import classes from './Question.module.scss'

function Question(props) {
  return (
    <>
      <input type="radio" className={classes.Question_input} name={props.name} value={props.value} onChange={props.changeHandler} id={`${props.name}-${props.value}`}/>
      <label className={classes.Question} htmlFor={`${props.name}-${props.value}`}></label>
    </>
  )
}

export default Question
