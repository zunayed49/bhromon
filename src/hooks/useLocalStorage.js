import { useEffect, useState } from 'react'

// useState that survives reloads. Storage can be unavailable (private mode, blocked
// site data), so every access is guarded and the hook falls back to in-memory state.
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored !== null ? JSON.parse(stored) : initialValue
    } catch {
      return initialValue
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value))
    } catch {
      /* storage unavailable: keep the in-memory value */
    }
  }, [key, value])

  return [value, setValue]
}
