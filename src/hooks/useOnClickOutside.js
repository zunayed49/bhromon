import { useEffect, useRef } from 'react'

// Calls `handler` on a pointer press outside `ref`, or when Escape is pressed.
export function useOnClickOutside(ref, handler, enabled = true) {
  const handlerRef = useRef(handler)
  useEffect(() => {
    handlerRef.current = handler
  }, [handler])

  useEffect(() => {
    if (!enabled) return
    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handlerRef.current(event)
    }
    const onKey = (event) => {
      if (event.key === 'Escape') handlerRef.current(event)
    }
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [ref, enabled])
}
