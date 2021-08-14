import React, { useContext, useState, useReducer } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { useUploading } from '../../../hooks/uploading.hook'
import { useHttp } from '../../../hooks/http.hook'
import reducer from '../../../reducer/editorReducer'
import { createFinalThemes } from '../../../DataCreators/Pack'

import classes from './Editor.module.scss'

import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'
import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import Navbar from '../../UI/Navbar/Navbar'
import About from '../../UI/About/About'
import Upload from '../../UI/Upload/Upload'
import EditorForm from './EditorForm/EditorForm'

import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

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
    numberOfFinalThemes: 0,

    rounds: [],
    finalRound: {
      themes: []
    }
  }

  const Auth = useContext(AuthContext)
  const { loading, request, error } = useHttp()
  const { uploadLoading, uploadRequest, uploadError } = useUploading()
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
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_QUESTION:ANSWER',
        name: event.target.name,
        value: event.target.value,
        roundIndex: Number(event.target.id.split('-')[0]),
        themeIndex: Number(event.target.id.split('-')[1]),
        questionIndex: Number(event.target.id.split('-')[2])
      })
    },
    onChangeFinalQuestion: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_FINAL_QUESTION:CONTENT',
        name: event.target.name,
        value: event.target.value,
        themeIndex: Number(event.target.id[0])
      })
    },
    onChangeFinalAnswer: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_FINAL_QUESTION:ANSWER',
        name: event.target.name,
        value: event.target.value,
        themeIndex: Number(event.target.id[0])
      })
    },
    onChangeFinalThemeQuantity: (event) => {
      event.preventDefault()
      dispatch({
        type: 'ON_CHANGE_FINAL_THEME:QUANTITY',
        value: event.target.value,
        name: event.target.name
      })
    }
  }

  const onUploadData = (data) => {
    const parsedData = JSON.parse(data)
    const stateData = {
      ...parsedData.info,
      author: parsedData?.info?.author || Auth.nickname,
      numberOfRounds: parsedData.rounds.length || 1,
      numberOfThemes: parsedData.rounds[0].themes.length || 1,
      numberOfQuestions: parsedData.rounds[0].themes[0].questions.length || 1,
      difficulty: Number(parsedData.info.difficulty) || 0,
      discription: '',
      rounds: [...parsedData.rounds],
      finalRound: {
        FinalName: '',
        themes: [
          ...createFinalThemes(1)
        ]
      }
    }

    if (parsedData.finalRound) {
      console.log('финал есть')
      stateData.finalRound.themes = parsedData.finalRound.themes ? parsedData.finalRound.themes.map(item => {
        if (Array.isArray(item?.question?.questionContent)) {
          return {
            ...item,
            question: {
              ...item.question,
              questionContent: item.question.questionContent.reduce((acc, item) => {
                return acc + item._text
              }, '')
            }
          }
        }
        else {
          return {
            ...item
          }
        }
      }) : [{
        themeName: '',
        question: {
          questionContent: parsedData.finalRound.question.questionContent,
          price: parsedData.finalRound.question.price,
          answer: {
            text: parsedData.finalRound.question.answer._text
          }
        }
      }]
      stateData.numberOfFinalThemes = stateData.finalRound.themes.length
    }
    dispatch({
      type: 'UPLOADING_DATA',
      payload: stateData
    })
  }


  const onUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      const data = await uploadRequest('/api/upload/uploading', 'POST', formData)
      if (data) {
        onUploadData(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSave = async (e) => {
    e.preventDefault()
    try {
      const data = await request('/api/upload/save', 'POST', formData)
      if (data) {
        dispatch({
          type: 'UPLOADING_DATA',
          payload: InitialData
        })
        toast(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
      <div className={classes.Editor}>
        <ToastContainer />
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
            onSave={onSave}
          />
        </LargeColumn>
      </div>
  )
}

export default Editor
