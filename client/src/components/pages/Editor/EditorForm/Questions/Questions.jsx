import React, { useState } from 'react'
import classes from './Questions.module.scss'
import Question from './Question/Question'
import QuestionForm from './QuestionForm/QuestionForm'

function Questions(props) {
  const [activeIndex, setActiveIndex] = useState(null)
  const onChangeQuestion = event => {
    setActiveIndex(event.target.value)
  }

  const renderQuestions = (NoQ) => {
    let result = []
    for (let index = 0; index < NoQ; index++) {
      result.push(<Question
        activeIndex={activeIndex}
        key={index}
        name={`Questions-${props.themeIndex}-${props.id}`}
        value={index}
        changeHandler={onChangeQuestion}
      />)
    }
    return result
  }

  return (
    <div className={classes.Questions}>
      <div className={classes.Questions_container}>
        {
          renderQuestions(props.numberOfQuestions)
        }
      </div>
      {
        activeIndex
          ? <QuestionForm
            questionHandler={props.onChangeQuestionContent}
            answerHandler = {props.onChangeAnswerContent}
            id = {`${props.id}-${activeIndex}-questionId-${props.questions[activeIndex].questionContent}`}            
            question={props.questions[activeIndex]}
          />
          : <div></div>
      }
    </div>
  )
}

export default Questions
