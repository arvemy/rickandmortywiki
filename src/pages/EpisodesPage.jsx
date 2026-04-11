import { startTransition, ViewTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getEpisodes } from '../services/api'
import useFetch from '../hooks/useFetch'
import EpisodeCard from '../components/EpisodeCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { formatNumber } from '../utils/formatters'

const SEASON_RE = /S(\d+)/

function groupBySeason(episodes) {
  const groups = {}
  episodes.forEach(ep => {
    const season = ep.episode.match(SEASON_RE)?.[1] || '??'
    const seasonNumber = Number.parseInt(season, 10)
    const key = Number.isNaN(seasonNumber) ? 'Unknown Season' : `Season ${seasonNumber}`
    if (!groups[key]) groups[key] = []
    groups[key].push(ep)
  })
  return Object.entries(groups)
}

export default function EpisodesPage() {
  usePageMeta({
    title: 'Episodes',
    description:
      'Search every Rick and Morty episode, browse grouped seasons, and open detailed episode pages with full character rosters.',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1)
  const name = searchParams.get('name') || ''

  const { data, loading, error, retry } = useFetch(
    (signal) => getEpisodes(page, { name }, { signal }),
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

  const seasonGroups = data ? groupBySeason(data.results) : []

  return (
    <ViewTransition
      enter={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      exit={{ 'nav-forward': 'nav-forward', 'nav-back': 'nav-back', default: 'none' }}
      default="none"
    >
      <div className="mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl font-bold tracking-tight" style={{ textWrap: 'balance' }}>Episodes</h1>

        <div className="mb-8 max-w-md">
          <SearchBar
            label="Search episodes"
            name="episode-search"
            value={name}
            onChange={v => updateParams({ name: v })}
            placeholder="Search episodes by name…"
          />
        </div>

        {loading ? (
          <LoadingSpinner className="min-h-[90vh]" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : data?.results.length === 0 ? (
          <EmptyState
            title="No Episodes Found"
            description="Try a broader episode name to bring matching results back into view."
          />
        ) : data ? (
          <>
            <p className="mb-6 text-sm text-gray-400">{formatNumber(data.info.count)} episodes found</p>
            {seasonGroups.map(([season, eps]) => (
              <div key={season} className="mb-8">
                <h2 className="mb-3 font-display text-lg font-semibold tracking-tight text-electric-blue">{season}</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {eps.map((ep, i) => (
                    <ViewTransition key={ep.id} enter="fade-in" exit="fade-out" default="none">
                      <div className="animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                        <EpisodeCard episode={ep} />
                      </div>
                    </ViewTransition>
                  ))}
                </div>
              </div>
            ))}
            <Pagination
              page={page}
              pages={data.info.pages}
              onPageChange={p => updateParams({ page: p <= 1 ? '' : String(p) })}
            />
          </>
        ) : null}
      </div>
    </ViewTransition>
  )
}
