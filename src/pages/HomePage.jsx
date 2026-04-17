import TransitionLink from '../components/TransitionLink'
import { getCharacters, getEpisodes, getLocations } from '../services/api'
import useFetch from '../hooks/useFetch'
import usePageMeta from '../hooks/usePageMeta'
import charactersIcon from '../assets/characters.svg'
import episodesIcon from '../assets/episodes.svg'
import locationsIcon from '../assets/locations.png'
import rickAndMortyWikiLogo from '../assets/rickandmortywiki.webp'
import { formatNumber } from '../utils/formatters'

const defaultStats = {
  characters: 826,
  episodes: 51,
  locations: 126,
}

const statsItems = [
  { key: 'characters', label: 'Characters', color: 'text-portal-green' },
  { key: 'episodes', label: 'Episodes', color: 'text-electric-blue' },
  { key: 'locations', label: 'Locations', color: 'text-accent-amber' },
]

function CharacterGlyph() {
  return (
    <img
      src={charactersIcon}
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(57,231,95,0.18)]"
    />
  )
}

function EpisodeGlyph() {
  return (
    <img
      src={episodesIcon}
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(56,189,248,0.18)]"
    />
  )
}

function LocationGlyph() {
  return (
    <img
      src={locationsIcon}
      alt=""
      aria-hidden="true"
      width={40}
      height={40}
      className="h-10 w-10 object-contain drop-shadow-[0_0_18px_rgba(57,231,95,0.18)]"
    />
  )
}

const sections = [
  {
    to: '/characters',
    title: 'Characters',
    description: 'Browse 800+ characters across infinite dimensions',
    icon: <CharacterGlyph />,
    accent: 'portal-green',
    hoverBorder: 'hover:border-portal-green/30',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(57,231,95,0.1)]',
    hoverText: 'group-hover:text-portal-green',
    glowClass: 'bg-portal-green/5',
  },
  {
    to: '/episodes',
    title: 'Episodes',
    description: 'Every episode from Season 1 through Season 5',
    icon: <EpisodeGlyph />,
    accent: 'electric-blue',
    hoverBorder: 'hover:border-electric-blue/30',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(56,189,248,0.1)]',
    hoverText: 'group-hover:text-electric-blue',
    glowClass: 'bg-electric-blue/5',
  },
  {
    to: '/locations',
    title: 'Locations',
    description: 'Explore planets, dimensions, and realities',
    icon: <LocationGlyph />,
    accent: 'portal-green',
    hoverBorder: 'hover:border-portal-green/30',
    hoverShadow: 'hover:shadow-[0_0_30px_rgba(57,231,95,0.1)]',
    hoverText: 'group-hover:text-portal-green',
    glowClass: 'bg-portal-green/5',
  },
]

export default function HomePage() {
  usePageMeta({
    description:
      'Browse characters, episodes, and locations from the Rick and Morty multiverse with fast search and cinematic page transitions.',
  })

  const { data: stats, loading: statsLoading, error: statsError } = useFetch(async (signal) => {
    const [characters, episodes, locations] = await Promise.all([
      getCharacters(1, {}, { signal }),
      getEpisodes(1, {}, { signal }),
      getLocations(1, {}, { signal }),
    ])

    return {
      characters: characters.info.count,
      episodes: episodes.info.count,
      locations: locations.info.count,
    }
  }, [])
  const displayStats = stats ?? defaultStats

  return (
    <div>
        {/* Hero */}
        <section className="relative overflow-hidden px-4 py-24 text-center sm:py-32">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(57,231,95,0.08)_0%,transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_60%_40%,rgba(56,189,248,0.05)_0%,transparent_50%)]" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(57,231,95,0.04)_0%,transparent_30%)] animate-[portal-pulse_6s_ease-in-out_infinite]" />

          <h1 className="sr-only">Rick and Morty Wiki</h1>
          <img
            src={rickAndMortyWikiLogo}
            alt=""
            aria-hidden="true"
            width={1280}
            height={852}
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="relative mx-auto w-full max-w-136 drop-shadow-[0_0_42px_rgba(190,255,0,0.18)] sm:max-w-152 lg:max-w-160"
          />
          <p className="relative mx-auto mt-5 max-w-xl text-base text-gray-400 sm:text-lg" style={{ textWrap: 'pretty' }}>
            Your interdimensional guide to every character, episode, and location
            from the hit animated series.
          </p>

          <div className="relative mx-auto mt-12 min-h-32 max-w-lg" aria-busy={statsLoading}>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              {statsItems.map((s, i) => (
                <div
                  key={s.label}
                  className="animate-card-enter rounded-xl border border-border-glass bg-surface-glass px-3 py-3 text-center backdrop-blur-sm sm:px-5"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className={`font-display text-2xl font-bold tabular-nums sm:text-3xl ${s.color}`}>
                    {formatNumber(displayStats[s.key])}
                  </div>
                  <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-gray-400">{s.label}</div>
                </div>
              ))}
            </div>
            <p
              role={statsError ? 'alert' : 'status'}
              aria-live="polite"
              className={`mt-3 h-5 text-xs ${statsError ? 'text-dead/80' : 'text-gray-500'}`}
            >
              {statsError ? `Live stats unavailable: ${statsError}` : statsLoading ? 'Refreshing live multiverse stats...' : 'Live stats loaded.'}
            </p>
          </div>
        </section>

        {/* Divider */}
        <div className="mx-auto h-px max-w-xs bg-linear-to-r from-transparent via-portal-green/30 to-transparent" />

        {/* Section cards */}
        <section className="mx-auto max-w-5xl px-4 py-16">
          <h2 className="mb-10 text-center font-display text-2xl font-bold tracking-tight" style={{ textWrap: 'balance' }}>
            Explore the Multiverse
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {sections.map((s, i) => (
              <TransitionLink
                key={s.to}
                to={s.to}
                types={['nav-forward']}
                className={`animate-card-enter group relative overflow-hidden rounded-xl border border-border-glass bg-surface-glass p-7 backdrop-blur-sm transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 ${s.hoverBorder} ${s.hoverShadow} focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none`}
                style={{ animationDelay: `${200 + i * 100}ms` }}
              >
                <div className={`text-gray-400 transition-colors duration-300 ${s.hoverText}`}>{s.icon}</div>
                <h3 className={`mt-4 font-display text-xl font-bold ${s.hoverText}`}>
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-400">{s.description}</p>
                <div className={`absolute -bottom-1 -right-1 h-24 w-24 rounded-full blur-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${s.glowClass}`} />
              </TransitionLink>
            ))}
          </div>
        </section>
    </div>
  )
}
