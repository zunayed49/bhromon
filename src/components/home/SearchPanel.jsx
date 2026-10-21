import { useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowRight, CalendarDays, ChevronDown, Hotel, Luggage, MapPin, Minus, Plus, Tent, Users } from 'lucide-react'
import { destinations } from '../../data/destinations'
import { photo } from '../../data/images'
import { useOnClickOutside } from '../../hooks/useOnClickOutside'

const TABS = [
  { key: 'tours', label: 'Tour Packages', icon: Luggage },
  { key: 'destinations', label: 'Destinations', icon: MapPin },
  { key: 'hotels', label: 'Hotels', icon: Hotel },
  { key: 'activities', label: 'Activities', icon: Tent },
]

const todayISO = () => {
  const now = new Date()
  now.setMinutes(now.getMinutes() - now.getTimezoneOffset())
  return now.toISOString().slice(0, 10)
}

function Stepper({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <div>
        <p className="text-sm font-semibold text-forest-950">{label}</p>
        <p className="text-xs text-ink/50">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(value - 1)}
          disabled={value <= min}
          className="grid size-8 cursor-pointer place-items-center rounded-full border border-forest-900/15 text-forest-900 transition hover:border-forest-900 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`Fewer ${label.toLowerCase()}`}
        >
          <Minus className="size-3.5" />
        </button>
        <span className="w-5 text-center text-sm font-bold tabular-nums" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(value + 1)}
          disabled={value >= max}
          className="grid size-8 cursor-pointer place-items-center rounded-full border border-forest-900/15 text-forest-900 transition hover:border-forest-900 disabled:cursor-not-allowed disabled:opacity-30"
          aria-label={`More ${label.toLowerCase()}`}
        >
          <Plus className="size-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function SearchPanel() {
  const navigate = useNavigate()
  const [tab, setTab] = useState('tours')
  const [query, setQuery] = useState('')
  const [date, setDate] = useState('')
  const [guests, setGuests] = useState({ adults: 2, children: 0 })
  const [suggestOpen, setSuggestOpen] = useState(false)
  const [highlight, setHighlight] = useState(-1)
  const [guestsOpen, setGuestsOpen] = useState(false)

  const whereRef = useRef(null)
  const guestsRef = useRef(null)
  useOnClickOutside(whereRef, () => setSuggestOpen(false), suggestOpen)
  useOnClickOutside(guestsRef, () => setGuestsOpen(false), guestsOpen)

  const minDate = useMemo(todayISO, [])
  const totalGuests = guests.adults + guests.children

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = q
      ? destinations.filter((d) => `${d.name} ${d.region} ${d.tags}`.toLowerCase().includes(q))
      : destinations
    return list.slice(0, 6)
  }, [query])

  const pick = (destination) => {
    setQuery(destination.name)
    setSuggestOpen(false)
    setHighlight(-1)
  }

  const onWhereKeyDown = (event) => {
    if (!suggestOpen || suggestions.length === 0) return
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setHighlight((h) => (h + 1) % suggestions.length)
    } else if (event.key === 'ArrowUp') {
      event.preventDefault()
      setHighlight((h) => (h <= 0 ? suggestions.length - 1 : h - 1))
    } else if (event.key === 'Enter' && highlight >= 0) {
      event.preventDefault()
      pick(suggestions[highlight])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const params = new URLSearchParams()
    if (query.trim()) params.set('q', query.trim())

    if (tab === 'tours') {
      params.set('travellers', totalGuests)
      navigate(`/packages?${params}`)
    } else if (tab === 'destinations') {
      navigate(`/destinations?${params}`)
    } else {
      // Hotels and activities are arranged by our planners, so prefill an enquiry.
      params.set('topic', tab)
      if (date) params.set('date', date)
      params.set('travellers', totalGuests)
      navigate(`/contact?${params}`)
    }
  }

  return (
    <div className="container-x relative z-20 -mt-24">
      <div className="rounded-3xl bg-white p-4 shadow-lift sm:p-6">
        <div role="tablist" aria-label="What are you looking for?" className="no-scrollbar -mx-1 flex gap-1 overflow-x-auto border-b border-forest-900/10">
          {TABS.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={tab === key}
              onClick={() => setTab(key)}
              className={`relative flex shrink-0 cursor-pointer items-center gap-2 px-3 pt-1 pb-3.5 text-sm font-semibold transition ${
                tab === key ? 'text-forest-950' : 'text-ink/50 hover:text-forest-950'
              }`}
            >
              <Icon className="size-4" strokeWidth={1.8} />
              {label}
              <span
                className={`absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-forest-900 transition-transform ${
                  tab === key ? 'scale-x-100' : 'scale-x-0'
                }`}
              />
            </button>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_auto] lg:items-end">
          {/* Where to */}
          <div ref={whereRef} className="relative">
            <label htmlFor="search-where" className="mb-1.5 block text-xs font-semibold text-ink/60">
              Where to?
            </label>
            <div className="relative">
              <MapPin className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-forest-600" />
              <input
                id="search-where"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value)
                  setSuggestOpen(true)
                  setHighlight(-1)
                }}
                onFocus={() => setSuggestOpen(true)}
                onKeyDown={onWhereKeyDown}
                placeholder="Search destinations"
                autoComplete="off"
                role="combobox"
                aria-expanded={suggestOpen}
                aria-controls="where-suggestions"
                aria-autocomplete="list"
                className="field pl-11"
              />
            </div>
            {suggestOpen && suggestions.length > 0 && (
              <ul
                id="where-suggestions"
                role="listbox"
                className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 animate-scale-in overflow-y-auto rounded-2xl border border-forest-900/5 bg-white p-1.5 shadow-lift"
              >
                {suggestions.map((d, i) => (
                  <li key={d.slug} role="option" aria-selected={i === highlight}>
                    <button
                      type="button"
                      onClick={() => pick(d)}
                      onMouseEnter={() => setHighlight(i)}
                      className={`flex w-full cursor-pointer items-center gap-3 rounded-xl p-2 text-left ${i === highlight ? 'bg-mist' : ''}`}
                    >
                      <img src={photo(d.image, 96, '&h=96')} alt="" className="size-10 rounded-lg object-cover" />
                      <span>
                        <span className="block text-sm font-semibold text-forest-950">{d.name}</span>
                        <span className="block text-xs text-ink/50">{d.region}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Dates */}
          <div>
            <label htmlFor="search-date" className="mb-1.5 block text-xs font-semibold text-ink/60">
              Travel Date
            </label>
            <div className="relative">
              <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-forest-600" />
              <input
                id="search-date"
                type="date"
                min={minDate}
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className={`field pl-11 ${date ? '' : 'text-ink/40'}`}
              />
            </div>
          </div>

          {/* Travellers */}
          <div ref={guestsRef} className="relative">
            <span id="travellers-label" className="mb-1.5 block text-xs font-semibold text-ink/60">
              Travellers
            </span>
            <button
              type="button"
              onClick={() => setGuestsOpen((v) => !v)}
              aria-expanded={guestsOpen}
              aria-labelledby="travellers-label"
              className="field flex cursor-pointer items-center gap-3 pl-4 text-left"
            >
              <Users className="size-4 text-forest-600" />
              <span className="flex-1">
                {totalGuests} {totalGuests === 1 ? 'Traveller' : 'Travellers'}
              </span>
              <ChevronDown className={`size-4 text-ink/50 transition ${guestsOpen ? 'rotate-180' : ''}`} />
            </button>
            {guestsOpen && (
              <div className="absolute top-full right-0 left-0 z-30 mt-2 animate-scale-in rounded-2xl border border-forest-900/5 bg-white px-4 py-2 shadow-lift lg:left-auto lg:w-72">
                <Stepper
                  label="Adults"
                  hint="Age 12+"
                  value={guests.adults}
                  min={1}
                  max={12}
                  onChange={(adults) => setGuests((g) => ({ ...g, adults }))}
                />
                <Stepper
                  label="Children"
                  hint="Age 2 – 11"
                  value={guests.children}
                  min={0}
                  max={8}
                  onChange={(children) => setGuests((g) => ({ ...g, children }))}
                />
                <button type="button" onClick={() => setGuestsOpen(false)} className="btn-primary my-2 w-full">
                  Done
                </button>
              </div>
            )}
          </div>

          <button type="submit" className="btn-primary h-[46px] px-8 md:col-span-2 lg:col-span-1">
            Search <ArrowRight className="size-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
