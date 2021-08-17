import React from 'react'
import classes from './InputLarge.module.scss'

function InputLarge(props) {
  return (
    <input
      className={classes.InputLarge}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  )
}

export default InputLarge
