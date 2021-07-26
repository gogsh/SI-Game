import React, { useState, useEffect } from 'react'
import classes from './Upload.module.scss'
import Icon from '../../UI/Icon/Icon'
import Button from '../buttons/Button/Button'
import Loader from '../Loader/Loader'
import Dropzone from '../Dropzone/Dropzone'



function Upload(props) {



  const renderComponent = () => {
    if (props.error) {
      return <div className={classes.UploadError}>
        <Icon
          name='errorIcon'
          color='#E04F5F'
          size='60'
        />
        <label htmlFor="file"><strong>возникла ошибка </strong><span>попробуйте еще раз</span></label>
        <input className={classes.Upload_input} type="file" name="file" />
        <Button
          type={'small-error'}
          text={'Загрузить другой'}
          TYPEe={'submit'}
        />
      </div>
    }
    if (props.loading) {
      return <div className={classes.Upload}>
        <Loader></Loader>
      </div>
    }
    if (props.isUploaded) {
      return <div className={classes.Upload_succes}>
        <h1><strong>Пак успешно загружен!</strong></h1>
        <span>Вы можете отредактировать и сохранить его</span>
        <label htmlFor="file">или <strong>загрузить другой</strong></label>
        <input className={classes.Upload_input} type="file" name="file" />
        <Button
          type={'small-secondary-success'}
          text={'Загрузить'}
          TYPEe={'submit'}
        />
      </div>
    }
    return <div className={classes.Upload}>
      <Icon
        name='uploadIcon'
        color='#D0DDF3'
        size='70'
      />
      <input className={classes.Upload_input} type="file" name="file" />
      <label htmlFor="file"><strong>Выберите файл</strong><span> или перетащите сюда</span></label>
      <Button
        type={'small-primary'}
        text={'Загрузить'}
        TYPEe={'submit'}
      />
    </div>
  }


  return (
    <div>
      <input type="file" name="file" onChange={props.changeHandler} />
      <div>
        <button onClick={props.onUpload}>Submit</button>
      </div>
    </div>

    // <form name={'test'} ref={props.value} onSubmit={props.onUpload} onDrop={props.dropHandler} onDragEnter={props.dragEnterHandler} onDragLeave={props.dragLeaveHandler} onDragOver={props.dragEnterHandler} className={classes.Form}>
    //   <input type="file" />
    //   <Dropzone
    //     error={props.error}
    //     uploaded={props.isUploaded}
    //     status={props.isDropzoneFocused}
    //   >
    //     {renderComponent()}
    //   </Dropzone>
    //   <input type="submit" />
    // </form>
  )
}

export default Upload
