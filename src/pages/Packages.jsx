import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ChevronDown, Search, SlidersHorizontal, Users, X } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import PackageCard from '../components/cards/PackageCard'
import Reveal from '../components/ui/Reveal'
import { packages } from '../data/packages'
import { getDestination } from '../data/destinations'
import { IMG } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const DURATIONS = [
  { key: 'any', label: 'Any length', test: () => true },
  { key: 'short', label: 'Weekend (1–3 days)', test: (d) => d <= 3 },
  { key: 'medium', label: '4–6 days', test: (d) => d >= 4 && d <= 6 },
  { key: 'long', label: '7+ days', test: (d) => d >= 7 },
]

const SORTS = {
  recommended: { label: 'Recommended', fn: () => 0 },
  'price-asc': { label: 'Price: low to high', fn: (a, b) => a.price - b.price },
  'price-desc': { label: 'Price: high to low', fn: (a, b) => b.price - a.price },
  rating: { label: 'Top rated', fn: (a, b) => b.rating - a.rating },
  duration: { label: 'Shortest first', fn: (a, b) => a.days - b.days },
}

// Pre-compute a lowercase search string per package, including its destination names.
const SEARCHABLE = packages.map((p) => ({
  pkg: p,
  haystack: [p.title, p.badge, p.summary, ...p.destinations.map((slug) => getDestination(slug)?.name ?? slug)]
    .join(' ')
    .toLowerCase(),
}))

export default function Packages() {
  useDocumentTitle('Tour Packages')
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const duration = params.get('duration') ?? 'any'
  const sort = SORTS[params.get('sort')] ? params.get('sort') : 'recommended'
  const travellers = Number(params.get('travellers')) || 0

  const update = (key, value, fallback) => {
    const nextParams = new URLSearchParams(params)
    if (!value || value === fallback) nextParams.delete(key)
    else nextParams.set(key, value)
    setParams(nextParams, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const durationTest = DURATIONS.find((d) => d.key === duration)?.test ?? (() => true)
    return SEARCHABLE.filter(({ pkg, haystack }) => durationTest(pkg.days) && (!q || haystack.includes(q)))
      .map(({ pkg }) => pkg)
      .sort(SORTS[sort].fn)
  }, [query, duration, sort])

  const cardSearch = travellers ? `?travellers=${travellers}` : ''
  const hasFilters = query || duration !== 'any' || sort !== 'recommended'

  return (
    <>
      <PageHeader
        image={IMG.greenValley}
        eyebrow="Tour Packages"
        title="Trips Crafted by Locals"
        subtitle="Small-group and private tours with transport, stays, permits and guides all taken care of."
        crumbs={[{ label: 'Tour Packages' }]}
      />

      <section className="container-x py-12">
        <div className="grid gap-3 rounded-3xl bg-white p-4 shadow-card md:grid-cols-[1.4fr_1fr_1fr] md:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-forest-600" />
            <input
              type="search"
              value={query}
              onChange={(event) => update('q', event.target.value)}
              placeholder="Search tours or destinations"
              aria-label="Search tour packages"
              className="field pl-11"
            />
          </div>
          <label className="relative">
            <span className="sr-only">Trip length</span>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/40" />
            <select value={duration} onChange={(event) => update('duration', event.target.value, 'any')} className="field cursor-pointer appearance-none pr-10">
              {DURATIONS.map((d) => (
                <option key={d.key} value={d.key}>
                  {d.label}
                </option>
              ))}
            </select>
          </label>
          <label className="relative">
            <span className="sr-only">Sort by</span>
            <SlidersHorizontal className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/40" />
            <select value={sort} onChange={(event) => update('sort', event.target.value, 'recommended')} className="field cursor-pointer appearance-none pr-10">
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-ink/60" aria-live="polite">
          <p>
            <strong className="text-forest-950">{results.length}</strong> {results.length === 1 ? 'package' : 'packages'} found
            {query && <> for &ldquo;{query}&rdquo;</>}
          </p>
          {travellers > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-leaf-100 px-3 py-1 text-xs font-semibold text-forest-900">
              <Users className="size-3.5" /> Planning for {travellers} {travellers === 1 ? 'traveller' : 'travellers'}
            </span>
          )}
          {hasFilters && (
            <button
              type="button"
              onClick={() => setParams(travellers ? { travellers: String(travellers) } : {}, { replace: true })}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-semibold text-forest-900 underline-offset-4 hover:underline"
            >
              <X className="size-3.5" /> Clear filters
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((pkg, i) => (
              <Reveal key={pkg.id} delay={(i % 4) * 60}>
                <PackageCard pkg={pkg} search={cardSearch} />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-white px-6 py-16 text-center shadow-card">
            <p className="text-lg font-bold text-forest-950">No packages match your search</p>
            <p className="mt-2 text-sm text-ink/60">
              Our planners can build a custom trip for you. Try another keyword or clear the filters.
            </p>
          </div>
        )}
      </section>
    </>
  )
}
