import { Globe, HeartHandshake, Map, Sprout } from 'lucide-react'
import ScriptNote from '../ui/ScriptNote'
import Reveal from '../ui/Reveal'

const REASONS = [
  { icon: Globe, title: 'Handpicked Destinations', text: 'Only the best of Bangladesh, always.' },
  { icon: Map, title: 'Custom Itineraries', text: 'Trips tailored to your pace and budget.' },
  { icon: Sprout, title: 'Hassle-Free Travel', text: 'Permits, tickets and transfers handled.' },
  { icon: HeartHandshake, title: 'Memorable Experiences', text: 'Stories you will tell for a lifetime.' },
]

export default function WhyUs() {
  return (
    <section className="container-x relative pt-16 sm:pt-20" aria-labelledby="why-title">
      <p className="eyebrow">Why Travel With Bhromon</p>
      <h2 id="why-title" className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-[2.15rem]">
        More Than Just Trips
      </h2>

      <ScriptNote
        lines={['Travel', 'A Kinder', 'You']}
        tone="dark"
        rotate={-7}
        size="text-[2rem]"
        className="absolute top-14 right-8 hidden md:block"
      />

      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {REASONS.map(({ icon: Icon, title, text }, i) => (
          <Reveal
            as="li"
            key={title}
            delay={i * 80}
            className={`flex items-center gap-4 lg:flex-col lg:items-start lg:px-8 ${i > 0 ? 'lg:border-l lg:border-forest-900/10' : 'lg:pl-0'}`}
          >
            <span className="grid size-14 shrink-0 place-items-center rounded-full bg-white text-forest-900 shadow-card">
              <Icon className="size-6" strokeWidth={1.6} />
            </span>
            <div>
              <h3 className="text-[15px] font-bold text-forest-950">{title}</h3>
              <p className="mt-1 text-sm text-ink/55">{text}</p>
            </div>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
