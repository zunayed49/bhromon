import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import GuideCard from '../components/cards/GuideCard'
import Reveal from '../components/ui/Reveal'
import { formatDate, guides } from '../data/content'
import { IMG, photo } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const CATEGORIES = ['All', ...new Set(guides.map((g) => g.category))]

export default function Guides() {
  useDocumentTitle('Travel Guides')
  const [category, setCategory] = useState('All')

  const filtered = useMemo(
    () => (category === 'All' ? guides : guides.filter((g) => g.category === category)),
    [category],
  )
  const [featured, ...rest] = filtered

  return (
    <>
      <PageHeader
        image={IMG.riverSunset}
        eyebrow="Travel Guides & Tips"
        title="Stories to Fuel Your Next Trip"
        subtitle="Honest, local advice on where to go, when to travel and what to pack across Bangladesh."
        crumbs={[{ label: 'Travel Guides' }]}
      />

      <section className="container-x py-12">
        <div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4" role="group" aria-label="Filter guides by topic">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setCategory(c)}
              aria-pressed={category === c}
              className={`shrink-0 cursor-pointer rounded-full px-4 py-2 text-sm font-semibold transition ${
                category === c ? 'bg-forest-900 text-white' : 'bg-white text-forest-900 shadow-card hover:bg-leaf-100'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {featured && (
          <Reveal key={featured.slug}>
            <Link
              to={`/guides/${featured.slug}`}
              className="group mt-8 grid overflow-hidden rounded-3xl bg-white shadow-card transition hover:shadow-lift md:grid-cols-2"
            >
              <div className="overflow-hidden">
                <img src={photo(featured.image, 1000)} alt="" className="aspect-[16/10] size-full object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center p-7 sm:p-10">
                <p className="text-xs font-semibold text-forest-600">
                  {featured.category} · {formatDate(featured.date)} · {featured.readTime} min read
                </p>
                <h2 className="mt-3 text-2xl font-extrabold text-forest-950 group-hover:text-forest-600 sm:text-3xl">{featured.title}</h2>
                <p className="mt-3 text-ink/65">{featured.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-forest-900">
                  Read the guide <ArrowRight className="size-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          </Reveal>
        )}

        {rest.length > 0 && (
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((guide, i) => (
              <Reveal key={guide.slug} delay={(i % 3) * 70}>
                <GuideCard guide={guide} />
              </Reveal>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
