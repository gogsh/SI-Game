import React, { useState } from 'react'
import classes from './Dropzone.module.scss'

function Dropzone(props) {



  const renderComponent = () => {
    if (!props.status) {
      return !props.error && !props.uploaded
        ? <div className={classes.DropzoneNormal} >
          {props.children}
        </div> :
        props.uploaded ?
          <div className={classes.DropzoneUploaded} >
            {props.children}
          </div> :
          <div className={classes.DropzoneError} >
            {props.children}
          </div>
    } else {
      return <div className={classes.Draged} >
        Drop!
        {/* {props.children} */}
      </div>
    }
  }

  



  return (
    renderComponent()
  )
}

export default Dropzone
