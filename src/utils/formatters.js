const numberFormatter = new Intl.NumberFormat()

const dateFormatter = new Intl.DateTimeFormat(undefined, {
  dateStyle: 'long',
})

export function formatNumber(value) {
  return Number.isFinite(value) ? numberFormatter.format(value) : String(value ?? '')
}

export function formatDate(value) {
  const parsed = new Date(value)
  return Number.isNaN(parsed.getTime()) ? value : dateFormatter.format(parsed)
}
