import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'
import FallingBackground from './components/FallingBackground'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="relative isolate flex min-h-screen flex-col overflow-x-hidden">
      <FallingBackground />
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-[100] focus-visible:bg-surface-solid focus-visible:px-4 focus-visible:py-2 focus-visible:text-portal-green"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative z-10 flex-1">
        <Suspense fallback={<LoadingSpinner />}>
          <Outlet />
        </Suspense>
      </main>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  )
}
