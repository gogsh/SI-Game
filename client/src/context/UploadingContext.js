import {createContext} from 'react'

function noop() {}

export const UploadingContext = createContext({
  loading: null,

})