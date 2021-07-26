import {createContext} from 'react'

function noop() {}

export const AuthContext = createContext({
  token: null,
  userId: null,
  nickname: null, 
  avatarLink: null, 
  login: noop(),
  loguot: noop(),
  isAuthenticated: false
})


