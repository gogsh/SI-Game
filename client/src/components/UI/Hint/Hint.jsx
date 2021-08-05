import React from 'react'
import classes from './Hint.module.scss'

function Hint(props) {
  return (
    <>
      {
        props.type === 'large'
          ? <div className={classes.HintLarge}> <span>{props.text}</span> </div>
          : <div className={classes.HintSmall}> <span>{props.text}</span> </div>
      }
    </>
  )
}

export default Hint
