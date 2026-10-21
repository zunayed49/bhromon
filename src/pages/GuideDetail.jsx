import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CalendarDays, Clock } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { formatDate, getGuide, guides } from '../data/content'
import { photo } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'
import NotFound from './NotFound'

export default function GuideDetail() {
  const { slug } = useParams()
  const guide = getGuide(slug)
  useDocumentTitle(guide?.title ?? 'Guide not found')

  if (!guide) return <NotFound message="We couldn't find that travel guide." />

  const index = guides.indexOf(guide)
  const previous = guides[index - 1]
  const next = guides[index + 1]
  const more = guides.filter((g) => g.slug !== guide.slug).slice(0, 3)

  return (
    <>
      <PageHeader image={guide.image} eyebrow={guide.category} title={guide.title} crumbs={[{ label: 'Travel Guides', to: '/guides' }, { label: guide.category }]}>
        <div className="mt-5 flex flex-wrap gap-5 text-sm text-white/80">
          <span className="flex items-center gap-2">
            <CalendarDays className="size-4" /> <time dateTime={guide.date}>{formatDate(guide.date)}</time>
          </span>
          <span className="flex items-center gap-2">
            <Clock className="size-4" /> {guide.readTime} min read
          </span>
        </div>
      </PageHeader>

      <div className="container-x grid gap-12 py-12 lg:grid-cols-[1fr_320px]">
        <article className="max-w-2xl">
          <p className="text-xl leading-relaxed font-medium text-forest-950">{guide.excerpt}</p>
          <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-ink/75">
            {guide.body.map((paragraph) => (
              <p key={paragraph.slice(0, 32)}>{paragraph}</p>
            ))}
          </div>

          <nav className="mt-12 grid gap-4 border-t border-forest-900/10 pt-8 sm:grid-cols-2" aria-label="More guides">
            {previous ? (
              <Link to={`/guides/${previous.slug}`} className="group rounded-2xl bg-white p-5 shadow-card hover:shadow-lift">
                <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
                  <ArrowLeft className="size-3.5" /> Previous
                </span>
                <span className="mt-2 block font-bold text-forest-950 group-hover:text-forest-600">{previous.title}</span>
              </Link>
            ) : (
              <span />
            )}
            {next && (
              <Link to={`/guides/${next.slug}`} className="group rounded-2xl bg-white p-5 text-right shadow-card hover:shadow-lift">
                <span className="flex items-center justify-end gap-1.5 text-xs font-semibold text-ink/50">
                  Next <ArrowRight className="size-3.5" />
                </span>
                <span className="mt-2 block font-bold text-forest-950 group-hover:text-forest-600">{next.title}</span>
              </Link>
            )}
          </nav>
        </article>

        <aside className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <h2 className="text-sm font-bold tracking-wide text-ink/50 uppercase">More to read</h2>
          {more.map((g) => (
            <Link key={g.slug} to={`/guides/${g.slug}`} className="group flex gap-4 rounded-2xl bg-white p-3 shadow-card hover:shadow-lift">
              <img src={photo(g.image, 200, '&h=200')} alt="" className="size-20 shrink-0 rounded-xl object-cover" loading="lazy" />
              <div className="min-w-0 py-1">
                <p className="text-[11px] font-semibold text-forest-600">{g.category}</p>
                <p className="mt-1 line-clamp-2 text-sm leading-snug font-bold text-forest-950 group-hover:text-forest-600">{g.title}</p>
              </div>
            </Link>
          ))}
          <div className="rounded-2xl bg-forest-900 p-6 text-white">
            <p className="text-lg font-bold">Ready to go?</p>
            <p className="mt-1 text-sm text-white/70">Our planners turn guides like this into real trips.</p>
            <Link to="/contact?topic=plan" className="btn-light mt-4 w-full">
              Plan My Trip <ArrowRight className="size-4" />
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
