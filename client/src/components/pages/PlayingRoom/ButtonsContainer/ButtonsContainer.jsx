import React from 'react'
import classes from './ButtonsContainer.module.scss'
import Icon from '../../../UI/Icon/Icon'

function ButtonsContainer({ isLeader, clickHandlers, pause }) {
  return (
    <div className={classes.ButtonsContainer}>
      {
        isLeader ?
          <>
            {
              !pause
                ? <button className={classes.IconicButton} style={{ marginRight: '20px' }}>
                  <Icon
                    name={'pause'}
                    size={22}
                    pointerEvents={'none'}
                  />
                </button>
                : <button className={classes.IconicButton}>
                  <Icon
                    name={'play'}
                    size={22}
                    pointerEvents={'none'}
                  />
                </button>
            }
            <button className={classes.IconicButton}>
              <Icon
                name={'skip'}
                size={22}
                pointerEvents={'none'}
              />
            </button>
          </> :
          <>
            {
              !pause
                ? <button className={classes.IconicButton} style={{ marginRight: '20px' }}>
                  <Icon
                    name={'pause'}
                    size={22}
                    pointerEvents={'none'}
                  />
                </button>
                : <button className={classes.IconicButton}>
                  <Icon
                    name={'play'}
                    size={22}
                    pointerEvents={'none'}
                  />
                </button>
            }
            <button className={classes.Button}> Ответить </button>
          </>
      }
    </div>
  )
}

export default ButtonsContainer
