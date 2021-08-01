import React from 'react'
import classes from './EditorForm.module.scss'
import SubHeader from '../../../UI/SubHeader/SubHeader'
import Input from '../../../UI/inputs/Input/Input'
import Dropdown from '../../../UI/Dropdown/Dropdown'
import Textarea from '../../../UI/Textarea/Textarea'


function EditorForm() {
  return (
    <form className={classes.EditorForm}>
      {/* <SubHeader
        headerAlign={'left'}
        header={'Форма'}
      /> */}
      <div className={classes.EditorForm_header}>
        <div className={classes.EditorForm_header_leftside}>
          <Input
            lableText={'Название'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
          />
          <Textarea
            lableText={'Описание'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}

          />
        </div>
        <div className={classes.EditorForm_header_rightside}>
          <Dropdown
            lableText={'Кол-во раундов'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[1, 2, 3, 4, 5, 6]}
          />
          <Dropdown
            lableText={'Тем в раунде'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[1, 2, 3, 4, 5, 6]}
          />
          <Dropdown
            lableText={'Вопросов на тему'}
            hint={'Будет отбражаться в библиотеке паков и в названии комнаты'}
            valuesArr={[1, 2, 3, 4, 5, 6]}
          />

        </div>
      </div>
    </form>
  )
}

export default EditorForm
