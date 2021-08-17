import React from 'react'
import classes from './Modal.module.scss'

function Modal({ active, setActive, closeIconPosition, children }) {
  return (
    <div className={active ? `${classes.Modal__container} ${classes.active}` : classes.Modal__container} onClick={() => setActive(false)}>
      <div className={active ? `${classes.Modal} ${classes.active}` : classes.Modal} onClick={e => e.stopPropagation()}>
        <div className={classes.icon} onClick={() => setActive(false)} style={{ left: closeIconPosition || '0%' }} >
          <svg
            style={{ cursor: 'pointer', width: '20px', height: '20px' }}
            xmlns="http://www.w3.org/2000/svg">
            <path d="M19 1L1 19M1 1L19 19" stroke="#A0A0A0" />
          </svg>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Modal
