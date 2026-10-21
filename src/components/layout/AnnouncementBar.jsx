import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles, X } from 'lucide-react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useLocalStorage('bhromon:winter-promo-dismissed', false)
  if (dismissed) return null

  return (
    <div className="relative bg-forest-950 text-white">
      <div className="container-x flex min-h-10 items-center justify-center gap-3 py-2 pr-10 text-center text-xs sm:text-[13px]">
        <Sparkles className="hidden size-4 shrink-0 text-leaf-300 sm:block" aria-hidden="true" />
        <p>
          <span className="font-semibold">Winter season is here:</span>{' '}
          <span className="text-white/80">up to 20% off Sajek &amp; Sundarbans tours until 31 December</span>
        </p>
        <Link
          to="/packages"
          className="hidden shrink-0 items-center gap-1 rounded-full bg-white px-3 py-1 text-[11px] font-bold text-forest-950 transition hover:bg-leaf-300 sm:inline-flex"
        >
          View Deals <ArrowRight className="size-3" />
        </Link>
      </div>
      <button
        type="button"
        onClick={() => setDismissed(true)}
        className="absolute top-1/2 right-2 grid size-7 -translate-y-1/2 cursor-pointer place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white sm:right-4"
        aria-label="Dismiss announcement"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}
