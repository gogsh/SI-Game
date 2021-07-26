import React, { useContext, useEffect, useState, useRef} from 'react'
import { AuthContext } from '../../../context/AuthContext'
import { EditorContext } from '../../../context/EditorContext'
import { useEditor } from '../../../hooks/editor.hook'
import { useHttp } from '../../../hooks/http.hook'


import classes from './Editor.module.scss'


import LargeColumn from '../../hoc/Layout/columns/LargeColumn'
import SmallColumn from '../../hoc/Layout/columns/SmallColumn'
import SmallProfile from '../../UI/profile/SmallProfile/SmallProfile'
import Navbar from '../../UI/Navbar/Navbar'
import About from '../../UI/About/About'
import Upload from '../../UI/Upload/Upload'



function Editor() {
  const Auth = useContext(AuthContext)  
  const [isUploaded, setUploaded] = useState(false)
  const { loading, request, error } = useEditor()
  const [isDropzoneFocused, setDropzoneFocuse] = useState(false)

  const [selectedFile, setSelectedFile] = useState(false)
  const [isSelected, setIsSelected] = useState(false);
  
  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

  const onUpload = async () => {
    try {
      const formData = new FormData()
      formData.append('file', selectedFile)    
      for (let value of formData.values()) {
        console.log(value)
       }  
      const data = await request('/api/upload/uploading', 'POST', formData)
      if(data) {
        setUploaded(true)
      }
    } catch (error) {
      console.log(error)
    }
  }

  function dropHandler (event) {
    event.preventDefault()
    event.stopPropagation()
    setDropzoneFocuse(false)
  }

  function dragEnterHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDropzoneFocuse(true)
  }

  function dragLeaveHandler(event) {
    event.preventDefault()
    event.stopPropagation()
    setDropzoneFocuse(false)
  }
  

  return (
    <EditorContext.Provider value = {[]}>
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
              error = {error}
              loading = {loading}
              isUploaded = {isUploaded}
              isDropzoneFocused = {isDropzoneFocused}
              dragEnterHandler = {dragEnterHandler}
              dragLeaveHandler = {dragLeaveHandler}
              dropHandler = {dropHandler}
              onUpload = {onUpload}

              changeHandler={changeHandler}
            />
          </About>

        </SmallColumn>

        <LargeColumn>
          <Navbar />
        </LargeColumn>
      </div>
    </EditorContext.Provider>
  )
}

export default Editor
