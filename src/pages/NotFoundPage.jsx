import { Link } from 'react-router-dom'
import usePageMeta from '../hooks/usePageMeta'

export default function NotFoundPage() {
  usePageMeta({
    title: 'Page Not Found',
    description: 'The page you requested is missing. Return to the Rick and Morty Wiki homepage to continue exploring.',
    robots: 'noindex,follow',
  })

  return (
    <div className="flex flex-col items-center justify-center px-4 py-32 text-center">
        {/* Animated portal rings */}
        <div className="relative mb-8 h-32 w-32">
          <div className="absolute inset-0 rounded-full border-2 border-portal-green/30 animate-[spin-slow_4s_linear_infinite]" />
          <div className="absolute inset-4 rounded-full border-2 border-electric-blue/20 animate-[spin-reverse_6s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-portal-green/15 animate-[spin-slow_8s_linear_infinite]" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="font-display text-5xl font-bold text-portal-green"
              style={{ textShadow: '0 0 30px rgba(57,231,95,0.4)' }}
            >
              404
            </span>
          </div>
        </div>

        <p className="font-display text-xl font-semibold text-copy-soft">Lost in another dimension?</p>
        <p className="mt-2 text-sm text-copy-muted">The page you&apos;re looking for doesn&apos;t exist.</p>
        <Link
          to="/"
          className="mt-8 rounded-xl border border-border-glass bg-surface-glass px-6 py-3 font-display text-sm font-semibold text-copy-soft backdrop-blur-sm transition-[border-color,box-shadow,color] hover:border-portal-green/30 hover:shadow-[0_0_20px_rgba(57,231,95,0.1)] hover:text-portal-green focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
        >
          Go Back Home
        </Link>
    </div>
  )
}
