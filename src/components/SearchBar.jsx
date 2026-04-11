import { useEffect, useEffectEvent, useId, useState } from 'react'

export default function SearchBar({
  value,
  onChange,
  label = 'Search',
  name = 'search',
  placeholder = 'Search…',
}) {
  const [local, setLocal] = useState(value)
  const inputId = useId()
  const emitChange = useEffectEvent(onChange)

  useEffect(() => {
    setLocal(value)
  }, [value])

  useEffect(() => {
    if (local === value) return undefined

    const timeoutId = window.setTimeout(() => {
      emitChange(local)
    }, 400)

    return () => window.clearTimeout(timeoutId)
  }, [local, value])

  const handleChange = (e) => {
    setLocal(e.target.value)
  }

  return (
    <div className="relative">
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>
      <svg
        viewBox="0 0 20 20"
        fill="currentColor"
        className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500"
        aria-hidden="true"
      >
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" clipRule="evenodd" />
      </svg>
      <input
        id={inputId}
        name={name}
        type="search"
        value={local}
        onChange={handleChange}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck={false}
        enterKeyHint="search"
        className="w-full rounded-lg border border-border-glass bg-surface-glass py-2.5 pl-10 pr-4 text-sm text-gray-100 placeholder-gray-500 backdrop-blur-sm transition-[border-color,box-shadow] focus:border-electric-blue/50 focus:shadow-[0_0_16px_rgba(56,189,248,0.1)] focus-visible:ring-2 focus-visible:ring-electric-blue focus-visible:outline-none"
      />
    </div>
  )
}
