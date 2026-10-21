import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import DestinationCard from '../components/cards/DestinationCard'
import Reveal from '../components/ui/Reveal'
import { CATEGORIES, destinations } from '../data/destinations'
import { IMG } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

export default function Destinations() {
  useDocumentTitle('Destinations')
  // Filters live in the URL, so results are shareable and survive back/forward navigation.
  const [params, setParams] = useSearchParams()
  const query = params.get('q') ?? ''
  const category = params.get('category') ?? 'All'

  const updateParam = (key, value, fallback = '') => {
    const nextParams = new URLSearchParams(params)
    if (!value || value === fallback) nextParams.delete(key)
    else nextParams.set(key, value)
    setParams(nextParams, { replace: true })
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return destinations.filter((d) => {
      const matchesCategory = category === 'All' || d.category === category
      const matchesQuery = !q || `${d.name} ${d.region} ${d.tags} ${d.tagline}`.toLowerCase().includes(q)
      return matchesCategory && matchesQuery
    })
  }, [query, category])

  return (
    <>
      <PageHeader
        image={IMG.hillView}
        eyebrow="Explore Bangladesh"
        title="Destinations"
        subtitle="From the world's longest sea beach to cloud-wrapped hills and UNESCO mangroves, find the place that calls you."
        crumbs={[{ label: 'Destinations' }]}
      />

      <section className="container-x py-12">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0" role="group" aria-label="Filter by category">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => updateParam('category', c, 'All')}
                aria-pressed={category === c}
                className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                  category === c ? 'bg-forest-900 text-white' : 'bg-white text-forest-900 shadow-card hover:bg-leaf-100'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="relative lg:w-80">
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-forest-600" />
            <input
              type="search"
              value={query}
              onChange={(event) => updateParam('q', event.target.value)}
              placeholder="Search by name or region"
              aria-label="Search destinations"
              className="field bg-white pl-11"
            />
          </div>
        </div>

        <p className="mt-6 text-sm text-ink/60" aria-live="polite">
          Showing <strong className="text-forest-950">{results.length}</strong> of {destinations.length} destinations
          {query && (
            <>
              {' '}
              for &ldquo;{query}&rdquo;
            </>
          )}
        </p>

        {results.length > 0 ? (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {results.map((destination, i) => (
              <Reveal key={destination.slug} delay={(i % 4) * 60}>
                <DestinationCard destination={destination} size="lg" />
              </Reveal>
            ))}
          </div>
        ) : (
          <div className="mt-6 rounded-3xl bg-white px-6 py-16 text-center shadow-card">
            <p className="text-lg font-bold text-forest-950">No destinations found</p>
            <p className="mt-2 text-sm text-ink/60">Try another keyword or clear the filters.</p>
            <button type="button" onClick={() => setParams({}, { replace: true })} className="btn-outline mt-6">
              <X className="size-4" /> Clear filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}
