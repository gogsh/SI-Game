import React from 'react'
import classes from './PackSelectionCard.module.scss'

function PackSelectionCard({ data }) {
  return (
    <div className={classes.PackSelectionCard}>
      <div className={classes.PackSelectionCard_leftSide}>
        <div><img src={data.logo} alt={''}/></div>
      </div>
      <div className={classes.PackSelectionCard_rightSide}>
        <h1>{data.packName}</h1>
        <div><span>Раундов</span><span>{data.numberOfRounds}</span></div>
        <div><span>Сложность</span><span>{data.difficulty}</span></div>
      </div>
    </div>
  )
}

export default PackSelectionCard
