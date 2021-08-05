import React from 'react'
import classes from './EditorForm.module.scss'
import Input from '../../../UI/inputs/Input/Input'
import Dropdown from '../../../UI/Dropdown/Dropdown'
import Textarea from '../../../UI/Textarea/Textarea'
import Hint from '../../../UI/Hint/Hint'
import Round from './Round/Round'
import Theme from './Theme/Theme'
import Questions from './Questions/Questions'


function EditorForm(props) {
  return (
    <form className={classes.EditorForm}>
      <div className={classes.EditorForm_header}>
        <div className={classes.EditorForm_header_leftside}>
          <Input
            lableText={'Название'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            data={props.state.name}
            changeHandler={props.changeHandlers.onChangeInput}
            name={'name'}
            placeholder={'Название пака'}
          />
          <Input
            lableText={'Логотип'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            data={props.state.logo}
            changeHandler={props.changeHandlers.onChangeInput}
            name={'logo'}
            placeholder={'Ссылка на логотип'}
          />
          <Textarea
            lableText={'Описание'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            text={props.state.discription}
            changeHandler={props.changeHandlers.onChangeInput}
            name={'discription'}
            placeholder={'Краткое описание (не более 30 символов)'}
            maxLength={50}
          />
        </div>
        <div className={classes.EditorForm_header_rightside}>
          <Dropdown
            lableText={'Кол-во раундов'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultValue={props.state.numberOfRounds}
            changeHandler={props.changeHandlers.onChangeRoundQuantity}
            name={'numberOfRounds'}
          />
          <Dropdown
            lableText={'Тем в раунде'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultValue={props.state.numberOfThemes}
            changeHandler={props.changeHandlers.onChangeThemeQuantity}
            name={'numberOfThemes'}
          />
          <Dropdown
            lableText={'Вопросов на тему'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultValue={props.state.numberOfQuestions}
            changeHandler={props.changeHandlers.onChangeDropdown}
            name={'numberOfQuestions'}
          />
          <Dropdown
            lableText={'Сложность'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            defaultValue={props.state.difficulty}
            changeHandler={props.changeHandlers.onChangeDropdown}
            name={'difficulty'}
          />
        </div>
      </div>
      <div className={classes.EditorForm_body}>
        {
          props.state.numberOfRounds == 0
            ? <Hint
              type={'large'}
              text={'Задайте кол-во раундов'}
            />
            : <> {props.state.rounds.map((round, index, rounds) => {
              if (index < props.state.numberOfRounds && !('FinalName' in round)) {
                return <Round
                  key={index}
                  id={index}
                  inputName={'RoundName'}
                  inputData={round.RoundName}
                  changeHandler={props.changeHandlers.onChangeRoundName}
                  roundNumber={index + 1}
                  inputPlaceholder={'Название раунда'}
                >
                  {props.state.numberOfThemes == 0 ?
                    <Hint
                      text={'Задайте кол-во тем'}
                    />
                    : round.themes.map((theme, i, themes) => {
                      if (i < props.state.numberOfThemes) {
                        return <Theme
                          key={i}
                          id={`${index}-${i}`}
                          inputName={'themeName'}
                          inputData={theme.themeName}
                          changeHandler={props.changeHandlers.onChangeThemeName}
                          inputPlaceholder={'Название Темы'}
                        >
                          {
                            !theme.questions
                              ? <Hint
                                text={'Задайте кол-во вопросов'}
                              />
                              : <Questions
                              questions = {theme.questions}
                              themeIndex = {i}
                              onChangeQuestion = {props.changeHandlers.onChangeQuestion}
                              activeQuestion = {props.activeQuestion}
                              />

                          }

                        </Theme>
                      }
                    })
                  }
                </Round>
              }
            })} <div>FINAL</div> </>
        }

      </div>
    </form>
  )
}

export default EditorForm
