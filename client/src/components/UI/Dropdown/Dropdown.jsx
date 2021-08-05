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
        hint={props.hint}
      />
      
      <select type="text" name={props.name} onChange={props.changeHandler} value={props.defaultValue}>
        {
          props.valuesArr.map(item => {
            return <option key={item} value={item}>{item}</option>
          })
        }
      </select>
    </div>
  )
}

export default Dropdown
