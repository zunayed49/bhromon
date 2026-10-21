import { useState } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'
import { CheckCircle2, ChevronDown, Clock, LoaderCircle, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import { IMG } from '../data/images'
import { useDocumentTitle } from '../hooks/useDocumentTitle'

const TOPICS = {
  plan: 'Plan a custom trip',
  hotels: 'Hotel booking',
  activities: 'Activities & experiences',
  group: 'Corporate or group tour',
  other: 'Something else',
}

const CONTACTS = [
  { icon: Phone, title: 'Call us', lines: ['+880 1792-574749', 'Sat – Thu, 9 AM – 8 PM'], href: 'tel:+8801792574749' },
  { icon: MessageCircle, title: 'WhatsApp', lines: ['+880 1792-574749', 'Replies within an hour'], href: 'https://wa.me/8801792574749' },
  { icon: Mail, title: 'Email', lines: ['hello@bhromon.com.bd', 'We reply within 24 hours'], href: 'mailto:hello@bhromon.com.bd' },
  { icon: MapPin, title: 'Visit us', lines: ['House 42, Road 11, Banani', 'Dhaka 1213'] },
]

const FAQS = [
  {
    q: 'How do I book a tour?',
    a: 'Choose a package and send a booking request, or fill in this form for a custom trip. A planner will call you to confirm details. You pay a 30% deposit only after everything is confirmed.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'Cancel up to 7 days before departure for a full refund of your deposit. Cancellations within 7 days are refunded minus costs we cannot recover, such as ship or train tickets.',
  },
  {
    q: 'Do foreign travellers need special permits?',
    a: "Visitors to the Chattogram Hill Tracts need a permit, and Saint Martin's Island has seasonal visitor limits. We arrange all permits for you, so just share your passport details at least 10 days ahead.",
  },
  {
    q: 'Is it safe to travel in Bangladesh?',
    a: 'Yes. Our trips use licensed transport, vetted accommodation and experienced local guides, and every traveller has access to our 24/7 support line throughout the journey.',
  },
  {
    q: 'How do you handle my personal data?',
    a: 'We only use your details to plan and operate your trip, share them only with the hotels and transport providers involved, and never sell them to third parties.',
  },
]

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

// Builds the starting form state from the query string, e.g. /contact?topic=hotels&q=Sylhet&travellers=3
function initialForm(params) {
  const topic = TOPICS[params.get('topic')] ? params.get('topic') : 'plan'
  const destination = params.get('destination') ?? params.get('q') ?? ''
  const travellers = params.get('travellers') ?? ''
  const date = params.get('date') ?? ''
  const details = [
    destination && `Destination: ${destination}`,
    date && `Travel date: ${date}`,
    travellers && `Travellers: ${travellers}`,
  ].filter(Boolean)
  return {
    name: '',
    email: '',
    phone: '',
    topic,
    message: details.length ? `Hi Bhromon team,\n\n${details.join('\n')}\n\n` : '',
  }
}

function validate(form) {
  const errors = {}
  if (form.name.trim().length < 2) errors.name = 'Please tell us your name.'
  if (!EMAIL_PATTERN.test(form.email.trim())) errors.email = 'Please enter a valid email address.'
  if (form.phone && !/^\+?[\d\s-]{7,16}$/.test(form.phone.trim())) errors.phone = 'Please enter a valid phone number.'
  if (form.message.trim().length < 10) errors.message = 'Tell us a little more about your trip (at least 10 characters).'
  return errors
}

function Field({ id, label, error, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 flex justify-between text-xs font-semibold text-ink/60">
        {label}
        {optional && <span className="font-normal text-ink/40">Optional</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs font-medium text-rose-600">
          {error}
        </p>
      )}
    </div>
  )
}

// Re-mount the page when the query string changes (e.g. clicking "Plan Your Trip" while
// already on /contact) so the form is re-seeded from the new parameters.
export default function Contact() {
  const { search } = useLocation()
  return <ContactPage key={search} />
}

function ContactPage() {
  useDocumentTitle('Contact')
  const [params] = useSearchParams()
  const [form, setForm] = useState(() => initialForm(params))
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent
  const [openFaq, setOpenFaq] = useState(0)

  const update = (key) => (event) => {
    setForm((f) => ({ ...f, [key]: event.target.value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const found = validate(form)
    setErrors(found)
    if (Object.keys(found).length) {
      document.getElementById(Object.keys(found)[0])?.focus()
      return
    }
    setStatus('sending')
    // No backend in this demo: pretend the request takes a moment.
    setTimeout(() => setStatus('sent'), 1100)
  }

  const fieldProps = (key) => ({
    id: key,
    value: form[key],
    onChange: update(key),
    'aria-invalid': Boolean(errors[key]),
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: `field ${errors[key] ? 'border-rose-400 bg-rose-50/50' : ''}`,
  })

  return (
    <>
      <PageHeader
        image={IMG.kaptaiHills}
        eyebrow="Contact"
        title="Let's Plan Your Journey"
        subtitle="Tell us where you dream of going. A local trip planner will get back to you with a personalised itinerary."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="container-x grid gap-10 py-12 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-4">
          {CONTACTS.map(({ icon: Icon, title, lines, href }) => {
            const Wrapper = href ? 'a' : 'div'
            return (
              <Wrapper
                key={title}
                {...(href ? { href, target: href.startsWith('http') ? '_blank' : undefined, rel: 'noreferrer' } : {})}
                className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-card transition hover:shadow-lift"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-leaf-200 text-forest-900">
                  <Icon className="size-5" />
                </span>
                <div>
                  <p className="font-bold text-forest-950">{title}</p>
                  {lines.map((line) => (
                    <p key={line} className="text-sm text-ink/60">
                      {line}
                    </p>
                  ))}
                </div>
              </Wrapper>
            )
          })}
          <div className="flex items-center gap-3 rounded-2xl bg-forest-900 p-5 text-sm text-white">
            <Clock className="size-5 shrink-0 text-leaf-300" />
            Already travelling with us? Our 24/7 emergency line is printed on your trip voucher.
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-card sm:p-8">
          {status === 'sent' ? (
            <div className="grid min-h-96 animate-scale-in place-items-center text-center" role="status">
              <div>
                <CheckCircle2 className="mx-auto size-14 text-forest-600" />
                <h2 className="mt-4 text-2xl font-extrabold text-forest-950">Thank you, {form.name.split(' ')[0]}!</h2>
                <p className="mx-auto mt-2 max-w-sm text-ink/60">
                  Your message about &ldquo;{TOPICS[form.topic].toLowerCase()}&rdquo; is with our team. We&apos;ll reply to{' '}
                  {form.email} within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialForm(new URLSearchParams()))
                    setStatus('idle')
                  }}
                  className="btn-outline mt-6"
                >
                  Send another message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate className="grid gap-5 sm:grid-cols-2">
              <h2 className="text-2xl font-extrabold text-forest-950 sm:col-span-2">Send us a message</h2>
              <Field id="name" label="Full name" error={errors.name}>
                <input {...fieldProps('name')} autoComplete="name" placeholder="e.g. Nusrat Jahan" />
              </Field>
              <Field id="email" label="Email" error={errors.email}>
                <input {...fieldProps('email')} type="email" autoComplete="email" placeholder="you@example.com" />
              </Field>
              <Field id="phone" label="Phone" error={errors.phone} optional>
                <input {...fieldProps('phone')} type="tel" autoComplete="tel" placeholder="+880 1XXX-XXXXXX" />
              </Field>
              <Field id="topic" label="I'm interested in">
                <div className="relative">
                  <select {...fieldProps('topic')} className="field cursor-pointer appearance-none pr-10">
                    {Object.entries(TOPICS).map(([key, label]) => (
                      <option key={key} value={key}>
                        {label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-ink/40" />
                </div>
              </Field>
              <div className="sm:col-span-2">
                <Field id="message" label="Your message" error={errors.message}>
                  <textarea {...fieldProps('message')} rows={6} placeholder="Where would you like to go, when, and with whom?" />
                </Field>
              </div>
              <div className="flex flex-col gap-3 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-ink/50">We never share your details with anyone outside your trip.</p>
                <button type="submit" disabled={status === 'sending'} className="btn-primary px-7 py-3">
                  {status === 'sending' ? <LoaderCircle className="size-4 animate-spin" /> : <Send className="size-4" />}
                  {status === 'sending' ? 'Sending…' : 'Send Message'}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      <section id="faq" className="container-x scroll-mt-24 pb-12">
        <p className="eyebrow">FAQs & Policies</p>
        <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-forest-950">Good to know before you go</h2>
        <div className="mt-6 divide-y divide-forest-900/10 rounded-3xl bg-white px-6 shadow-card">
          {FAQS.map((faq, i) => {
            const open = openFaq === i
            return (
              <div key={faq.q}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? -1 : i)}
                  aria-expanded={open}
                  aria-controls={`faq-${i}`}
                  className="flex w-full cursor-pointer items-center justify-between gap-4 py-5 text-left font-bold text-forest-950"
                >
                  {faq.q}
                  <ChevronDown className={`size-5 shrink-0 text-ink/40 transition ${open ? 'rotate-180' : ''}`} />
                </button>
                <div id={`faq-${i}`} className={`grid transition-all duration-300 ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
                  <div className="overflow-hidden">
                    <p className="pb-5 text-sm leading-relaxed text-ink/65">{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </>
  )
}
