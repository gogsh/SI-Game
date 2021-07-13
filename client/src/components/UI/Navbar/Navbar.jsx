import React, { useContext } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { AuthContext } from '../../../context/AuthContext'
import classes from './Navbar.module.scss'





function Navbar() {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const logoutHandler = event => {
    event.preventDefault()
    auth.logout()
    history.push('/')
  }
  return (
    <nav className={classes.Navbar}>
      <div className={classes.container}>
        <ul>
          <li> <NavLink to='/editor' className={classes.link} >Создать пак</NavLink> </li>
          <li> <NavLink to='/library' className={classes.link} >Библиотека паков</NavLink> </li>
          <li> <a href='/' onClick={logoutHandler} className={classes.link} >Выйти</a> </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
