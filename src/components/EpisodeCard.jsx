import { Link } from 'react-router-dom'
import { formatDate } from '../utils/formatters'

export default function EpisodeCard({ episode }) {
  return (
    <Link
      to={`/episodes/${episode.id}`}
      className="group block rounded-xl border border-border-glass border-l-[3px] border-l-electric-blue/30 bg-surface-solid p-5 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-l-electric-blue hover:border-electric-blue/30 hover:shadow-[0_0_24px_rgba(56,189,248,0.1)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
    >
      <span className="inline-block rounded-md bg-electric-blue/10 px-2.5 py-0.5 text-xs font-bold text-electric-blue">
        {episode.episode}
      </span>
      <h3 className="mt-2 truncate font-display text-base font-semibold text-copy group-hover:text-electric-blue" style={{ textWrap: 'balance' }}>
        {episode.name}
      </h3>
      <p className="mt-2 text-xs text-copy-muted">{formatDate(episode.air_date)}</p>
    </Link>
  )
}
