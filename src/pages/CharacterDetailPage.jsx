import { useParams } from 'react-router-dom'
import { getCharacterById, getEpisodesByIds, extractId, extractIds } from '../services/api'
import useFetch from '../hooks/useFetch'
import TransitionLink from '../components/TransitionLink'
import StatusBadge from '../components/StatusBadge'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import FallbackImage from '../components/FallbackImage'
import usePageMeta from '../hooks/usePageMeta'
import { getOptimizedImageUrl } from '../services/media'
import { formatLabel, formatNumber } from '../utils/formatters'

export default function CharacterDetailPage() {
  const { id } = useParams()

  const { data, loading, error, retry } = useFetch(async (signal) => {
    const char = await getCharacterById(id, { signal })
    const epIds = extractIds(char.episode)
    const eps = await getEpisodesByIds(epIds, { signal })
    return { character: char, episodes: eps }
  }, [id])

  usePageMeta({
    title: !loading && data ? data.character.name : 'Character',
    description: !loading && data
      ? `${data.character.name} is a ${data.character.status.toLowerCase()} ${data.character.species.toLowerCase()} from ${data.character.origin.name}.`
      : 'Explore a Rick and Morty character profile with status, origin, last known location, and episode appearances.',
    robots: error ? 'noindex,follow' : 'index,follow',
  })

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      {loading ? <LoadingSpinner className="min-h-[90vh]" /> :
       error ? <ErrorMessage message={error} onRetry={retry} /> :
       data ? <CharacterDetail data={data} /> : null}
    </div>
  )
}

const statusBorderColor = {
  Alive: 'border-l-alive',
  Dead: 'border-l-dead',
  unknown: 'border-l-unknown-status',
}

function CharacterDetail({ data }) {
  const { character, episodes } = data
  const originId = character.origin?.url ? extractId(character.origin.url) : null
  const locationId = character.location?.url ? extractId(character.location.url) : null
  const borderCls = statusBorderColor[character.status] || statusBorderColor.unknown
  const imageSrc = getOptimizedImageUrl(character.image, { width: 720 })

  return (
    <>
      <TransitionLink
        to="/characters"
        types={['nav-back']}
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-border-glass bg-surface-glass px-3 py-1.5 text-sm text-gray-400 backdrop-blur-sm transition-[border-color,color] hover:border-electric-blue/30 hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Characters
      </TransitionLink>

      <div className={`relative overflow-hidden rounded-xl border border-border-glass border-l-[3px] ${borderCls} bg-surface-glass backdrop-blur-sm md:flex`}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(57,231,95,0.04)_0%,transparent_60%)]" />
        <FallbackImage
          src={imageSrc}
          fallbackSrc={character.image}
          alt={character.name}
          width={300}
          height={300}
          fetchPriority="high"
          sizes="(min-width: 768px) 18rem, 100vw"
          className="relative h-80 w-full object-cover md:h-auto md:w-72"
        />
        <div className="relative flex-1 p-6">
          <h1 className="font-display text-3xl font-bold tracking-tight">{character.name}</h1>
          <div className="mt-2">
            <StatusBadge status={character.status} />
          </div>

          <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Species</dt>
              <dd className="mt-1 text-gray-200">{formatLabel(character.species)}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Gender</dt>
              <dd className="mt-1 text-gray-200">{formatLabel(character.gender)}</dd>
            </div>
            {character.type && (
              <div>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Type</dt>
                <dd className="mt-1 text-gray-200">{formatLabel(character.type)}</dd>
              </div>
            )}
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Origin</dt>
              <dd className="mt-1">
                {originId && character.origin.name !== 'unknown' ? (
                  <TransitionLink to={`/locations/${originId}`} types={['nav-forward']} className="text-electric-blue transition-colors hover:text-electric-blue-dim hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded">
                    {formatLabel(character.origin.name)}
                  </TransitionLink>
                ) : (
                  <span className="text-gray-400">{formatLabel(character.origin.name)}</span>
                )}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Last Known Location</dt>
              <dd className="mt-1">
                {locationId && character.location.name !== 'unknown' ? (
                  <TransitionLink to={`/locations/${locationId}`} types={['nav-forward']} className="text-electric-blue transition-colors hover:text-electric-blue-dim hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded">
                    {formatLabel(character.location.name)}
                  </TransitionLink>
                ) : (
                  <span className="text-gray-400">{formatLabel(character.location.name)}</span>
                )}
              </dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-xl font-bold tracking-tight">
          Episode Appearances <span className="text-gray-400">({formatNumber(episodes.length)})</span>
        </h2>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {episodes.map((ep, i) => (
            <TransitionLink
              key={ep.id}
              to={`/episodes/${ep.id}`}
              types={['nav-forward']}
              className="animate-card-enter rounded-lg border border-border-glass bg-surface-glass p-3 text-sm backdrop-blur-sm transition-[border-color,box-shadow] hover:border-electric-blue/20 hover:shadow-[0_0_16px_rgba(56,189,248,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <span className="font-display font-bold text-electric-blue">{ep.episode}</span>
              <span className="ml-2 text-gray-300">{ep.name}</span>
            </TransitionLink>
          ))}
        </div>
      </section>
    </>
  )
}
