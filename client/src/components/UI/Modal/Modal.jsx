import React from 'react'
import classes from './Modal.module.scss'

function Modal({active, setActive, children}) {  
  return (
    <div className={active ? `${classes.Modal__container} ${classes.active}` : classes.Modal__container} onClick={() => setActive(false)}>
      <div className={active ? `${classes.Modal} ${classes.active}` : classes.Modal} onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  )
}

export default Modal
