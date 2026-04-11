export default function Pagination({ page, pages, onPageChange }) {
  if (pages <= 1) return null

  const getPageNumbers = () => {
    const items = []
    const delta = 2
    const left = Math.max(2, page - delta)
    const right = Math.min(pages - 1, page + delta)

    items.push(1)
    if (left > 2) items.push('...')
    for (let i = left; i <= right; i++) items.push(i)
    if (right < pages - 1) items.push('...')
    if (pages > 1) items.push(pages)

    return items
  }

  const btnBase = 'rounded-lg border border-border-glass bg-surface-glass backdrop-blur-sm text-sm transition-[border-color,background-color,color] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-30'

  return (
    <nav aria-label="Pagination" className="mt-10 flex items-center justify-center gap-1.5">
      <button
        type="button"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        className={`${btnBase} px-3 py-2 hover:border-electric-blue/30 hover:bg-dark-700`}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
      </button>

      {getPageNumbers().map((item, i) =>
        item === '...' ? (
          <span key={`dots-${i}`} className="px-2 text-sm text-gray-500">&hellip;</span>
        ) : (
          <button
            type="button"
            key={item}
            onClick={() => onPageChange(item)}
            aria-current={item === page ? 'page' : undefined}
            className={`${btnBase} min-w-9 px-2.5 py-2 font-display font-semibold tabular-nums ${
              item === page
                ? 'border-portal-green/40 bg-portal-green/10 text-portal-green shadow-[0_0_12px_rgba(57,231,95,0.1)]'
                : 'text-gray-400 hover:border-electric-blue/30 hover:text-gray-200'
            }`}
          >
            {item}
          </button>
        )
      )}

      <button
        type="button"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pages}
        className={`${btnBase} px-3 py-2 hover:border-electric-blue/30 hover:bg-dark-700`}
        aria-label="Next page"
      >
        <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </button>
    </nav>
  )
}
