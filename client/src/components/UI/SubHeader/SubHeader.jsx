import React from 'react'
import classes from './SubHeader.module.scss'

function SubHeader(props) {

  return (
    <div className={classes.SubHeader}>
      {
        (() => {
          if(props.headerAlign === 'left') {
            return (
              <div className = {classes.left}>
                <span>{props.header}</span>
                {props.children}
              </div>
            )
          } else {
            return (
              <div className = {classes.right}>                
                {props.children}
                <span>{props.header}</span>
              </div>
            )
          }
        })()
      }    

    </div>
  )
}

export default SubHeader
