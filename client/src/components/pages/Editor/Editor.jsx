import React, { useContext, useEffect, useState, useReducer } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { UploadingContext } from '../../../context/UploadingContext'
import { useUploading } from '../../../hooks/uploading.hook'
import reducer from '../../../reducer/editorReducer'


import classes from './Editor.module.scss'

import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'
import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import Navbar from '../../UI/Navbar/Navbar'
import About from '../../UI/About/About'
import Upload from '../../UI/Upload/Upload'
import EditorForm from './EditorForm/EditorForm'



function Editor() {
  const InitialData = {
    author: '',
    date: '',
    difficulty: '',
    logo: '',
    name: '',
    discription: '',

    numberOfRounds: 0,
    numberOfThemes: 0,
    numberOfQuestions: 0,

    rounds: [],
  }

  const Auth = useContext(AuthContext)
  const { loading, request, error } = useUploading()
  const [selectedFile, setSelectedFile] = useState(false)
  const [formData, dispatch] = useReducer(reducer, InitialData)

  console.log(formData)


  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const changeHandlers = {
    onChangeDropdown: (event) => {
      event.preventDefault()
      console.log(event.target.name, event.target.value)
      dispatch({
        type: 'ON_CHANGE',
        name: event.target.name,
        value: Number(event.target.value)
      })
    },
    onChangeInput: (event) => {
      event.preventDefault()
      console.log(event.target.name, event.target.value)
      dispatch({
        type: 'ON_CHANGE',
        name: event.target.name,
        value: event.target.value
      })
    },
    onChangeRoundQuantity: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_ROUND:QUANTITY',
        name: event.target.name,
        value: Number(event.target.value),
      })
    },
    onChangeThemeQuantity: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_THEME:QUANTITY',
        name: event.target.name,
        value: Number(event.target.value),
      })
    },
    onChangeQuestionQuantity: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_QUESTION:QUANTITY',
        name: event.target.name,
        value: Number(event.target.value),
      })
    },
    onChangeRoundName: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_ROUND:NAME',
        name: event.target.name,
        value: event.target.value,
        roundIndex: Number(event.target.id.split('-')[0])
      })
    },
    onChangeThemeName: (event) => {
      event.preventDefault()
      console.log(event.target.id)
      dispatch({
        type: 'ON_CHANGE_THEME:NAME',
        name: event.target.name,
        value: event.target.value,
        roundIndex: Number(event.target.id.split('-')[0]),
        themeIndex: Number(event.target.id.split('-')[1])
      })
    },
    onChangeQuestionContent: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_QUESTION:CONTENT',
        name: event.target.name,
        value: event.target.value,
        roundIndex: Number(event.target.id.split('-')[0]),
        themeIndex: Number(event.target.id.split('-')[1]),
        questionIndex: Number(event.target.id.split('-')[2])
      })
    },
    onChangeQuestionAnswer: (event) => {
      console.log(event.target.name, event.target.id)
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_QUESTION:ANSWER',
        name: event.target.name,
        value: event.target.value,
        roundIndex: Number(event.target.id.split('-')[0]),
        themeIndex: Number(event.target.id.split('-')[1]),
        questionIndex: Number(event.target.id.split('-')[2])
      })
    }
  }


  const onUploadData = (data) => {
    const parsedData = JSON.parse(data)
    const stateData = {
      ...parsedData.info,
      author: parsedData?.info?.author || Auth.nickname,
      numberOfRounds: parsedData.rounds.length - 1 || 1,
      numberOfThemes: parsedData.rounds[0].themes.length || 1,
      numberOfQuestions: parsedData.rounds[0].themes[0].questions.length || 1,
      difficulty: Number(parsedData.info.difficulty) || 0,
      discription: '',
      rounds: [...parsedData.rounds],
      finalRound: parsedData.rounds[parsedData.rounds.length - 1] || {}
    }
    // TODO: на стороне сервера привести в порядок данные
    stateData.rounds.pop()
    dispatch({
      type: 'UPLOADING_DATA',
      payload: stateData
    })

  }


  const onUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const data = await request('/api/upload/uploading', 'POST', formData)
      if (data) {
        onUploadData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <UploadingContext.Provider value={[]}>
      <div className={classes.Editor}>
        <SmallColumn>
          <SmallProfile
            userName={Auth.nickname}
            avatar={Auth.avatarLink}
          />
          <About
            name={'Редактор паков'}
          >
            <h1 className={classes.heading}>Загрузить пак из SIGame</h1>
            <Upload
              onUpload={onUpload}
              changeHandler={changeHandler}
            />
          </About>

        </SmallColumn>

        <LargeColumn>
          <Navbar />
          <EditorForm
            state={formData}
            changeHandlers={changeHandlers}
          />
        </LargeColumn>
      </div>
    </UploadingContext.Provider>
  )
}

export default Editor
