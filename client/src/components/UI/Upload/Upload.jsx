import React, { useState, useEffect } from 'react'
import classes from './Upload.module.scss'




function Upload(props) {
  return (
    <div>
      <input type="file" name="file" onChange={props.changeHandler} />
      <div>
        <button onClick={props.onUpload}>Submit</button>
      </div>
    </div>
  )
}

export default Upload
