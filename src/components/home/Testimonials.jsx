import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../../data/content'
import TestimonialCard from '../cards/TestimonialCard'

const INTERVAL = 6000

export default function Testimonials() {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  const count = testimonials.length

  const next = useCallback(() => setIndex((i) => (i + 1) % count), [count])
  const prev = useCallback(() => setIndex((i) => (i - 1 + count) % count), [count])

  // Auto-advance, pausing while the visitor hovers or focuses the carousel.
  useEffect(() => {
    if (paused) return
    const timer = setInterval(next, INTERVAL)
    return () => clearInterval(timer)
  }, [paused, next])

  const visible = [0, 1, 2].map((offset) => testimonials[(index + offset) % count])

  return (
    <section
      className="container-x pt-16 sm:pt-20"
      aria-labelledby="testimonials-title"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Travelers Love Us</p>
          <h2 id="testimonials-title" className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-[2.15rem]">
            Real Stories. Real Smiles.
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={prev} className="grid size-10 cursor-pointer place-items-center rounded-full border border-forest-900/15 bg-white text-forest-900 transition hover:border-forest-900" aria-label="Previous testimonial">
            <ArrowLeft className="size-4" />
          </button>
          <button type="button" onClick={next} className="grid size-10 cursor-pointer place-items-center rounded-full bg-forest-900 text-white transition hover:bg-forest-700" aria-label="Next testimonial">
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
        {visible.map((t, offset) => (
          <div
            key={`${t.name}-${index}`}
            className={`animate-fade-up ${offset === 1 ? 'hidden md:block' : ''} ${offset === 2 ? 'hidden lg:block' : ''}`}
            style={{ animationDelay: `${offset * 90}ms` }}
          >
            <TestimonialCard testimonial={t} />
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2" role="tablist" aria-label="Choose testimonial">
        {testimonials.map((t, i) => (
          <button
            key={t.name}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={`Show testimonial from ${t.name}`}
            onClick={() => setIndex(i)}
            className={`h-2 cursor-pointer rounded-full transition-all ${i === index ? 'w-6 bg-forest-900' : 'w-2 bg-forest-900/20 hover:bg-forest-900/40'}`}
          />
        ))}
      </div>
    </section>
  )
}
