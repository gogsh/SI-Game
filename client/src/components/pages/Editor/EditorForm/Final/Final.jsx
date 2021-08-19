import React from 'react'
import classes from './Final.module.scss'
import Dropdown from '../../../../UI/Dropdown/Dropdown'

function Final(props) {
  return (
    <div className={classes.Final}>
      <div className={classes.Final_header}>
        <Dropdown
          lableText={'Тем в финале'}
          hint={'Минимум одна тема в финале. На каждую тему всего один вопрос.'}
          valuesArr={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          defaultValue={props.numberOfFinalThemes}
          changeHandler={props.onChangeFinalThemeQuantity}
          name={'numberOfFinalThemes'}
        />
      </div>
      {
        props.finalData.themes.map((theme, index) => {
          if (index < props.numberOfFinalThemes) {
            return <div className={classes.Final_body} key={index}>
              <div className={classes.Final_body_header}>
                <span>{index + 1}</span>
                <input type="text" placeholder={'Название темы'} name={'themeName'} />
              </div>
              <div className={classes.Final_body_form}>
                <textarea name="questionContent" id={`${index}-questionContent`} rows="5" placeholder={'Текст вопроса'} value={theme?.question?.questionContent || ''} onChange={props.onChangeFinalQuestion}></textarea>
                <textarea name="_text" id={`${index}-answer`} rows="5" placeholder={'Ответ'} value={theme?.question?.answer?._text || ''} onChange={props.onChangeFinalAnswer}></textarea>
              </div>
            </div>
          } else return null
        })
      }
    </div>
  )
}

export default Final
