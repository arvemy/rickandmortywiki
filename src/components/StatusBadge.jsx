import { formatLabel } from '../utils/formatters'

const colors = {
  Alive: 'bg-alive/15 text-alive',
  Dead: 'bg-dead/15 text-dead',
  unknown: 'bg-unknown-status/15 text-unknown-status',
}

export default function StatusBadge({ status }) {
  const cls = colors[status] || colors.unknown
  const isAlive = status === 'Alive'
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      <span
        className={`inline-block h-1.5 w-1.5 rounded-full bg-current ${isAlive ? 'animate-[pulse-dot_2s_ease-in-out_infinite]' : ''}`}
      />
      {formatLabel(status)}
    </span>
  )
}
