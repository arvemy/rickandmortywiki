import { Link, useParams } from 'react-router-dom'
import { getEpisodeById, getCharactersByIds, extractIds } from '../services/api'
import useFetch from '../hooks/useFetch'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import CharacterMiniCard from '../components/CharacterMiniCard'
import usePageMeta from '../hooks/usePageMeta'
import { formatDate, formatNumber } from '../utils/formatters'

export default function EpisodeDetailPage() {
  const { id } = useParams()

  const { data, loading, error, retry } = useFetch(async (signal) => {
    const ep = await getEpisodeById(id, { signal })
    const charIds = extractIds(ep.characters)
    const chars = await getCharactersByIds(charIds, { signal })
    return { episode: ep, characters: chars }
  }, [id])

  usePageMeta({
    title: !loading && data ? data.episode.name : 'Episode',
    description: !loading && data
      ? `${data.episode.episode} aired on ${formatDate(data.episode.air_date)} and features ${formatNumber(data.characters.length)} characters.`
      : 'Browse a Rick and Morty episode summary and the full list of characters that appear in it.',
    robots: error ? 'noindex,follow' : 'index,follow',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {loading ? <LoadingSpinner className="min-h-[90vh]" /> :
       error ? <ErrorMessage message={error} onRetry={retry} /> :
       data ? <EpisodeDetail data={data} /> : null}
    </div>
  )
}

function EpisodeDetail({ data }) {
  const { episode, characters } = data

  return (
    <>
      <Link
        to="/episodes"
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-border-glass bg-surface-glass px-3 py-1.5 text-sm text-copy-muted backdrop-blur-sm transition-[border-color,color] hover:border-electric-blue/30 hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Episodes
      </Link>

      <div className="relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass p-6 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(56,189,248,0.06)_0%,transparent_60%)]" />
        <div className="relative">
          <span className="inline-block rounded-md bg-electric-blue/10 px-2.5 py-1 font-display text-sm font-bold text-electric-blue">
            {episode.episode}
          </span>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight">{episode.name}</h1>
          <p className="mt-2 text-sm text-copy-muted">
            Aired: <span className="text-accent-amber">{formatDate(episode.air_date)}</span>
          </p>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-xl font-bold tracking-tight">
          Characters <span className="text-copy-muted">({formatNumber(characters.length)})</span>
        </h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {characters.map((c, i) => (
            <div key={c.id} className="animate-card-enter" style={{ animationDelay: `${i * 40}ms` }}>
              <CharacterMiniCard character={c} priority={i < 4} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
