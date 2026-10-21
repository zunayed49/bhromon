import { IMG, PEOPLE } from './images'

export const testimonials = [
  {
    name: 'Nusrat Jahan',
    from: 'Dhaka',
    trip: 'Hill Tracts Explorer',
    avatar: PEOPLE.nusrat,
    rating: 5,
    quote: 'Our Sajek trip was perfectly planned! Waking up above the clouds felt unreal, and every transfer ran on time.',
  },
  {
    name: 'Tanvir Ahmed',
    from: 'Chattogram',
    trip: 'Sundarbans Safari',
    avatar: PEOPLE.tanvir,
    rating: 5,
    quote: 'Best travel experience ever! The guides knew every creek of the Sundarbans and the boat crew treated us like family.',
  },
  {
    name: 'Farhana Rahman',
    from: 'Sylhet',
    trip: 'Saint Martin\'s Escape',
    avatar: PEOPLE.farhana,
    rating: 5,
    quote: 'Professional, friendly and truly passionate about travel. The island cottage was a dream. Highly recommend!',
  },
  {
    name: 'Arif Hossain',
    from: 'Rajshahi',
    trip: "Cox's Bazar Sea Breeze",
    avatar: PEOPLE.arif,
    rating: 4,
    quote: 'Travelling with two kids and my parents was stress-free. Hotel, train and the Marine Drive day were all sorted for us.',
  },
  {
    name: 'Sadia Islam',
    from: 'Khulna',
    trip: 'Sylhet Tea Trails',
    avatar: PEOPLE.sadia,
    rating: 5,
    quote: 'The boat ride through Ratargul was magical. Small group, great food and a guide who made us fall in love with Sylhet.',
  },
  {
    name: 'Imran Chowdhury',
    from: 'Toronto, Canada',
    trip: 'Grand Bangladesh Circuit',
    avatar: PEOPLE.imran,
    rating: 5,
    quote: 'Coming home after ten years, I wanted to see it properly. Bhromon showed me a Bangladesh I never knew existed.',
  },
]

export const guides = [
  {
    slug: 'must-visit-places-in-sylhet',
    title: '10 Must-Visit Places in Sylhet for Nature Lovers',
    date: '2026-09-15',
    category: 'Destinations',
    readTime: 6,
    image: IMG.jaflongHills,
    excerpt: 'From the flooded forest of Ratargul to the stone rivers of Jaflong, Sylhet is Bangladesh at its greenest.',
    body: [
      'Sylhet sits in the far north-east of Bangladesh, cradled by the hills of Meghalaya. Monsoon rains feed its rivers, haors and forests, which is why the region stays green almost all year round.',
      'Start in Srimangal, where tea estates cover every hill. Walk the Lawachara trail early in the morning to hear hoolock gibbons, then reward yourself with a glass of the famous seven-layer tea.',
      'Further north, Ratargul swamp forest and the Bisnakandi stone fields are best seen between June and September, when the water is high. Jaflong and Lalakhal are beautiful in every season thanks to their clear blue-green rivers.',
      'Round off your trip at the Shahjalal shrine in Sylhet city and try a bowl of shatkora beef, a local speciality you will not find anywhere else.',
    ],
  },
  {
    slug: 'budget-trip-to-coxs-bazar',
    title: "How to Plan a Budget Trip to Cox's Bazar",
    date: '2026-09-10',
    category: 'Budget Travel',
    readTime: 5,
    image: IMG.coxWaves,
    excerpt: "Train tickets, off-season deals and local food: how to enjoy the world's longest beach without overspending.",
    body: [
      "Since the direct train line opened, getting to Cox's Bazar has never been cheaper. Book an AC chair or berth on the Dhaka to Cox's Bazar express a few weeks ahead and you will arrive refreshed.",
      'Stay a few streets back from the beachfront in Kolatoli for the best value. Rooms that face the road rather than the sea often cost half as much and are only a five-minute walk from the sand.',
      'Eat where the locals eat. Fresh pomfret and coral fish are cooked to order at the small beachside stalls, and the Burmese market is great for snacks and souvenirs.',
      'Finally, travel in the shoulder months of October or March. You still get sunny days but far fewer crowds and much lower prices.',
    ],
  },
  {
    slug: 'what-to-pack-for-the-hill-tracts',
    title: 'Travel Essentials: What to Pack for the Hill Tracts',
    date: '2026-09-05',
    category: 'Travel Tips',
    readTime: 4,
    image: IMG.packing,
    excerpt: 'Steep trails, sudden showers and chilly sunrises: the smart packing list for Bandarban and Sajek.',
    body: [
      'Hill roads in Bandarban and Sajek are steep and often muddy, so good grip matters more than style. Pack trail shoes or sports sandals with straps for river crossings.',
      'Mornings can be surprisingly cold between November and February. A light fleece and a windproof layer will keep you comfortable at sunrise viewpoints.',
      'Carry your national ID or passport copies at all times. Several checkpoints in the Hill Tracts require registration, and foreign visitors need a permit arranged in advance.',
      'Add a power bank, a reusable water bottle, insect repellent and a small first-aid kit. Mobile coverage is patchy, so download offline maps before you leave.',
    ],
  },
  {
    slug: 'old-dhaka-rickshaw-food-trail',
    title: 'A Rickshaw & Food Trail Through Old Dhaka',
    date: '2026-08-28',
    category: 'Food & Culture',
    readTime: 7,
    image: IMG.rickshaw,
    excerpt: 'Kacchi biryani, bakarkhani and Mughal forts: one perfect day in the oldest corner of the capital.',
    body: [
      'Old Dhaka is best explored slowly, from the seat of a cycle rickshaw. Start early at Lalbagh Fort before the heat and crowds arrive.',
      'Walk through Shankhari Bazar, the street of conch-shell carvers, and continue to the pink domes of Ahsan Manzil on the Buriganga river.',
      'Lunch is the main event. Kacchi biryani in Nazira Bazar, a glass of thick lassi and warm bakarkhani bread from a clay oven are non-negotiable.',
      'End the day at Sadarghat, where hundreds of wooden boats and giant river launches create one of the most spectacular scenes in South Asia.',
    ],
  },
  {
    slug: 'sundarbans-responsible-wildlife-guide',
    title: 'Seeing the Sundarbans Responsibly',
    date: '2026-08-20',
    category: 'Wildlife',
    readTime: 5,
    image: IMG.forestTrail,
    excerpt: 'How to choose an ethical operator, stay safe on forest walks and leave the mangroves better than you found them.',
    body: [
      'The Sundarbans is a protected forest, and every visit must be made with a licensed operator, forest permits and armed forest guards. Never enter the forest on your own.',
      'Choose operators that limit group size, avoid single-use plastic and do not play loud music on deck. Wildlife sightings are far more likely on quiet boats.',
      'On land, stay in single file behind your guide and keep your voice low. Spotted deer, macaques and kingfishers are common, while tigers are shy and rarely seen.',
      'Tip your boat crew and guides fairly. Tourism income helps local communities protect the forest instead of depending on it for timber and honey.',
    ],
  },
  {
    slug: 'monsoon-magic-in-bangladesh',
    title: 'Monsoon Magic: Why Bangladesh Shines in the Rain',
    date: '2026-08-12',
    category: 'Seasons',
    readTime: 4,
    image: IMG.paddyPalms,
    excerpt: 'Waterfalls in full flow, flooded forests and clouds rolling through the hills. The rainy season is a secret worth sharing.',
    body: [
      'Most visitors avoid Bangladesh between June and September, but that is when the country is at its most dramatic.',
      'Sajek Valley is wrapped in clouds almost every morning, the waterfalls of Bandarban roar back to life and Ratargul becomes a true floating forest.',
      'The haors of Sunamganj turn into inland seas. Spend a night on a traditional houseboat on Tanguar Haor for a trip you will never forget.',
      'Pack a light rain jacket, quick-dry clothes and a waterproof phone pouch, and always check weather and landslide warnings before heading into the hills.',
    ],
  },
]

export const getGuide = (slug) => guides.find((g) => g.slug === slug)

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })

const taka = new Intl.NumberFormat('en-IN')
export const formatPrice = (amount) => `৳${taka.format(amount)}`
