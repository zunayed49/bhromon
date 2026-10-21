import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, CalendarDays, Check, CheckCircle2, ChevronDown, Clock, MapPin, Minus, Plus, Star, Users } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import PackageCard from '../components/cards/PackageCard'
import SaveButton from '../components/ui/SaveButton'
import SectionHeading from '../components/ui/SectionHeading'
import { getPackage, packages } from '../data/packages'
import { getDestination } from '../data/destinations'
import { formatPrice } from '../data/content'
import { photo } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

const MAX_TRAVELLERS = 12

// Accordion: one step open at a time; the first is open by default.
function Itinerary({ steps }) {
  const [openStep, setOpenStep] = useState(0)
  return (
    <ol className="mt-5 space-y-3">
      {steps.map((step, i) => {
        const open = openStep === i
        return (
          <li key={step.title} className="overflow-hidden rounded-2xl bg-white shadow-card">
            <button
              type="button"
              onClick={() => setOpenStep(open ? -1 : i)}
              aria-expanded={open}
              className="flex w-full cursor-pointer items-center gap-4 p-4 text-left"
            >
              <span
                className={`grid size-10 shrink-0 place-items-center rounded-full text-sm font-extrabold transition ${
                  open ? 'bg-forest-900 text-white' : 'bg-leaf-100 text-forest-900'
                }`}
              >
                {i + 1}
              </span>
              <span className="flex-1 font-bold text-forest-950">{step.title}</span>
              <ChevronDown className={`size-5 text-ink/40 transition ${open ? 'rotate-180' : ''}`} />
            </button>
            <div className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
              <div className="overflow-hidden">
                <p className="pr-4 pb-5 pl-[4.5rem] text-sm leading-relaxed text-ink/70">{step.detail}</p>
              </div>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function BookingCard({ pkg, initialTravellers }) {
  const [travellers, setTravellers] = useState(Math.min(Math.max(initialTravellers, 1), MAX_TRAVELLERS))
  const [date, setDate] = useState('')
  const [requested, setRequested] = useState(false)
  const [error, setError] = useState('')

  const minDate = useMemo(() => new Date(Date.now() + 3 * 864e5).toISOString().slice(0, 10), [])

  // Groups of 4+ get 10% off, a common rule for local operators.
  const pricing = useMemo(() => {
    const subtotal = pkg.price * travellers
    const discount = travellers >= 4 ? Math.round(subtotal * 0.1) : 0
    return { subtotal, discount, total: subtotal - discount }
  }, [pkg.price, travellers])

  const handleRequest = (event) => {
    event.preventDefault()
    if (!date) {
      setError('Please choose a departure date.')
      return
    }
    setError('')
    setRequested(true)
  }

  if (requested) {
    return (
      <div className="animate-scale-in rounded-3xl bg-white p-6 text-center shadow-card" role="status">
        <CheckCircle2 className="mx-auto size-12 text-forest-600" />
        <h3 className="mt-3 text-xl font-extrabold text-forest-950">Booking request received</h3>
        <p className="mt-2 text-sm text-ink/60">
          {pkg.title} for {travellers} {travellers === 1 ? 'traveller' : 'travellers'} departing{' '}
          {new Date(`${date}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}.
          A trip planner will call you within 24 hours to confirm.
        </p>
        <p className="mt-4 text-2xl font-extrabold text-forest-950">{formatPrice(pricing.total)}</p>
        <button type="button" onClick={() => setRequested(false)} className="btn-outline mt-6 w-full">
          Edit request
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleRequest} className="rounded-3xl bg-white p-6 shadow-card" noValidate>
      <p className="text-sm text-ink/60">Starting from</p>
      <p className="text-3xl font-extrabold text-forest-950">
        {formatPrice(pkg.price)} <span className="text-sm font-medium text-ink/50">per person</span>
      </p>

      <label htmlFor="departure" className="mt-6 mb-1.5 block text-xs font-semibold text-ink/60">
        Departure date
      </label>
      <div className="relative">
        <CalendarDays className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-forest-600" />
        <input
          id="departure"
          type="date"
          min={minDate}
          value={date}
          onChange={(event) => {
            setDate(event.target.value)
            setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'departure-error' : undefined}
          className={`field pl-11 ${error ? 'border-rose-400' : ''}`}
        />
      </div>
      {error && (
        <p id="departure-error" className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-between rounded-xl bg-mist px-4 py-3">
        <span className="flex items-center gap-2 text-sm font-semibold text-forest-950">
          <Users className="size-4 text-forest-600" /> Travellers
        </span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setTravellers((n) => Math.max(1, n - 1))}
            disabled={travellers <= 1}
            className="grid size-8 cursor-pointer place-items-center rounded-full border border-forest-900/15 bg-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Remove a traveller"
          >
            <Minus className="size-3.5" />
          </button>
          <span className="w-5 text-center font-bold tabular-nums" aria-live="polite">
            {travellers}
          </span>
          <button
            type="button"
            onClick={() => setTravellers((n) => Math.min(MAX_TRAVELLERS, n + 1))}
            disabled={travellers >= MAX_TRAVELLERS}
            className="grid size-8 cursor-pointer place-items-center rounded-full border border-forest-900/15 bg-white disabled:cursor-not-allowed disabled:opacity-30"
            aria-label="Add a traveller"
          >
            <Plus className="size-3.5" />
          </button>
        </div>
      </div>

      <dl className="mt-5 space-y-2 border-t border-dashed border-forest-900/15 pt-4 text-sm">
        <div className="flex justify-between text-ink/60">
          <dt>
            {formatPrice(pkg.price)} × {travellers}
          </dt>
          <dd>{formatPrice(pricing.subtotal)}</dd>
        </div>
        {pricing.discount > 0 ? (
          <div className="flex justify-between font-medium text-forest-600">
            <dt>Group discount (10%)</dt>
            <dd>−{formatPrice(pricing.discount)}</dd>
          </div>
        ) : (
          <p className="text-xs text-ink/50">Add {4 - travellers} more for a 10% group discount.</p>
        )}
        <div className="flex justify-between pt-2 text-base font-extrabold text-forest-950">
          <dt>Total</dt>
          <dd>{formatPrice(pricing.total)}</dd>
        </div>
      </dl>

      <button type="submit" className="btn-primary mt-6 w-full py-3">
        Request Booking
      </button>
      <p className="mt-3 text-center text-xs text-ink/50">No payment now. Free cancellation up to 7 days before departure.</p>
    </form>
  )
}

export default function PackageDetail() {
  const { id } = useParams()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const pkg = getPackage(id)
  useDocumentTitle(pkg?.title ?? 'Package not found')

  if (!pkg) return <NotFound message="That tour package doesn't exist or is no longer offered." />

  const stops = pkg.destinations.map(getDestination).filter(Boolean)
  const others = packages.filter((p) => p.id !== pkg.id).slice(0, 4)

  return (
    <>
      <PageHeader
        image={pkg.image}
        eyebrow={`${pkg.days} Days • ${pkg.nights} ${pkg.nights === 1 ? 'Night' : 'Nights'}`}
        title={pkg.title}
        subtitle={pkg.summary}
        crumbs={[{ label: 'Tour Packages', to: '/packages' }, { label: pkg.title }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            <Star className="size-4 fill-sun text-sun" /> {pkg.rating.toFixed(1)} · {pkg.reviews} reviews
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            <Users className="size-4" /> Group of {pkg.groupSize}
          </span>
          <SaveButton itemKey={`package:${pkg.id}`} label={pkg.title} />
        </div>
      </PageHeader>

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1.6fr_1fr]">
        <div>
          <button type="button" onClick={() => navigate(-1)} className="inline-flex cursor-pointer items-center gap-1.5 text-sm font-semibold text-forest-900 hover:text-forest-600">
            <ArrowLeft className="size-4" /> Back
          </button>

          <h2 className="mt-6 text-2xl font-extrabold text-forest-950">Where you&apos;ll go</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {stops.map((d) => (
              <Link key={d.slug} to={`/destinations/${d.slug}`} className="group flex items-center gap-3 rounded-full bg-white py-1.5 pr-4 pl-1.5 shadow-card transition hover:shadow-lift">
                <img src={photo(d.image, 96, '&h=96')} alt="" className="size-9 rounded-full object-cover" />
                <span className="text-sm font-semibold text-forest-950 group-hover:text-forest-600">{d.name}</span>
              </Link>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-extrabold text-forest-950">Itinerary</h2>
          <Itinerary key={pkg.id} steps={pkg.itinerary} />

          <h2 className="mt-10 text-2xl font-extrabold text-forest-950">What&apos;s included</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {pkg.includes.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm font-medium text-ink/80">
                <span className="grid size-6 shrink-0 place-items-center rounded-full bg-leaf-200 text-forest-900">
                  <Check className="size-3.5" />
                </span>
                {item}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-6 rounded-2xl bg-leaf-100 p-5 text-sm text-forest-900">
            <span className="flex items-center gap-2">
              <Clock className="size-4" /> {pkg.days} days, {pkg.nights} {pkg.nights === 1 ? 'night' : 'nights'}
            </span>
            <span className="flex items-center gap-2">
              <MapPin className="size-4" /> Starts &amp; ends in Dhaka
            </span>
            <span className="flex items-center gap-2">
              <Users className="size-4" /> {pkg.groupSize} travellers
            </span>
          </div>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          {/* Keyed by package so the booking form resets when browsing to another tour. */}
          <BookingCard key={pkg.id} pkg={pkg} initialTravellers={Number(params.get('travellers')) || 2} />
        </aside>
      </section>

      <section className="container-x pb-12">
        <SectionHeading eyebrow="Keep exploring" title="Other Trips You'll Love" action="All Packages" actionTo="/packages" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((p) => (
            <PackageCard key={p.id} pkg={p} />
          ))}
        </div>
      </section>
    </>
  )
}
