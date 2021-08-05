import React from 'react'
import classes from './Theme.module.scss'

function Theme(props) {
  return (
    <div className={classes.Theme}>
      <input name={props.inputName} id={`${props.id}-${props.inputName}-${props.inputData}`} type="text" onChange={props.changeHandler} value={props.inputData} placeholder={props.inputPlaceholder} />
      {props.children}
    </div>
  )
}

export default Theme
