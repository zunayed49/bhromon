import { useEffect, useState } from 'react'

// Animates from 0 to `end` once `start` becomes true.
export function useCountUp(end, { start = true, duration = 1600 } = {}) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!start) return
    let frame
    const began = performance.now()
    const tick = (now) => {
      const progress = Math.min((now - began) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(end * eased))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [end, start, duration])

  return value
}
