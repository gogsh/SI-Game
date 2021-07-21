import React from 'react'
import classes from './PrimaryButtonLarge.module.scss'
import { Link } from 'react-router-dom'


function PrimaryButton(props) {
  return (
    <div className={classes.container}>
      <Link to={props.linkTo || '/'}>
        <button className={classes.PrimaryButton} onClick={props.onClick} disabled={props.disabled}>
          {props.text}
        </button>
      </Link>
      
      
    </div>
  )
}

export default PrimaryButton
