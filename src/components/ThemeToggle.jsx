export default function ThemeToggle({ className = '', theme, onToggle }) {
  const isLight = theme === 'light'

  return (
    <button
      type="button"
      className={`inline-flex items-center gap-2 rounded-lg border border-border-glass bg-surface-glass px-3 py-2 font-display text-xs font-semibold uppercase tracking-[0.12em] text-copy-muted backdrop-blur-sm transition-[border-color,background-color,color,box-shadow] hover:border-electric-blue/40 hover:bg-surface-hover hover:text-electric-blue focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${className}`}
      onClick={onToggle}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
      title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
    >
      <span className="relative flex h-4 w-4 items-center justify-center" aria-hidden="true">
        {isLight ? (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path d="M10 2.5a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 2.5ZM10 15a.75.75 0 0 1 .75.75v1a.75.75 0 0 1-1.5 0v-1A.75.75 0 0 1 10 15ZM17.5 10a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1a.75.75 0 0 1 .75.75ZM5 10a.75.75 0 0 1-.75.75h-1a.75.75 0 0 1 0-1.5h1A.75.75 0 0 1 5 10ZM15.48 4.52a.75.75 0 0 1 0 1.06l-.7.7a.75.75 0 0 1-1.06-1.06l.7-.7a.75.75 0 0 1 1.06 0ZM6.28 13.72a.75.75 0 0 1 0 1.06l-.7.7a.75.75 0 1 1-1.06-1.06l.7-.7a.75.75 0 0 1 1.06 0ZM15.48 15.48a.75.75 0 0 1-1.06 0l-.7-.7a.75.75 0 0 1 1.06-1.06l.7.7a.75.75 0 0 1 0 1.06ZM6.28 6.28a.75.75 0 0 1-1.06 0l-.7-.7a.75.75 0 0 1 1.06-1.06l.7.7a.75.75 0 0 1 0 1.06Z" />
            <path d="M10 6.25A3.75 3.75 0 1 1 10 13.75 3.75 3.75 0 0 1 10 6.25Z" />
          </svg>
        ) : (
          <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
            <path fillRule="evenodd" d="M14.77 13.16A6.25 6.25 0 0 1 6.84 5.23 6.25 6.25 0 1 0 14.77 13.16Zm1.28-1.08a.75.75 0 0 1 .79.98A7.75 7.75 0 1 1 6.94 3.16a.75.75 0 0 1 .98.79 4.75 4.75 0 0 0 8.13 4.18.75.75 0 0 1 1.16.95 6.25 6.25 0 0 1-1.16 2.99Z" clipRule="evenodd" />
          </svg>
        )}
      </span>
      <span>{isLight ? 'Light' : 'Dark'}</span>
    </button>
  )
}
