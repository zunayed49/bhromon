import { useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Luggage, MapPin, Search, X } from 'lucide-react'
import { destinations } from '../../data/destinations'
import { packages } from '../../data/packages'
import { guides } from '../../data/content'
import { photo } from '../../data/images'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

const ALL_RESULTS = [
  ...destinations.map((d) => ({
    key: `d-${d.slug}`,
    to: `/destinations/${d.slug}`,
    title: d.name,
    meta: d.tags,
    image: d.image,
    type: 'Destination',
    icon: MapPin,
    haystack: `${d.name} ${d.region} ${d.tags} ${d.category}`.toLowerCase(),
  })),
  ...packages.map((p) => ({
    key: `p-${p.id}`,
    to: `/packages/${p.id}`,
    title: p.title,
    meta: `${p.days} Days • ${p.nights} Nights`,
    image: p.image,
    type: 'Package',
    icon: Luggage,
    haystack: `${p.title} ${p.destinations.join(' ')} ${p.badge}`.toLowerCase(),
  })),
  ...guides.map((g) => ({
    key: `g-${g.slug}`,
    to: `/guides/${g.slug}`,
    title: g.title,
    meta: g.category,
    image: g.image,
    type: 'Guide',
    icon: BookOpen,
    haystack: `${g.title} ${g.category}`.toLowerCase(),
  })),
]

const SUGGESTIONS = ['Sajek', 'Sundarbans', "Cox's Bazar", 'Tea', 'Heritage']

export default function SearchOverlay({ onClose }) {
  const [query, setQuery] = useState('')
  const inputRef = useRef(null)
  const navigate = useNavigate()
  useLockBodyScroll(true)

  useEffect(() => {
    inputRef.current?.focus()
    const onKey = (event) => event.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return []
    return ALL_RESULTS.filter((r) => r.haystack.includes(q)).slice(0, 7)
  }, [query])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (results[0]) navigate(results[0].to)
    else if (query.trim()) navigate(`/destinations?q=${encodeURIComponent(query.trim())}`)
    onClose()
  }

  return createPortal(
    <div className="fixed inset-0 z-[60] flex items-start justify-center px-4 pt-[12vh]" role="dialog" aria-modal="true" aria-label="Search">
      <button type="button" className="absolute inset-0 animate-fade-in cursor-default bg-forest-950/60 backdrop-blur-sm" onClick={onClose} aria-label="Close search" />
      <div className="relative w-full max-w-xl animate-scale-in overflow-hidden rounded-2xl bg-white shadow-lift">
        <form onSubmit={handleSubmit} className="flex items-center gap-3 border-b border-forest-900/10 px-5">
          <Search className="size-5 text-forest-600" aria-hidden="true" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search destinations, tours or guides…"
            className="h-16 flex-1 bg-transparent text-base outline-none placeholder:text-ink/40"
            aria-label="Search destinations, tours or guides"
          />
          <button type="button" onClick={onClose} className="grid size-8 cursor-pointer place-items-center rounded-full text-ink/50 hover:bg-mist" aria-label="Close search">
            <X className="size-4" />
          </button>
        </form>

        <div className="max-h-[55vh] overflow-y-auto p-2">
          {!query.trim() && (
            <div className="p-3">
              <p className="text-xs font-semibold tracking-wide text-ink/50 uppercase">Popular searches</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setQuery(s)}
                    className="cursor-pointer rounded-full bg-mist px-3 py-1.5 text-sm font-medium text-forest-900 hover:bg-leaf-200"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {query.trim() && results.length === 0 && (
            <p className="px-3 py-8 text-center text-sm text-ink/60">
              No matches for &ldquo;{query}&rdquo;. Try &ldquo;beach&rdquo; or &ldquo;hills&rdquo;.
            </p>
          )}

          <ul>
            {results.map(({ key, to, title, meta, image, type, icon: Icon }) => (
              <li key={key}>
                <Link to={to} onClick={onClose} className="group flex items-center gap-3 rounded-xl p-2.5 hover:bg-mist">
                  <img src={photo(image, 120, '&h=120')} alt="" className="size-12 rounded-lg object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-forest-950">{title}</p>
                    <p className="flex items-center gap-1 text-xs text-ink/50">
                      <Icon className="size-3" /> {type} · {meta}
                    </p>
                  </div>
                  <ArrowRight className="size-4 text-ink/30 transition group-hover:translate-x-0.5 group-hover:text-forest-900" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>,
    document.body,
  )
}
