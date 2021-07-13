import React from 'react'
import classes from './ImputLarge.module.scss'

function ImputLarge(props) {
  return (
    <input
      className={classes.ImputLarge}
      placeholder={props.placeholder}
      type={props.type}
      name={props.name}
      onChange={props.onChange}
      disabled={props.disabled}
    />
  )
}

export default ImputLarge
