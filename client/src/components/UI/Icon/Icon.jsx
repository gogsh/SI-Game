import React from 'react'
import classes from './Icon.module.scss'
import Icons from '../../../Icons/Icons.svg'


function Icon({ name, color, size, className, pointerEvents}) {
  return (
    <div style={{pointerEvents: pointerEvents || 'auto'}}>
      <svg className={`icon ${name} ${className} ${classes.icon}`} fill={color} stroke={color} width={size} height={size} style={{pointerEvents: pointerEvents}}>
        <use xlinkHref={`${Icons}#${name}`} style={{pointerEvents: pointerEvents}} />
      </svg>
    </div>
  )
}

export default Icon

