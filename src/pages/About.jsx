import { Link } from 'react-router-dom'
import { ArrowRight, HandHeart, Leaf, ShieldCheck } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Reveal from '../components/ui/Reveal'
import ScriptNote from '../components/ui/ScriptNote'
import { IMG, photo } from '../data/images'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const STATS = [
  { value: 12, suffix: '+', label: 'Years exploring Bangladesh' },
  { value: 25000, suffix: '+', label: 'Happy travellers' },
  { value: 8, suffix: '/8', label: 'Divisions covered' },
  { value: 120, suffix: '+', label: 'Local partners & homestays' },
]

const VALUES = [
  {
    icon: Leaf,
    title: 'Travel lightly',
    text: 'Plastic-free trips, capped group sizes and operators who respect protected forests, reefs and hills.',
  },
  {
    icon: HandHeart,
    title: 'Keep it local',
    text: 'We hire local guides, boatmen and drivers, and stay in family-run homestays wherever we can.',
  },
  {
    icon: ShieldCheck,
    title: 'Safety first',
    text: 'Licensed vehicles, vetted stays, first-aid trained leaders and a 24/7 support line on every trip.',
  },
]

function Stat({ value, suffix, label, start }) {
  const count = useCountUp(value, { start })
  return (
    <div className="text-center">
      <p className="text-4xl font-extrabold tracking-tight text-white tabular-nums sm:text-5xl">
        {count.toLocaleString('en-IN')}
        <span className="text-leaf-300">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-white/70">{label}</p>
    </div>
  )
}

export default function About() {
  useDocumentTitle('About Us')
  const [statsRef, statsInView] = useInView({ threshold: 0.4 })

  return (
    <>
      <PageHeader
        image={IMG.villageSunset}
        eyebrow="About Us"
        title="Born in Bangladesh, Built for Explorers"
        subtitle="We are a small team of travellers, photographers and storytellers who believe our country deserves to be seen."
        crumbs={[{ label: 'About Us' }]}
      />

      <section className="container-x grid items-center gap-12 py-16 lg:grid-cols-2">
        <Reveal>
          <p className="eyebrow">Our Story</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">
            It started with one jeep and a sunrise above the clouds
          </h2>
          <div className="mt-5 space-y-4 leading-relaxed text-ink/70">
            <p>
              In 2014, six university friends from Dhaka rented a jeep to Sajek Valley. Watching the sun rise over a sea of
              clouds, they realised how few people, even Bangladeshis, had seen this side of their own country.
            </p>
            <p>
              Bhromon (the Bangla word for &ldquo;travel&rdquo;) began as weekend trips for friends. Today we design journeys
              to every corner of Bangladesh, from the tea gardens of Sylhet to the mangroves of the Sundarbans, for
              families, solo travellers and visitors from around the world.
            </p>
          </div>
          <Link to="/packages" className="btn-primary mt-8 px-6 py-3">
            Explore Our Trips <ArrowRight className="size-4" />
          </Link>
        </Reveal>

        <Reveal delay={120} className="relative">
          <img src={photo(IMG.sajekVillage, 900)} alt="Cottages on the ridge at Sajek Valley" className="aspect-[4/5] w-4/5 rounded-3xl object-cover shadow-lift" loading="lazy" />
          <img
            src={photo(IMG.harbourBoats, 600)}
            alt="Wooden boats on a river in Bangladesh"
            className="absolute right-0 -bottom-8 aspect-square w-1/2 rounded-3xl border-8 border-mist object-cover shadow-lift"
            loading="lazy"
          />
          <ScriptNote lines={['Since', '2014']} tone="dark" rotate={-10} size="text-[2.2rem]" className="absolute top-6 right-4" />
        </Reveal>
      </section>

      <section ref={statsRef} className="mt-8 bg-forest-900 py-14">
        <div className="container-x grid grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map((s) => (
            <Stat key={s.label} {...s} start={statsInView} />
          ))}
        </div>
      </section>

      <section className="container-x py-16">
        <p className="eyebrow">What We Believe</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950 sm:text-4xl">Travel that gives back</h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {VALUES.map(({ icon: Icon, title, text }, i) => (
            <Reveal key={title} delay={i * 90} className="rounded-3xl bg-white p-7 shadow-card">
              <span className="grid size-12 place-items-center rounded-2xl bg-leaf-200 text-forest-900">
                <Icon className="size-6" strokeWidth={1.8} />
              </span>
              <h3 className="mt-5 text-lg font-bold text-forest-950">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">{text}</p>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  )
}
