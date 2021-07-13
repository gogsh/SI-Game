import React from 'react'
import classes from './SecondaryButtonLarge.module.scss'
import { Link } from 'react-router-dom'

function SecondaryButton(props) {
  return (
    <div className={classes.container}>
      <Link to={props.linkTo || '/'}>
        <button className={classes.SecondaryButton} onClick={props.onClick} disabled={props.disabled}>
          {props.text}
        </button>
      </Link>
    </div>
  )
}

export default SecondaryButton
