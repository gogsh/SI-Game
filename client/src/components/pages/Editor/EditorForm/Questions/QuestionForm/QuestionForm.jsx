import React from 'react'
import classes from './QuestionForm.module.scss'
import Textarea from '../../../../../UI/Textarea/Textarea'
import Dropdown from '../../../../../UI/Dropdown/Dropdown'

function QuestionForm(props) {
  return (
    <div className={classes.QuestionForm}>
      <div className={classes.QuestionForm_leftSide}>
        <Dropdown 
          valuesArr={['Текстовый', 'Только картинка', 'Видео', 'Музыкальный']}
        />
        <Textarea/>
      </div>
      <div className={classes.QuestionForm_rigthSide}>
        <Dropdown 
          valuesArr={[null, 'Кот в мешке', 'Вопрос без риска', 'Аукцион']}
        />
        <Textarea/>
      </div>
      {`Карточка ${props.question}`}
    </div>
  )
}

export default QuestionForm
