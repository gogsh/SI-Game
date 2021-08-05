import React from 'react'
import classes from './QuestionForm.module.scss'

function QuestionForm(props) {
  return (
    <div>
      {`Карточка ${props.question}`}
    </div>
  )
}

export default QuestionForm
