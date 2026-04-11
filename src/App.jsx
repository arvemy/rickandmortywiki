import { Outlet, useLocation } from 'react-router-dom'
import { Suspense, useEffect, ViewTransition } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingSpinner from './components/LoadingSpinner'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <a
        href="#main-content"
        className="sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:z-[100] focus-visible:bg-dark-800 focus-visible:px-4 focus-visible:py-2 focus-visible:text-portal-green"
      >
        Skip to main content
      </a>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Suspense fallback={
          <ViewTransition exit="slide-down">
            <LoadingSpinner />
          </ViewTransition>
        }>
          <ViewTransition enter="slide-up" default="none">
            <Outlet />
          </ViewTransition>
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
