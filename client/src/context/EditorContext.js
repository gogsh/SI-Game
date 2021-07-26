import {createContext} from 'react'

export const EditorContext = createContext({
  name: null,
  id: null,
  difficulty: null,
  autor: null,
  rounds: null,
})