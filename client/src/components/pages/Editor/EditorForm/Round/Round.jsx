import React from 'react'
import classes from './Round.module.scss'

function Round(props) {
  return (
    <div className={classes.Round}>
      <div className={classes.Round_header}>
        {
          props.isFinal 
          ? <h2>{'Финальный раунд'}</h2> 
          : <h2>{`Раунд ${props.roundNumber}`}</h2>
        }
        <input name={props.inputName} id={`${props.id}-${props.inputName}-${props.inputData}`} type="text" onChange={props.changeHandler} value={props.inputData} placeholder={props.inputPlaceholder} />
      </div>
      <div className={classes.Round_footer} >
        {props.children}
      </div>
    </div>
  )
}

export default Round
