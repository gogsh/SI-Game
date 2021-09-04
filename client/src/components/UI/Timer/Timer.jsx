import React, {useEffect} from 'react'
import classes from './Timer.module.scss'

function Timer({ time }) {  
  useEffect(() => {
    document.getElementById('timer').animate([
      {width: '0%'},
      {width: '100%'}
    ], {
      duration: time,
      iterations: Infinity
    });
  })
  return (
    <div className={classes.Timer_back}>
      <div className={classes.Timer} id = {'timer'}>        
      </div>
    </div >
  )
}

export default Timer


