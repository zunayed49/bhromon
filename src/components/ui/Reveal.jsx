import { useInView } from '../../hooks/useInView'

// Fades and lifts its children into place the first time they scroll into view.
export default function Reveal({ as: Tag = 'div', delay = 0, className = '', children, ...rest }) {
  const [ref, inView] = useInView()
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-[cubic-bezier(.2,.7,.2,1)] ${
        inView ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  )
}
