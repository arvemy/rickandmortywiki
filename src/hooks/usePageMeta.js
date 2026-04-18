import { useEffect } from 'react'

const SITE_NAME = 'Rick and Morty Wiki'
const DEFAULT_DESCRIPTION =
  'Explore characters, episodes, and locations from the Rick and Morty multiverse with fast search and deep links.'

function setMeta(attribute, key, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${key}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, key)
    document.head.append(tag)
  }
  tag.setAttribute('content', content)
}

function setCanonical(href) {
  let link = document.head.querySelector('link[rel="canonical"]')
  if (!link) {
    link = document.createElement('link')
    link.setAttribute('rel', 'canonical')
    document.head.append(link)
  }
  link.setAttribute('href', href)
}

export default function usePageMeta({
  title,
  description = DEFAULT_DESCRIPTION,
  robots = 'index,follow',
}) {
  useEffect(() => {
    const nextTitle = title ? `${title} | ${SITE_NAME}` : SITE_NAME
    const canonicalUrl = `${window.location.origin}${window.location.pathname}${window.location.search}`

    document.title = nextTitle
    setMeta('name', 'description', description)
    setMeta('name', 'robots', robots)
    setMeta('property', 'og:site_name', SITE_NAME)
    setMeta('property', 'og:title', nextTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:url', canonicalUrl)
    setMeta('name', 'twitter:card', 'summary_large_image')
    setMeta('name', 'twitter:title', nextTitle)
    setMeta('name', 'twitter:description', description)
    setCanonical(canonicalUrl)
  }, [description, robots, title])
}
