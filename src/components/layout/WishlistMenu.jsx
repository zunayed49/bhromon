import { useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import { useWishlist } from '../../hooks/useWishlist'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'
import { getDestination } from '../../data/destinations'
import { getPackage } from '../../data/packages'
import { photo } from '../../data/images'

// Resolves stored keys ("destination:slug" / "package:id") into displayable items.
function resolve(key) {
  const [type, id] = key.split(':')
  if (type === 'destination') {
    const d = getDestination(id)
    return d && { key, title: d.name, meta: d.tags, image: d.image, to: `/destinations/${d.slug}` }
  }
  const p = getPackage(id)
  return p && { key, title: p.title, meta: `${p.days} Days • ${p.nights} Nights`, image: p.image, to: `/packages/${p.id}` }
}

export default function WishlistMenu() {
  const { saved, remove } = useWishlist()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  useOnClickOutside(ref, () => setOpen(false), open)

  const items = useMemo(() => saved.map(resolve).filter(Boolean), [saved])

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Saved trips (${items.length})`}
        className="relative grid size-10 cursor-pointer place-items-center rounded-full text-forest-950 transition hover:bg-forest-900/5"
      >
        <Heart className={`size-5 ${items.length ? 'fill-rose-500 text-rose-500' : ''}`} />
        {items.length > 0 && (
          <span className="absolute top-1 right-0.5 grid min-w-4 place-items-center rounded-full bg-forest-900 px-1 text-[10px] leading-4 font-bold text-white">
            {items.length}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute top-12 right-0 z-50 w-80 max-w-[calc(100vw-2rem)] animate-scale-in rounded-2xl border border-forest-900/5 bg-white p-2 shadow-lift">
          <p className="px-3 pt-2 pb-1 text-sm font-bold text-forest-950">Saved trips</p>
          {items.length === 0 ? (
            <p className="px-3 pt-1 pb-4 text-sm text-ink/60">
              Tap the heart on any destination or package to save it here for later.
            </p>
          ) : (
            <ul className="max-h-80 overflow-y-auto">
              {items.map((item) => (
                <li key={item.key} className="group flex items-center gap-3 rounded-xl p-2 hover:bg-mist">
                  <img src={photo(item.image, 120, '&h=120')} alt="" className="size-11 rounded-lg object-cover" />
                  <Link to={item.to} onClick={() => setOpen(false)} className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-forest-950">{item.title}</p>
                    <p className="truncate text-xs text-ink/50">{item.meta}</p>
                  </Link>
                  <button
                    type="button"
                    onClick={() => remove(item.key)}
                    className="grid size-7 cursor-pointer place-items-center rounded-full text-ink/40 hover:bg-white hover:text-rose-500"
                    aria-label={`Remove ${item.title}`}
                  >
                    <X className="size-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  )
}
