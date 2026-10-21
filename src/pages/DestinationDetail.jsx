import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowRight, CalendarDays, Check, Clock, MapPin, Navigation, Star } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import PackageCard from '../components/cards/PackageCard'
import DestinationCard from '../components/cards/DestinationCard'
import SaveButton from '../components/ui/SaveButton'
import SectionHeading from '../components/ui/SectionHeading'
import { destinations, getDestination } from '../data/destinations'
import { packages } from '../data/packages'
import { photo } from '../data/images'
import { formatPrice } from '../data/content'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

export default function DestinationDetail() {
  const { slug } = useParams()
  const destination = getDestination(slug)
  useDocumentTitle(destination?.name ?? 'Destination not found')
  // Keyed by slug so the gallery resets when navigating between destinations.
  const [active, setActive] = useState({ slug, index: 0 })
  const activeIndex = active.slug === slug ? active.index : 0

  if (!destination) return <NotFound message="We couldn't find that destination. It may have moved or never existed." />

  const images = [destination.image, ...destination.gallery]
  const relatedPackages = packages.filter((p) => p.destinations.includes(destination.slug))
  const nearby = destinations.filter((d) => d.category === destination.category && d.slug !== destination.slug).slice(0, 4)

  const facts = [
    { icon: CalendarDays, label: 'Best time to visit', value: destination.bestTime },
    { icon: Clock, label: 'Ideal stay', value: destination.idealStay },
    { icon: Navigation, label: 'Getting there', value: destination.reach },
  ]

  return (
    <>
      <PageHeader
        image={destination.image}
        eyebrow={destination.region}
        title={destination.name}
        subtitle={destination.tagline}
        crumbs={[{ label: 'Destinations', to: '/destinations' }, { label: destination.name }]}
      >
        <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            <Star className="size-4 fill-sun text-sun" /> {destination.rating} traveller rating
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 backdrop-blur">
            <MapPin className="size-4" /> {destination.tags}
          </span>
        </div>
      </PageHeader>

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <div className="relative overflow-hidden rounded-3xl bg-forest-900 shadow-card">
            <img key={images[activeIndex]} src={photo(images[activeIndex], 1400)} alt={`${destination.name} photo ${activeIndex + 1}`} className="aspect-[16/10] w-full animate-fade-in object-cover" />
            <SaveButton itemKey={`destination:${destination.slug}`} label={destination.name} className="absolute top-4 right-4 size-11" />
          </div>
          <div className="mt-3 grid grid-cols-4 gap-3">
            {images.map((img, i) => (
              <button
                key={img}
                type="button"
                onClick={() => setActive({ slug, index: i })}
                aria-label={`Show photo ${i + 1}`}
                aria-pressed={i === activeIndex}
                className={`cursor-pointer overflow-hidden rounded-xl ring-2 ring-offset-2 ring-offset-mist transition ${i === activeIndex ? 'ring-forest-900' : 'ring-transparent opacity-70 hover:opacity-100'}`}
              >
                <img src={photo(img, 300, '&h=200')} alt="" className="aspect-[3/2] w-full object-cover" />
              </button>
            ))}
          </div>

          <h2 className="mt-10 text-2xl font-extrabold text-forest-950">About {destination.name}</h2>
          <p className="mt-3 leading-relaxed text-ink/70">{destination.description}</p>

          <h3 className="mt-8 text-lg font-bold text-forest-950">Highlights</h3>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {destination.highlights.map((h) => (
              <li key={h} className="flex items-center gap-3 rounded-2xl bg-white p-4 text-sm font-medium shadow-card">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-leaf-200 text-forest-900">
                  <Check className="size-4" />
                </span>
                {h}
              </li>
            ))}
          </ul>
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <p className="text-sm text-ink/60">Trips from</p>
            <p className="text-3xl font-extrabold text-forest-950">
              {formatPrice(destination.fromPrice)} <span className="text-sm font-medium text-ink/50">per person</span>
            </p>
            <ul className="mt-6 space-y-5">
              {facts.map(({ icon: Icon, label, value }) => (
                <li key={label} className="flex gap-3">
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-mist text-forest-900">
                    <Icon className="size-5" strokeWidth={1.8} />
                  </span>
                  <div>
                    <p className="text-xs font-semibold tracking-wide text-ink/50 uppercase">{label}</p>
                    <p className="mt-0.5 text-sm font-medium text-forest-950">{value}</p>
                  </div>
                </li>
              ))}
            </ul>
            <Link to={`/contact?topic=plan&destination=${encodeURIComponent(destination.name)}`} className="btn-primary mt-7 w-full py-3">
              Plan a Trip to {destination.name} <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </section>

      {relatedPackages.length > 0 && (
        <section className="container-x pb-4">
          <SectionHeading eyebrow="Tours that include it" title={`${destination.name} Packages`} action="All Packages" actionTo="/packages" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {relatedPackages.map((pkg) => (
              <PackageCard key={pkg.id} pkg={pkg} />
            ))}
          </div>
        </section>
      )}

      {nearby.length > 0 && (
        <section className="container-x py-12">
          <SectionHeading eyebrow="You may also like" title={`More ${destination.category}`} />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {nearby.map((d) => (
              <DestinationCard key={d.slug} destination={d} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}
