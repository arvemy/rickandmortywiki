export default function Footer() {
  return (
    <footer className="relative mt-auto" style={{ viewTransitionName: 'site-footer' }}>
      <div className="mx-auto h-px max-w-xl bg-linear-to-r from-transparent via-portal-green/20 to-transparent" />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-copy-muted md:flex-row">
        <div className="font-display text-xs font-semibold uppercase tracking-[0.15em]">
          <span className="text-portal-green/80">Rick&amp;Morty</span>{' '}
          <span className="text-electric-blue/80">Wiki</span>{' '}
          <span className="text-copy-muted">&copy; {new Date().getFullYear()}</span>
        </div>
        <p>
          Data by{' '}
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded text-electric-blue transition-colors hover:text-electric-blue hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
          >
            The Rick and Morty API
          </a>
        </p>
      </div>
    </footer>
  )
}
