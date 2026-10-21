import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUp } from 'lucide-react'
import { useScrolled } from '../../hooks/useScrolled'

// Resets scroll on navigation (or jumps to #hash targets) and shows a back-to-top button.
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const showButton = useScrolled(700)

  useEffect(() => {
    if (!hash) {
      window.scrollTo({ top: 0, behavior: 'instant' })
      return
    }
    // Wait a frame so the new route's content is in the DOM before scrolling to it.
    const frame = requestAnimationFrame(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
    return () => cancelAnimationFrame(frame)
  }, [pathname, hash])

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className={`fixed right-5 bottom-5 z-40 grid size-11 cursor-pointer place-items-center rounded-full bg-forest-900 text-white shadow-lift transition duration-300 hover:bg-forest-700 ${
        showButton ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
      }`}
    >
      <ArrowUp className="size-5" />
    </button>
  )
}
