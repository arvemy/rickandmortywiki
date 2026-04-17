import { formatLabel } from '../utils/formatters'

const colors = {
  Alive: 'bg-emerald-500/15 text-emerald-200',
  Dead: 'bg-rose-500/15 text-rose-200',
  unknown: 'bg-slate-500/20 text-slate-200',
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
