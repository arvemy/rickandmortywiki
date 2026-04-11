function getMessageCopy(message) {
  if (!message) {
    return "We couldn't load this screen. Check your connection and try again."
  }

  if (message === 'Not found') {
    return "We couldn't find that entry. Check the URL or head back and choose another result."
  }

  if (message.startsWith('API error:')) {
    return "The API didn't return a usable response. Try again in a moment."
  }

  return message
}

export default function ErrorMessage({ message, onRetry }) {
  return (
    <div role="alert" className="flex flex-col items-center justify-center py-20 text-center">
      <div className="mb-6 rounded-xl border border-dead/20 bg-dead/5 p-8 backdrop-blur-sm">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-dead/10">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6 text-dead" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
          </svg>
        </div>
        <p className="text-base text-dead/80">{getMessageCopy(message)}</p>
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-5 rounded-lg border border-border-glass bg-surface-glass px-5 py-2 text-sm text-gray-200 backdrop-blur-sm transition-[border-color,background-color] hover:border-electric-blue/30 hover:bg-dark-700 focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  )
}
