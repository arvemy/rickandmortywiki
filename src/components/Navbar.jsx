import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import logo from '../assets/logo.webp'
import ThemeToggle from './ThemeToggle'
import useTheme from '../hooks/useTheme'

const links = [
  { to: '/characters', label: 'Characters' },
  { to: '/episodes', label: 'Episodes' },
  { to: '/locations', label: 'Locations' },
  { to: '/quiz', label: 'Quiz' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const linkClass = ({ isActive }) =>
    `relative text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded py-1 ${isActive ? 'text-portal-green after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-portal-green after:rounded-full' : 'text-copy-muted hover:text-electric-blue'}`

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-50 border-b border-border-glass bg-surface-nav backdrop-blur-xl"
      style={{ viewTransitionName: 'site-header' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          aria-label="Rick and Morty Wiki home"
          className="group flex items-center rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
        >
          <img
            src={logo}
            alt="Rick and Morty Wiki"
            width={320}
            height={320}
            decoding="async"
            className="block h-14 w-auto drop-shadow-[0_0_24px_rgba(190,255,0,0.2)] transition-transform duration-300 group-hover:scale-[1.02] sm:h-16"
          />
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <div className="flex gap-8">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            ))}
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle className="px-2.5 py-1.5" theme={theme} onToggle={toggleTheme} />
          <button
            type="button"
            className="flex flex-col gap-1.5 rounded p-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            onClick={() => setOpen(o => !o)}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            <span aria-hidden="true" className={`block h-0.5 w-6 bg-copy-soft transition-[transform,opacity] duration-300 ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span aria-hidden="true" className={`block h-0.5 w-6 bg-copy-soft transition-[transform,opacity] duration-300 ${open ? 'opacity-0' : ''}`} />
            <span aria-hidden="true" className={`block h-0.5 w-6 bg-copy-soft transition-[transform,opacity] duration-300 ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </div>

      <div
        id="mobile-navigation"
        aria-hidden={!open}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-in-out md:hidden ${open ? 'grid-rows-[1fr] border-t border-border-glass' : 'pointer-events-none grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden backdrop-blur-xl">
          {links.map(l => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `block px-4 py-3.5 font-display text-sm font-semibold uppercase tracking-wider transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-electric-blue ${isActive ? 'bg-surface-solid text-portal-green' : 'text-copy-muted hover:bg-surface-hover hover:text-electric-blue'}`
              }
              onClick={() => setOpen(false)}
            >
              {l.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  )
}
