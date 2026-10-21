import { destinations } from '../../data/destinations'
import DestinationCard from '../cards/DestinationCard'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

const FEATURED = ['coxs-bazar', 'sajek-valley', 'sundarbans', 'srimangal', 'saint-martins-island']

export default function PopularDestinations() {
  const items = FEATURED.map((slug) => destinations.find((d) => d.slug === slug))

  return (
    <section className="container-x pt-16 sm:pt-20" aria-labelledby="popular-title">
      <SectionHeading eyebrow="Popular Destinations" title={<span id="popular-title">Places That Inspire</span>} action="View All Destinations" actionTo="/destinations" />
      <div className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-4 sm:mx-0 sm:grid sm:grid-cols-3 sm:overflow-visible sm:px-0 lg:grid-cols-5">
        {items.map((destination, i) => (
          <Reveal key={destination.slug} delay={i * 70} className="w-[68%] shrink-0 snap-start sm:w-auto">
            <DestinationCard destination={destination} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
