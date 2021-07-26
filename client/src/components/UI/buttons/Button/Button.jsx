import React from 'react'
import classes from './Button.module.scss'
import { Link } from 'react-router-dom'


function Button(props) {
  const type = props.type.split('-')
  return (
    <div className={classes.container}>
      {type[0] === 'small' && type[1] === 'primary' && props.linkTo
        ? <Link to={props.linkTo || '/'}>
          <button className={classes.smallPrimaryButton} onClick={props.onClick} disabled={props.disabled} type={props.TYPEe}>
            {props.text}
          </button>
        </Link> :
        type[0] === 'small' && type[1] === 'primary' && !props.linkTo
          ? <button className={classes.smallPrimaryButton} onClick={props.onClick} disabled={props.disabled} type={props.TYPEe}>
            {props.text}
          </button> :
        type[0] === 'small' && type[1] === 'error' && !props.linkTo
          ? <button className={classes.smallErrorButton} onClick={props.onClick} disabled={props.disabled} type={props.TYPEe}>
          {props.text}
        </button> : 
        type[0] === 'small' && type[1] === 'secondary' && type[2] === 'success' && !props.linkTo
        ? <button className={classes.smallSecondarySuccessButton} onClick={props.onClick} disabled={props.disabled} type={props.TYPEe}>
        {props.text}
      </button> :
        <div></div>
      }

    </div>
  )
}

export default Button
