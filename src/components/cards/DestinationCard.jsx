import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { photo } from '../../data/images'
import SaveButton from '../ui/SaveButton'

export default function DestinationCard({ destination, size = 'md' }) {
  const { slug, name, tags, image } = destination
  return (
    <Link
      to={`/destinations/${slug}`}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-card transition duration-300 hover:-translate-y-1 hover:shadow-lift"
    >
      <div className={`relative overflow-hidden ${size === 'lg' ? 'aspect-[4/3]' : 'aspect-[5/4]'}`}>
        <img
          src={photo(image, 600)}
          alt={name}
          loading="lazy"
          className="size-full object-cover transition duration-700 group-hover:scale-110"
        />
        <SaveButton itemKey={`destination:${slug}`} label={name} className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 focus:opacity-100 max-lg:opacity-100" />
      </div>
      <div className="flex flex-1 items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0">
          <h3 className="truncate text-[15px] font-bold text-forest-950">{name}</h3>
          <p className="mt-0.5 truncate text-xs text-ink/55">{tags}</p>
        </div>
        <span className="grid size-8 shrink-0 place-items-center rounded-full border border-forest-900/15 text-forest-900 transition group-hover:border-forest-900 group-hover:bg-forest-900 group-hover:text-white">
          <ArrowRight className="size-4" />
        </span>
      </div>
    </Link>
  )
}
