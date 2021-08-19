import React from 'react'
import classes from './Link.module.scss'

function Link(props) {
  return (
    <div className = {classes.Link}>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

export default Link

