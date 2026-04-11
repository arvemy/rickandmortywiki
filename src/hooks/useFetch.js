import { startTransition, useEffect, useEffectEvent, useState } from 'react'

export default function useFetch(fetchFn, deps) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryKey, setRetryKey] = useState(0)
  const runFetch = useEffectEvent(fetchFn)

  useEffect(() => {
    const controller = new AbortController()
    let cancelled = false
    const finishLoad = (callback) => {
      startTransition(() => {
        callback()
        setLoading(false)
      })
    }

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const nextData = await runFetch(controller.signal)
        if (!cancelled) {
          finishLoad(() => {
            setData(nextData)
          })
        }
      } catch (nextError) {
        if (!cancelled && nextError.name !== 'AbortError') {
          finishLoad(() => {
            setError(nextError.message)
          })
        }
      }
    }

    load()

    return () => {
      cancelled = true
      controller.abort()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, retryKey])

  return {
    data,
    loading,
    error,
    retry: () => setRetryKey(value => value + 1),
  }
}
