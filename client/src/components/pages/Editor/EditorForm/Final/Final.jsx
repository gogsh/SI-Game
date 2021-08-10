import React from 'react'
import classes from './Final.module.scss'
import Dropdown from '../../../../UI/Dropdown/Dropdown'

function Final(props) {
  console.log(props.finalData)
  return (
    <div className={classes.Final}>
      <div className={classes.Final_header}>
        <Dropdown
          lableText={'Тем в финале'}
          hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
          valuesArr={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          defaultValue={props.numberOfFinalThemes}
          // changeHandler={props.changeHandlers.onChangeThemeQuantity}
          name={'numberOfFinalRounds'}
        />
      </div>
      <div className={classes.Final_body}>
        <div className={classes.Final_body_header}>
          <span>{1}</span>
          <input type="text" placeholder={'Название темы'}/>
        </div>
        <div className={classes.Final_body_form}>
          <textarea name="" id="" rows="5" placeholder={'Текст вопроса'}></textarea>
          <textarea name="" id="" rows="5" placeholder={'Ответ'}></textarea>
        </div>

      </div>
    </div>
  )
}

export default Final
