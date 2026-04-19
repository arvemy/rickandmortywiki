export default function EmptyState({ title, description, children }) {
  return (
    <div className="rounded-2xl border border-border-glass bg-surface-glass px-6 py-12 text-center backdrop-blur-sm">
      <p className="font-display text-2xl font-bold text-copy">{title}</p>
      <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-copy-muted">{description}</p>
      {children ? <div className="mt-6 flex justify-center">{children}</div> : null}
    </div>
  )
}
