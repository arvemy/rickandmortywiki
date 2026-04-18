import { Link, useParams } from 'react-router-dom'
import { getLocationById, getCharactersByIds, extractIds } from '../services/api'
import useFetch from '../hooks/useFetch'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import CharacterMiniCard from '../components/CharacterMiniCard'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { formatLabel, formatNumber } from '../utils/formatters'

export default function LocationDetailPage() {
  const { id } = useParams()

  const { data, loading, error, retry } = useFetch(async (signal) => {
    const loc = await getLocationById(id, { signal })
    const charIds = extractIds(loc.residents)
    const residents = charIds.length > 0 ? await getCharactersByIds(charIds, { signal }) : []
    return { location: loc, residents }
  }, [id])

  usePageMeta({
    title: !loading && data ? data.location.name : 'Location',
    description: !loading && data
      ? `${data.location.name} is a ${data.location.type.toLowerCase()} in ${data.location.dimension} with ${formatNumber(data.residents.length)} known residents.`
      : 'Explore a Rick and Morty location profile with its type, dimension, and known residents.',
    robots: error ? 'noindex,follow' : 'index,follow',
  })

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {loading ? <LoadingSpinner className="min-h-[90vh]" /> :
       error ? <ErrorMessage message={error} onRetry={retry} /> :
       data ? <LocationDetail data={data} /> : null}
    </div>
  )
}

function LocationDetail({ data }) {
  const { location, residents } = data

  return (
    <>
      <Link
        to="/locations"
        className="mb-6 inline-flex items-center gap-1.5 rounded-lg border border-border-glass bg-surface-glass px-3 py-1.5 text-sm text-gray-400 backdrop-blur-sm transition-[border-color,color] hover:border-portal-green/30 hover:text-portal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Locations
      </Link>

      <div className="relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass p-6 backdrop-blur-sm">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(57,231,95,0.04)_0%,transparent_60%)]" />
        <div className="relative">
          <h1 className="font-display text-3xl font-bold tracking-tight">{location.name}</h1>
          <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-sm">
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Type</dt>
              <dd className="mt-0.5">
                <span className="inline-block rounded-md bg-portal-green/10 px-2 py-0.5 text-xs font-medium text-portal-green">
                  {formatLabel(location.type)}
                </span>
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-semibold uppercase tracking-[0.15em] text-gray-400">Dimension</dt>
              <dd className="mt-0.5 text-gray-200">{formatLabel(location.dimension)}</dd>
            </div>
          </dl>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-5 font-display text-xl font-bold tracking-tight">
          Residents <span className="text-gray-400">({formatNumber(residents.length)})</span>
        </h2>
        {residents.length === 0 ? (
          <EmptyState
            title="No Residents Listed"
            description="This location does not currently have any known residents in the dataset."
          />
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {residents.map((c, i) => (
              <div key={c.id} className="animate-card-enter" style={{ animationDelay: `${i * 40}ms` }}>
                <CharacterMiniCard character={c} priority={i < 4} />
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  )
}
