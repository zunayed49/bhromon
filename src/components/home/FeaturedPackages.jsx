import { packages } from '../../data/packages'
import PackageCard from '../cards/PackageCard'
import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'

export default function FeaturedPackages() {
  return (
    <section className="container-x pt-16 sm:pt-20" aria-labelledby="packages-title">
      <SectionHeading eyebrow="Featured Packages" title={<span id="packages-title">Curated Just for You</span>} action="View All Packages" actionTo="/packages" />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {packages.slice(0, 4).map((pkg, i) => (
          <Reveal key={pkg.id} delay={i * 80}>
            <PackageCard pkg={pkg} />
          </Reveal>
        ))}
      </div>
    </section>
  )
}
