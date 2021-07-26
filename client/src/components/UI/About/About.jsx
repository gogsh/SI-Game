import React from 'react'
import classes from './About.module.scss'
import Link from '../Links/Link/Link'
import { NavLink } from 'react-router-dom'

function About(props) {
  return (
    <div className={classes.About}>
      <div className={classes.About_container}>
        <div className={classes.About_container_header}>
          <NavLink to={'/main'} className={classes.About_container_header_link}>
            {'<< Назад'}
          </NavLink>
        </div>

        <div className={classes.About_container_body}>
          <h1>
            {props.name}
          </h1>
          <span className={classes.About_container_body_discription}>Рекомендации:</span>
          <span className={classes.About_container_body_text}>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod</span>
          <span className={classes.About_container_body_text}>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod</span>
          <span className={classes.About_container_body_text}>et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commod</span>
        </div>
      </div>



      {props.children}
    </div>
  )
}

export default About

