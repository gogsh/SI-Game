import React from 'react'
import classes from './QuestionForm.module.scss'
import HintIcon from '../../../../../UI/Icon/HintIcon'

function QuestionForm(props) {
  return (
    <div className={classes.QuestionForm}>
      <div className={classes.QuestionForm_header}>
        <span>Заполните вопрос</span>
        <strong>{props.question.price}</strong>       
      </div>
      <div className={classes.QuestionForm_body}>
        <div className={classes.QuestionForm_leftSide}>
          <div className={classes.QuestionForm_lable}>
            <span>Вопрос</span>
            <HintIcon
              name={'question'}
              color={'#ECECEC'}
              size={22}
              hint={'12123'}
            />
          </div>
          <textarea id={props.id} onChange={props.questionHandler} value={props.question.questionContent || '' } name="questionContent" cols="30" rows="10" ></textarea>
        </div>
        <div className={classes.QuestionForm_rigthSide}>
          <div className={classes.QuestionForm_lable}>
            <span>Ответ</span>
            <HintIcon
              name={'question'}
              color={'#ECECEC'}
              size={22}
              hint={'12123'}
            />
          </div>
          <textarea id={props.id} onChange={props.answerHandler} value={props.question.answer._text || '' } name="_text" cols="30" rows="10"></textarea>
        </div>
      </div>
    </div>
  )
}

export default QuestionForm
