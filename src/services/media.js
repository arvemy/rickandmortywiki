const IMAGE_PROXY_BASE = 'https://wsrv.nl/'

export function getOptimizedImageUrl(src, {
  width = 600,
  quality = 75,
  format = 'webp',
} = {}) {
  if (!src) return ''

  const params = new URLSearchParams({
    url: src.replace(/^https?:\/\//, ''),
    w: String(width),
    q: String(quality),
    output: format,
    fit: 'cover',
    we: '1',
  })

  return `${IMAGE_PROXY_BASE}?${params.toString()}`
}
