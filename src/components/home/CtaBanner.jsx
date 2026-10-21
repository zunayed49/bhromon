import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { IMG, photo } from '../../data/images'
import ScriptNote from '../ui/ScriptNote'
import Reveal from '../ui/Reveal'

export default function CtaBanner() {
  return (
    <section className="mt-20 sm:mt-24" aria-labelledby="cta-title">
      <div className="relative isolate overflow-hidden bg-forest-950">
        <img
          src={photo(IMG.hillTrain, 2000)}
          alt="A train winding through green forest in Bangladesh"
          loading="lazy"
          className="absolute inset-0 -z-20 size-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-forest-950/90 via-forest-950/50 to-transparent" />

        <div className="container-x relative py-16 sm:py-20">
          <Reveal className="max-w-md text-white">
            <h2 id="cta-title" className="text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl">
              Bangladesh
              <br />
              Is Calling
            </h2>
            <p className="mt-4 text-white/85">
              Get exclusive deals, early access to seasonal departures and travel plans built around you.
            </p>
            <Link to="/contact?topic=plan" className="btn-light mt-7 px-6 py-3">
              Plan Your Dream Trip <ArrowRight className="size-4" />
            </Link>
          </Reveal>
          <ScriptNote
            lines={['Good People,', 'Great', 'Places']}
            rotate={-8}
            size="text-[2.1rem]"
            className="absolute top-1/2 right-10 hidden -translate-y-1/2 md:block"
          />
        </div>
      </div>
    </section>
  )
}
