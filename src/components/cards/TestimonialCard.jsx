import { Quote } from 'lucide-react'
import { avatar } from '../../data/images'
import Stars from '../ui/Stars'

export default function TestimonialCard({ testimonial }) {
  const { name, from, trip, quote, rating } = testimonial
  return (
    <figure className="relative flex h-full flex-col rounded-2xl bg-white p-6 shadow-card">
      <Quote className="absolute top-5 right-5 size-8 fill-leaf-200 text-leaf-200" aria-hidden="true" />
      <blockquote className="relative pr-9 text-[15px] leading-relaxed text-ink/80">&ldquo;{quote}&rdquo;</blockquote>
      <figcaption className="mt-auto flex items-center justify-between gap-3 pt-6">
        <div className="flex items-center gap-3">
          <img
            src={avatar(testimonial.avatar)}
            alt=""
            loading="lazy"
            className="size-11 rounded-full object-cover ring-2 ring-leaf-200"
          />
          <div>
            <p className="text-sm font-bold text-forest-950">{name}</p>
            <p className="text-xs text-ink/50">
              {from} · {trip}
            </p>
          </div>
        </div>
        <Stars value={rating} />
      </figcaption>
    </figure>
  )
}
