import React from 'react'
import classes from './Link.module.scss'

function Link(props) {
  return (
    <div className = {classes.Link}>
      <a onClick={props.onClick}>{props.text}</a>
    </div>
  )
}

export default Link

