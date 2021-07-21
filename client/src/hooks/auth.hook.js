import { useState, useCallback, useEffect } from "react"
import { chatSocket } from "../socket"


const storageName = 'userData'

export const useAuth = () => {
  const [token, setToken] = useState(null)
  const [userId, setUserId] = useState(null)
  const [nickname, setNickname] = useState(null)
  const [avatarLink, setAvatarLink] = useState(null)


  const login = useCallback((jwtToken, id, expirationDate, nickname, avatarLink) => {
    setToken(jwtToken)
    setUserId(id)
    setNickname(nickname)
    setAvatarLink(avatarLink)
    localStorage.setItem(storageName, JSON.stringify({
      userId: id, token: jwtToken, expirationDate: expirationDate, nickname, avatarLink  // expirationDate
    }))
  }, [])


  const logout = useCallback(() => {
    setToken(null)
    setUserId(null)
    setNickname(null)
    setAvatarLink(null)
    localStorage.removeItem(storageName)
  }, [])

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))
    let isExpire
    if (data) {
      isExpire = new Date(`${data.expirationDate}`) < new Date()
    }
    if (data && data.token && !isExpire) {   // Проверка на expirationDate
      login(data.token, data.userId, data.expirationDate, data.nickname, data.avatarLink)
    } else { logout() }
  }, [login, logout])

  return { login, logout, token, userId, nickname, avatarLink}
}