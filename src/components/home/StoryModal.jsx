import { useCallback, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, Pause, Play, X } from 'lucide-react'
import { IMG, photo } from '../../data/images'
import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

const SLIDES = [
  { image: IMG.seaOfClouds, place: 'Sajek Valley', caption: 'It started in 2014 with one jeep, six friends and a sunrise above the clouds.' },
  { image: IMG.mangroveMist, place: 'Sundarbans', caption: 'We learned the forest from the boatmen and honey collectors who call it home.' },
  { image: IMG.teaField, place: 'Srimangal', caption: 'We partner with local guides, homestays and tea-garden families in every region.' },
  { image: IMG.coxBoats, place: "Cox's Bazar", caption: 'Today, more than 25,000 travellers have explored Bangladesh with us.' },
  { image: IMG.villageSunset, place: 'Rural Bengal', caption: 'Our promise stays the same: travel slowly, kindly and close to the people.' },
]
const DURATION = 5000

// Instagram-style "story" player: auto-advances, pausable, keyboard and tap navigation.
export default function StoryModal({ onClose }) {
  const [index, setIndex] = useState(0)
  const [paused, setPaused] = useState(false)
  useLockBodyScroll(true)

  const next = useCallback(() => setIndex((i) => (i + 1 < SLIDES.length ? i + 1 : i)), [])
  const prev = useCallback(() => setIndex((i) => Math.max(i - 1, 0)), [])

  useEffect(() => {
    if (paused) return
    const timer = setTimeout(() => {
      if (index === SLIDES.length - 1) onClose()
      else next()
    }, DURATION)
    return () => clearTimeout(timer)
  }, [index, paused, next, onClose])

  useEffect(() => {
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') next()
      if (event.key === 'ArrowLeft') prev()
      if (event.key === ' ') {
        event.preventDefault()
        setPaused((p) => !p)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev, onClose])

  const slide = SLIDES[index]

  // Portalled to <body> so no ancestor stacking context (the hero uses `isolate`) can trap it.
  return createPortal(
    <div className="fixed inset-0 z-[60] grid animate-fade-in place-items-center bg-forest-950/90 p-4 backdrop-blur" role="dialog" aria-modal="true" aria-label="Our story">
      <button type="button" onClick={onClose} className="absolute top-4 right-4 grid size-10 cursor-pointer place-items-center rounded-full bg-white/10 text-white hover:bg-white/20" aria-label="Close story">
        <X className="size-5" />
      </button>

      <div className="relative aspect-[9/16] h-[min(82vh,760px)] max-w-full animate-scale-in overflow-hidden rounded-3xl bg-forest-900 shadow-2xl">
        {SLIDES.map((s, i) => (
          <img
            key={s.place}
            src={photo(s.image, 900)}
            alt=""
            className={`absolute inset-0 size-full object-cover transition duration-700 ${i === index ? 'scale-100 opacity-100' : 'scale-105 opacity-0'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/80" />

        <div className="absolute inset-x-3 top-3 flex gap-1.5">
          {SLIDES.map((s, i) => (
            <span key={s.place} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
              <span
                key={`${index}-${i}`}
                className="block h-full rounded-full bg-white"
                style={{
                  width: i < index ? '100%' : i === index ? undefined : '0%',
                  animation: i === index ? `story-progress ${DURATION}ms linear forwards` : 'none',
                  animationPlayState: paused ? 'paused' : 'running',
                }}
              />
            </span>
          ))}
        </div>

        <div className="absolute inset-x-0 top-7 flex items-center justify-between px-4 text-white">
          <p className="text-sm font-semibold">Our Story · {slide.place}</p>
          <button type="button" onClick={() => setPaused((p) => !p)} className="grid size-8 cursor-pointer place-items-center rounded-full hover:bg-white/15" aria-label={paused ? 'Play' : 'Pause'}>
            {paused ? <Play className="size-4" /> : <Pause className="size-4" />}
          </button>
        </div>

        <p key={index} className="absolute inset-x-0 bottom-0 animate-fade-up p-6 text-xl leading-snug font-bold text-white">
          {slide.caption}
        </p>

        <button type="button" onClick={prev} className="absolute top-16 bottom-28 left-0 w-1/3 cursor-pointer" aria-label="Previous slide" />
        <button type="button" onClick={next} className="absolute top-16 right-0 bottom-28 w-2/3 cursor-pointer" aria-label="Next slide" />
      </div>

      <div className="pointer-events-none absolute inset-x-4 top-1/2 hidden -translate-y-1/2 justify-between text-white/70 md:flex">
        <ChevronLeft className="size-8" />
        <ChevronRight className="size-8" />
      </div>
    </div>,
    document.body,
  )
}
