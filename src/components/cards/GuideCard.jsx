import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { photo } from '../../data/images'
import { formatDate } from '../../data/content'

export default function GuideCard({ guide }) {
  const { slug, title, date, image, category, readTime } = guide
  return (
    <Link
      to={`/guides/${slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/8] overflow-hidden">
        <img
          src={photo(image, 700)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-forest-900 backdrop-blur">
          {category}
        </span>
      </div>
      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <p className="text-xs text-ink/50">
          <time dateTime={date}>{formatDate(date)}</time> · {readTime} min read
        </p>
        <h3 className="mt-2 text-[15px] leading-snug font-bold text-forest-950 group-hover:text-forest-600">{title}</h3>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-forest-900">
          Read More <ArrowRight className="size-4 transition group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
