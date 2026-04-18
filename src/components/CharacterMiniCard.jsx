import TransitionLink from './TransitionLink'
import StatusBadge from './StatusBadge'
import FallbackImage from './FallbackImage'
import { getOptimizedImageUrl } from '../services/media'

export default function CharacterMiniCard({ character, priority = false }) {
  const imageSrc = getOptimizedImageUrl(character.image, { width: priority ? 480 : 360 })

  return (
    <TransitionLink
      to={`/characters/${character.id}`}
      types={['nav-forward']}
      className="group relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-portal-green/20 hover:shadow-[0_0_20px_rgba(57,231,95,0.08)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
    >
      <div className="relative overflow-hidden">
        <FallbackImage
          src={imageSrc}
          fallbackSrc={character.image}
          alt=""
          width={300}
          height={300}
          sizes="(min-width: 1024px) 10rem, (min-width: 768px) 20vw, 45vw"
          className="h-36 w-full object-cover transition-transform duration-500 group-hover:scale-110"
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
        />
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-dark-950/70 via-transparent to-transparent" />
      </div>
      <div className="p-2.5">
        <p className="truncate font-display text-sm font-medium group-hover:text-portal-green">{character.name}</p>
        <StatusBadge status={character.status} />
      </div>
    </TransitionLink>
  )
}
