import { Link } from 'react-router-dom'
import { ArrowRight, Star } from 'lucide-react'
import { photo } from '../../data/images'
import { formatPrice } from '../../data/content'
import SaveButton from '../ui/SaveButton'

export default function PackageCard({ pkg, search = '' }) {
  const { id, title, days, nights, price, badge, image, rating, reviews } = pkg
  return (
    <Link
      to={`/packages/${id}${search}`}
      className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={photo(image, 700)}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        {badge && (
          <span className="absolute top-3 right-3 rounded-full bg-leaf-300 px-3 py-1 text-[11px] font-bold text-forest-950 shadow-sm">
            {badge}
          </span>
        )}
        <SaveButton itemKey={`package:${id}`} label={title} className="absolute top-3 left-3" />
      </div>
      <div className="flex flex-1 flex-col px-4 pt-4 pb-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-forest-950">{title}</h3>
          <span className="mt-0.5 inline-flex shrink-0 items-center gap-1 text-xs font-semibold text-ink/70">
            <Star className="size-3.5 fill-sun text-sun" />
            {rating.toFixed(1)}
            <span className="font-normal text-ink/40">({reviews})</span>
          </span>
        </div>
        <p className="mt-1 text-xs text-ink/55">
          {days} Days • {nights} {nights === 1 ? 'Night' : 'Nights'}
        </p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <p className="leading-tight">
            <span className="text-xl font-extrabold text-forest-950">{formatPrice(price)}</span>
            <span className="block text-[11px] text-ink/50">per person</span>
          </p>
          <span className="grid size-9 place-items-center rounded-full border border-forest-900/15 text-forest-900 transition group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-white">
            <ArrowRight className="size-4" />
          </span>
        </div>
      </div>
    </Link>
  )
}
