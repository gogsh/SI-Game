import React from 'react'
import classes from './Dropdown.module.scss'
import HintIcon from '../Icon/HintIcon'


function Dropdown(props) {
  return (
    <div className={classes.Dropdown}>
      <span>{props.lableText}</span>
      <HintIcon
        name={'question'}
        color={'#ECECEC'}
        size={25}
        hint = {props.hint}
      />
      <select type="text" onChange={props.changeHandler}>
        {
          props.valuesArr.map(item => {
            return <option value="123">{item}</option>
          })
        }        
      </select>
    </div>
  )
}

export default Dropdown
