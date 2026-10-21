import { guides } from '../../data/content'
import GuideCard from '../cards/GuideCard'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function TravelGuides() {
  return (
    <section className="container-x pt-16 pb-14 sm:pt-20" aria-labelledby="guides-title">
      <SectionHeading eyebrow="Travel Guides & Tips" title={<span id="guides-title">Stories to Fuel Your Next Trip</span>} action="View All Guides" actionTo="/guides" />
      <div className="grid gap-5 md:grid-cols-3">
        {guides.slice(0, 3).map((guide, i) => (
          <Reveal key={guide.slug} delay={i * 80}>
            <GuideCard guide={guide} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
