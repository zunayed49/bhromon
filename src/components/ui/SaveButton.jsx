import { Heart } from 'lucide-react'
import { useWishlist } from '../../hooks/useWishlist'

export default function SaveButton({ itemKey, label, className = '' }) {
  const { isSaved, toggle } = useWishlist()
  const saved = isSaved(itemKey)
  return (
    <button
      type="button"
      onClick={(event) => {
        event.preventDefault()
        event.stopPropagation()
        toggle(itemKey)
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${label} from saved trips` : `Save ${label}`}
      className={`grid size-9 cursor-pointer place-items-center rounded-full bg-white/90 text-forest-900 shadow-sm backdrop-blur transition hover:scale-110 ${className}`}
    >
      <Heart className={`size-4 transition ${saved ? 'fill-rose-500 text-rose-500' : ''}`} />
    </button>
  )
}
