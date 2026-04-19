import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'rickandmortywiki-theme'
const THEME_QUERY = '(prefers-color-scheme: light)'
const THEMES = new Set(['dark', 'light'])
const THEME_COLORS = {
  dark: '#0a0a14',
  light: '#e8f5ef',
}

function getStoredTheme() {
  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY)
    return THEMES.has(storedTheme) ? storedTheme : null
  } catch {
    return null
  }
}

function getSystemTheme() {
  return window.matchMedia?.(THEME_QUERY).matches ? 'light' : 'dark'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  document.documentElement.style.colorScheme = theme

  const themeColor = document.querySelector('meta[name="theme-color"]')
  themeColor?.setAttribute('content', THEME_COLORS[theme])
}

function getInitialTheme() {
  if (typeof document === 'undefined') return 'dark'
  const theme = document.documentElement.dataset.theme
  if (THEMES.has(theme)) return theme

  return getStoredTheme() ?? getSystemTheme()
}

export default function useTheme() {
  const [theme, setTheme] = useState(getInitialTheme)
  const [followsSystem, setFollowsSystem] = useState(() => (
    typeof window !== 'undefined' ? getStoredTheme() === null : true
  ))

  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  useEffect(() => {
    if (!followsSystem) return undefined

    const media = window.matchMedia?.(THEME_QUERY)
    if (!media) return undefined

    const handleChange = (event) => {
      setTheme(event.matches ? 'light' : 'dark')
    }

    media.addEventListener('change', handleChange)
    return () => media.removeEventListener('change', handleChange)
  }, [followsSystem])

  const toggleTheme = useCallback(() => {
    const nextTheme = theme === 'light' ? 'dark' : 'light'

    try {
      window.localStorage.setItem(STORAGE_KEY, nextTheme)
    } catch {
      // The visual toggle should still work if persistence is blocked.
    }

    setFollowsSystem(false)
    setTheme(nextTheme)
  }, [theme])

  return { followsSystem, theme, toggleTheme }
}
