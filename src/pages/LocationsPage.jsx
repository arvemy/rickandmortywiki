import { startTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getLocations } from '../services/api'
import useFetch from '../hooks/useFetch'
import LocationCard from '../components/LocationCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { formatNumber } from '../utils/formatters'

export default function LocationsPage() {
  usePageMeta({
    title: 'Locations',
    description:
      'Search planets, dimensions, and stations across the Rick and Morty multiverse, then open full location profiles and resident lists.',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1)
  const name = searchParams.get('name') || ''

  const { data, loading, error, retry } = useFetch(
    (signal) => getLocations(page, { name }, { signal }),
    [page, name],
  )

  const commitParams = (next) => {
    startTransition(() => {
      setSearchParams(next)
    })
  }

  const updateParams = (updates) => {
    const next = new URLSearchParams(searchParams)
    Object.entries(updates).forEach(([k, v]) => {
      if (v) next.set(k, v)
      else next.delete(k)
    })
    if (updates.name !== undefined) next.delete('page')
    commitParams(next)
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl font-bold tracking-tight" style={{ textWrap: 'balance' }}>Locations</h1>

        <div className="mb-8 max-w-md">
          <SearchBar
            label="Search locations"
            name="location-search"
            value={name}
            onChange={v => updateParams({ name: v })}
            placeholder="Search locations by name…"
          />
        </div>

        {loading ? (
          <LoadingSpinner className="min-h-[90vh]" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : data?.results.length === 0 ? (
          <EmptyState
            title="No Locations Found"
            description="Try a broader location name or clear the current search to explore more places."
          />
        ) : data ? (
          <>
            <p className="mb-4 text-sm text-gray-400">{formatNumber(data.info.count)} locations found</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {data.results.map((loc, i) => (
                <div key={loc.id} className="animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                  <LocationCard location={loc} />
                </div>
              ))}
            </div>
            <Pagination
              page={page}
              pages={data.info.pages}
              onPageChange={p => updateParams({ page: p <= 1 ? '' : String(p) })}
            />
          </>
        ) : null}
    </div>
  )
}
