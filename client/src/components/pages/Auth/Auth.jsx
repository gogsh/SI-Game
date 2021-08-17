import React, { useState, useContext } from 'react'
import classes from './Auth.module.scss'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'
import InputLarge from '../../UI/inputs/InputLarge/InputLarge'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'
import Link from '../../UI/Links/Link/Link'
import { chatSocket } from '../../../socket'

//toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Auth() {
  const auth = useContext(AuthContext)
  const { loading, request, error } = useHttp()
  const [form, setForm] = useState({
    email: '', password: '', nickname: '', avatarLink: ''
  })
  const [isRegistration, setRegistration] = useState(false)

  const isRegistraitionHandler = event => {
    setRegistration(!isRegistration)
  }


  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', { ...form })
      if (data) {
        toast(data.message)
        setRegistration(!isRegistration)
      }
    } catch (e) {
      if (error) {
        toast.error(error)
      }
    }
  }

  const loginHandler = async () => {
    try {
      const data = await request('/api/auth/login', 'POST', { ...form })
      // 12h token
      let date = new Date(new Date().getTime() + 43200 * 1000)
      auth.login(data.token, data.userId, date, data.nickname, data.avatarLink)
      
      chatSocket.emit('CHAT:JOIN', {nickname: data.nickname, id: 'main'})

    } catch (e) {
      if (error) {
        toast.error(error)
      }
    }
  }

  return (
    <div className={classes.Auth}>
      <ToastContainer></ToastContainer>
      <div className={classes.container}>
        {
          !isRegistration
            ? <div className={classes.inputs_container}>
              <InputLarge
                placeholder={'email'}
                type={'text'}
                name={'email'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <InputLarge
                placeholder={'password'}
                type={'password'}
                name={'password'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <PrimaryButton
                text={'Войти'}
                onClick={loginHandler}
                disabled={loading}
              />
              <Link
              text = {'Создать аккаунт'}
              onClick = {isRegistraitionHandler}
              />
            </div> // регистрация
            : <div className={classes.inputs_container}>
              <InputLarge
                placeholder={'email'}
                type={'text'}
                name={'email'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <InputLarge
                placeholder={'password'}
                type={'password'}
                name={'password'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <InputLarge
                placeholder={'nickname'}
                type={'text'}
                name={'nickname'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <InputLarge
                placeholder={'Ссылка на аватарку'}
                type={'text'}
                name={'avatarLink'}
                onChange={event => changeHandler(event)}
                disabled={loading}

              />
              <PrimaryButton
                text={'Зарегистрироваться'}
                onClick={registerHandler}
                disabled={loading}
              />
              <Link
              text = {'У меня уже есть аккаунт'}
              onClick = {isRegistraitionHandler}
              />
            </div>
        }
      </div>

    </div>

  )
}

export default Auth


