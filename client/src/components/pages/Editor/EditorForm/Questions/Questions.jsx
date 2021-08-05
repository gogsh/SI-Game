import React, { useState } from 'react'
import classes from './Questions.module.scss'
import Question from './Question/Question'
import QuestionForm from './QuestionForm/QuestionForm'

function Questions(props) {
  const [activeIndex, setActiveIndex] = useState(null)
  const onChangeQuestion = event => {
    setActiveIndex(event.target.value)
  }
  return (
    <div className={classes.Questions}>
      {
        props.questions.map((question, index) => {
          return <Question
            activeIndex={activeIndex}
            key={index}
            name={`Questions-${props.themeIndex}`}
            value={index}
            changeHandler={onChangeQuestion}
          />
        })
      }
      {
        activeIndex
          ? <QuestionForm
            question={ props.questions[activeIndex] }
          />
          : <div></div>
      }      
    </div>
  )
}

export default Questions
