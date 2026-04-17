import TransitionLink from './TransitionLink'
import { formatLabel } from '../utils/formatters'

export default function LocationCard({ location }) {
  return (
    <TransitionLink
      to={`/locations/${location.id}`}
      types={['nav-forward']}
      className="group block rounded-xl border border-border-glass border-l-[3px] border-l-portal-green/25 bg-dark-800 p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-l-portal-green hover:border-portal-green/30 hover:shadow-[0_0_24px_rgba(57,231,95,0.1)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
    >
      <p className="truncate font-display text-base font-semibold text-gray-100 group-hover:text-portal-green">
        {location.name}
      </p>
      <p className="mt-2 inline-block rounded bg-portal-green/10 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-portal-green/70">
        {formatLabel(location.type)}
      </p>
      <p className="mt-1.5 truncate text-xs text-gray-400">{formatLabel(location.dimension)}</p>
    </TransitionLink>
  )
}
