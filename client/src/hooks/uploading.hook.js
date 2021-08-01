import { useState, useCallback, useEffect } from "react"

export const useUploading = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const request = useCallback(async (url, method = 'GET', body = null, headers = undefined) => {
    setLoading(true)
    try {   

      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      setLoading(false)
      // console.log(JSON.parse(data))
      return data

    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = () => setError(null)

  return { loading, request, error, clearError }
}
 