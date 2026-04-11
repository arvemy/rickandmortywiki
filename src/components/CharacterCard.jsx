import { ViewTransition } from 'react'
import TransitionLink from './TransitionLink'
import StatusBadge from './StatusBadge'
import { getOptimizedImageUrl } from '../services/media'

export default function CharacterCard({ character, priority = false }) {
  const imageSrc = getOptimizedImageUrl(character.image, { width: priority ? 760 : 600 })

  return (
    <TransitionLink
      to={`/characters/${character.id}`}
      types={['nav-forward']}
      className="group relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-portal-green/20 hover:shadow-[0_0_30px_rgba(57,231,95,0.08)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
    >
      <div className="relative overflow-hidden">
        <ViewTransition name={`char-img-${character.id}`} share="morph" default="none">
          <img
            src={imageSrc}
            alt={character.name}
            width={300}
            height={300}
            sizes="(min-width: 1024px) 22rem, (min-width: 768px) 30vw, (min-width: 640px) 46vw, 100vw"
            className="h-52 w-full object-cover transition-transform duration-500 group-hover:scale-110"
            decoding="async"
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : 'auto'}
          />
        </ViewTransition>
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark-950/80 via-transparent to-transparent" />
      </div>
      <div className="p-4">
        <p className="truncate font-display text-base font-semibold text-gray-100 group-hover:text-portal-green">
          {character.name}
        </p>
        <div className="mt-2 flex items-center gap-2">
          <StatusBadge status={character.status} />
          <span className="text-sm text-gray-400">{character.species}</span>
        </div>
      </div>
    </TransitionLink>
  )
}
