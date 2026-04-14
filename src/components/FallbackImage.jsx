export default function FallbackImage({ src, fallbackSrc, onError, ...props }) {
  const handleError = (event) => {
    onError?.(event)
    const fallbackUrl = fallbackSrc ? new URL(fallbackSrc, window.location.href).href : ''
    if (fallbackUrl && event.currentTarget.src !== fallbackUrl) {
      event.currentTarget.src = fallbackSrc
    }
  }

  return <img {...props} src={src || fallbackSrc || ''} onError={handleError} />
}
