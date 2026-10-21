import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Headset, Play, Route, ShieldCheck, Users } from 'lucide-react'
import { IMG, photo } from '../../data/images'
import ScriptNote from '../ui/ScriptNote'
import StoryModal from './StoryModal'

const PERKS = [
  { icon: Route, label: 'Curated', sub: 'Experiences' },
  { icon: ShieldCheck, label: 'Safe & Secure', sub: 'Travel' },
  { icon: Users, label: 'Expert Local', sub: 'Trip Planners' },
  { icon: Headset, label: '24/7', sub: 'Support' },
]

export default function Hero() {
  const [storyOpen, setStoryOpen] = useState(false)
  const closeStory = useCallback(() => setStoryOpen(false), [])

  return (
    <section className="relative isolate overflow-hidden bg-forest-950 text-white">
      <img
        src={photo(IMG.heroHills, 2200)}
        srcSet={`${photo(IMG.heroHills, 900)} 900w, ${photo(IMG.heroHills, 1500)} 1500w, ${photo(IMG.heroHills, 2200)} 2200w`}
        sizes="100vw"
        alt="Mist rolling over the green hills of the Chattogram Hill Tracts"
        fetchPriority="high"
        className="absolute inset-0 -z-20 size-full animate-hero-zoom object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/90 via-forest-950/55 to-forest-950/5" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-forest-950/70 to-transparent" />

      <div className="container-x relative pt-16 pb-36 sm:pt-20 lg:pt-24 lg:pb-40">
        <ScriptNote
          lines={['Collect Moments,', 'Not Things']}
          rotate={-8}
          size="text-[2rem]"
          className="absolute top-12 right-8 hidden md:block lg:right-12"
        />

        <div className="max-w-2xl">
          <p className="animate-fade-up text-[11px] font-bold tracking-[0.3em] text-white/80 uppercase">
            Explore. Experience. Belong.
          </p>
          <h1 className="mt-4 animate-fade-up text-5xl leading-[1.02] font-extrabold tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-7xl">
            Discover the
            <br />
            Soul of <span className="text-leaf-300">Bangladesh</span>
          </h1>
          <p className="mt-6 max-w-lg animate-fade-up text-base leading-relaxed text-white/85 [animation-delay:160ms] sm:text-lg">
            Curated journeys to misty hills, endless beaches and wild mangrove forests. Because the land of rivers is meant
            to be explored.
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap items-center gap-5 [animation-delay:240ms]">
            <Link to="/contact?topic=plan" className="btn-light px-6 py-3">
              Plan Your Trip <ArrowRight className="size-4" />
            </Link>
            <button
              type="button"
              onClick={() => setStoryOpen(true)}
              className="group inline-flex cursor-pointer items-center gap-3 text-sm font-semibold"
            >
              <span className="relative grid size-12 place-items-center rounded-full border-2 border-white/80 transition group-hover:scale-110 group-hover:bg-white group-hover:text-forest-950">
                <span className="absolute inset-0 animate-ping rounded-full border border-white/40" />
                <Play className="size-4 translate-x-px fill-current" />
              </span>
              Watch Our Story
            </button>
          </div>
        </div>

        <ul className="mt-14 grid max-w-2xl animate-fade-up grid-cols-2 gap-y-6 [animation-delay:320ms] sm:grid-cols-4">
          {PERKS.map(({ icon: Icon, label, sub }, i) => (
            <li
              key={label}
              className={`flex flex-col items-center gap-2 px-2 text-center text-xs leading-tight font-medium text-white/90 ${
                i > 0 ? 'sm:border-l sm:border-white/20' : ''
              } ${i % 2 === 1 ? 'max-sm:border-l max-sm:border-white/20' : ''}`}
            >
              <Icon className="size-6 text-white" strokeWidth={1.6} />
              <span>
                {label}
                <br />
                {sub}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {storyOpen && <StoryModal onClose={closeStory} />}
    </section>
  )
}
