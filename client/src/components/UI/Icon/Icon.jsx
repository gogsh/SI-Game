import React from 'react'
import classes from './Icon.module.scss'
import Icons from '../../../Icons/Icons.svg'


function Icon({ name, color, size, className }) {
  return (
    <div>
      <svg className={`icon ${name} ${className} ${classes.icon}`} fill={color} stroke={color} width={size} height={size}>
        <use xlinkHref={`${Icons}#${name}`} />
      </svg>
    </div>
  )
}

export default Icon

