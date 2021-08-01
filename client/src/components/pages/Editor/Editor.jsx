import React, { useContext, useEffect, useState, useReducer } from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { UploadingContext } from '../../../context/UploadingContext'
import { useUploading } from '../../../hooks/uploading.hook'
import reducer from '../../../reducer/editorReduser'


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
    info: {
      author: null,
      date: null,
      difficulty: null,
      logo: null,
      name: null,
      discription: null
    },
    rounds: []
  }

  const Auth = useContext(AuthContext)
  const { loading, request, error } = useUploading()
  const [selectedFile, setSelectedFile] = useState(false)
  const [formData, dispatch] = useReducer(reducer, InitialData)
  const [state, setState] = useState({
    name: '',
    logo: '',
    discription: '',
    numberOfRounds: 1,
    numberOfThemes: 1,
    numberOfQuestions: 1,
    difficulty: 0,
  })

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const changeHandlers = {
    name: (event) => {
      event.preventDefault()
      setState({
        name: event.target.value
      })
    },
    logo: (event) => {
      event.preventDefault()
      setState({
        logo: event.target.value
      })
    }
  }
  

  const onUploadData = (data) => {
    let parsedData = JSON.parse(data)
    dispatch({
      type: 'UPLOADING_DATA',
      payload: parsedData
    })
    setState({
      name: parsedData.info.name,
      logo: parsedData.info.logo || '',
      numberOfRounds: parsedData.rounds.length - 1 || 1,
      numberOfThemes: parsedData.rounds[0].themes.length || 1,
      numberOfQuestions: parsedData.rounds[0].themes[0].questions.length || 1,
      difficulty: Number(parsedData.info.difficulty) || 0,
    })
  }


  const onUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)
      for (let value of formData.values()) {
        console.log(value)
      }
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
            state={state}
            changeHandlers={changeHandlers}
          />
        </LargeColumn>
      </div>
    </UploadingContext.Provider>
  )
}

export default Editor
