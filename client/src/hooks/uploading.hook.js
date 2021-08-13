import { useState, useCallback } from "react"

export const useUploading = () => {
  const [uploadLoading, setLoading] = useState(false)
  const [uploadError, setError] = useState(null)

  const uploadRequest = useCallback(async (url, method = 'GET', body = null, headers = undefined) => {
    setLoading(true)
    try {
      const response = await fetch(url, { method, body, headers })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Что-то пошло не так')
      }
      setLoading(false)
      return data
    } catch (e) {
      setLoading(false)
      setError(e.message)
      throw e
    }
  }, [])

  const clearError = () => setError(null)

  return { uploadLoading, uploadRequest, uploadError, clearError }
}
