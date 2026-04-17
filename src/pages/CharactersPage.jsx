import { startTransition } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getCharacters } from '../services/api'
import useFetch from '../hooks/useFetch'
import CharacterCard from '../components/CharacterCard'
import SearchBar from '../components/SearchBar'
import Pagination from '../components/Pagination'
import LoadingSpinner from '../components/LoadingSpinner'
import ErrorMessage from '../components/ErrorMessage'
import EmptyState from '../components/EmptyState'
import usePageMeta from '../hooks/usePageMeta'
import { formatLabel, formatNumber } from '../utils/formatters'

const STATUS_OPTIONS = ['', 'Alive', 'Dead', 'unknown']
const GENDER_OPTIONS = ['', 'Male', 'Female', 'Genderless', 'unknown']

export default function CharactersPage() {
  usePageMeta({
    title: 'Characters',
    description:
      'Search the full Rick and Morty character index by name, status, and gender, then jump into detailed profiles and episode appearances.',
  })

  const [searchParams, setSearchParams] = useSearchParams()
  const page = Math.max(1, Number.parseInt(searchParams.get('page') || '1', 10) || 1)
  const name = searchParams.get('name') || ''
  const status = searchParams.get('status') || ''
  const gender = searchParams.get('gender') || ''

  const { data, loading, error, retry } = useFetch(
    (signal) => getCharacters(page, { name, status, gender }, { signal }),
    [page, name, status, gender],
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
    if (updates.page === undefined || updates.name !== undefined || updates.status !== undefined || updates.gender !== undefined) {
      next.delete('page')
    }
    commitParams(next)
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
        <h1 className="mb-6 font-display text-3xl font-bold tracking-tight" style={{ textWrap: 'balance' }}>Characters</h1>

        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <SearchBar
              label="Search characters"
              name="character-search"
              value={name}
              onChange={v => updateParams({ name: v })}
              placeholder="Search characters by name…"
            />
          </div>
          <label className="sr-only" htmlFor="status-filter">Filter by status</label>
          <select
            id="status-filter"
            name="status"
            value={status}
            onChange={e => updateParams({ status: e.target.value })}
            autoComplete="off"
            className="rounded-lg border border-border-glass bg-surface-glass px-4 py-2.5 text-sm text-gray-100 backdrop-blur-sm transition-[border-color,box-shadow] focus:border-electric-blue/50 focus:shadow-[0_0_12px_rgba(56,189,248,0.1)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
          >
            <option value="">All Statuses</option>
            {STATUS_OPTIONS.filter(Boolean).map(s => (
              <option key={s} value={s}>{formatLabel(s)}</option>
            ))}
          </select>
          <label className="sr-only" htmlFor="gender-filter">Filter by gender</label>
          <select
            id="gender-filter"
            name="gender"
            value={gender}
            onChange={e => updateParams({ gender: e.target.value })}
            autoComplete="off"
            className="rounded-lg border border-border-glass bg-surface-glass px-4 py-2.5 text-sm text-gray-100 backdrop-blur-sm transition-[border-color,box-shadow] focus:border-electric-blue/50 focus:shadow-[0_0_12px_rgba(56,189,248,0.1)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
          >
            <option value="">All Genders</option>
            {GENDER_OPTIONS.filter(Boolean).map(g => (
              <option key={g} value={g}>{formatLabel(g)}</option>
            ))}
          </select>
        </div>
        {loading ? (
          <LoadingSpinner className="min-h-[90vh]" />
        ) : error ? (
          <ErrorMessage message={error} onRetry={retry} />
        ) : data?.results.length === 0 ? (
          <EmptyState
            title="No Characters Found"
            description="Try a broader name or clear one of the active filters to see more results."
          />
        ) : data ? (
          <>
            <p className="mb-4 text-sm text-gray-400">{formatNumber(data.info.count)} characters found</p>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {data.results.map((c, i) => (
                <div key={c.id} className="animate-card-enter" style={{ animationDelay: `${i * 50}ms` }}>
                  <CharacterCard character={c} priority={i < 4} />
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
