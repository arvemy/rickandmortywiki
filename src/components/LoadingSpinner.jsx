export default function LoadingSpinner({ className = '' }) {
  return (
    <div role="status" aria-live="polite" className={`flex flex-col items-center justify-center py-20 ${className}`}>
      <div aria-hidden="true" className="relative h-24 w-24 rounded-full bg-portal-green/10 shadow-[0_0_36px_rgba(57,231,95,0.24)]">
        <div className="absolute inset-0 rounded-full border-4 border-portal-green/60 border-t-electric-blue/90 animate-spin" />
        <div className="absolute inset-4 rounded-full border-2 border-electric-blue/70 border-b-portal-green/90 animate-[spin-reverse_1.8s_linear_infinite]" />
        <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-portal-green shadow-[0_0_20px_currentColor]" />
      </div>
      <p className="mt-5 text-sm text-copy-muted">Loading&hellip;</p>
    </div>
  )
}
