import React, { useState, useContext } from 'react'
import classes from './Auth.module.scss'
import PrimaryButton from '../../UI/buttons/PrimaryButton/PrimaryButtonLarge'
import SecondaryButton from '../../UI/buttons/SecondaryButton/SecondaryButtonLarge'
import ImputLarge from '../../UI/inputs/InputLarge/ImputLarge'
import { useHttp } from '../../../hooks/http.hook'
import { AuthContext } from '../../../context/AuthContext'

//toast
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// TODO: Расширить регистрацию, прикрутить аватар, никнем и проч.
function Auth() {
  const auth = useContext(AuthContext)
  const { loading, request, error } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  
  const changeHandler = event => {
    setForm({ ...form, [event.target.name]: event.target.value })
  }


  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      if(data) {
        toast(data.message)
      }
    } catch (e) { 
      if(error) {
        toast.error(error)
      }
     }
  }

  const loginHandler = async (params) => {
    try {
      const data = await request('/api/auth/login', 'POST', {...form})
      auth.login(data.token, data.userId)
    } catch (e) {
      if(error) {
        toast.error(error)        
      }
    }
  }

  return (
    <div className={classes.Auth}>
      <ToastContainer></ToastContainer>      
      <div className={classes.container}>
        <div className={classes.inputs_container}>
          <ImputLarge
            placeholder={'email'}
            type={'text'}
            name={'email'}
            onChange={event => changeHandler(event)}
            disabled={loading}
            
          />
          <ImputLarge
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
          <SecondaryButton
            text='Зарегистрироваться'
            onClick={registerHandler}
            disabled={loading}
          />
        </div>
      </div>
      
    </div>
    
  )
}

export default Auth


