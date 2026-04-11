const BASE_URL = 'https://rickandmortyapi.com/api'

const EMPTY_PAGE_INFO = Object.freeze({
  count: 0,
  pages: 0,
  next: null,
  prev: null,
})

function createError(message, status) {
  const error = new Error(message)
  error.status = status
  return error
}

function createEmptyPage() {
  return {
    info: EMPTY_PAGE_INFO,
    results: [],
  }
}

async function fetchJson(url, init) {
  const res = await fetch(url, init)
  if (!res.ok) {
    if (res.status === 404) throw createError('Not found', 404)
    throw createError(`API error: ${res.status}`, res.status)
  }
  return res.json()
}

function buildQuery(params) {
  const entries = Object.entries(params).filter(([, v]) => v != null && v !== '')
  if (entries.length === 0) return ''
  return '?' + new URLSearchParams(entries).toString()
}

// Characters
export async function getCharacters(page = 1, filters = {}, init) {
  const query = buildQuery({ page, ...filters })
  try {
    return await fetchJson(`${BASE_URL}/character${query}`, init)
  } catch (error) {
    if (error.status === 404) return createEmptyPage()
    throw error
  }
}

export async function getCharacterById(id, init) {
  return fetchJson(`${BASE_URL}/character/${id}`, init)
}

export async function getCharactersByIds(ids, init) {
  if (!ids.length) return []
  return fetchJson(`${BASE_URL}/character/${ids.join(',')}`, init)
    .then(data => Array.isArray(data) ? data : [data])
}

// Episodes
export async function getEpisodes(page = 1, filters = {}, init) {
  const query = buildQuery({ page, ...filters })
  try {
    return await fetchJson(`${BASE_URL}/episode${query}`, init)
  } catch (error) {
    if (error.status === 404) return createEmptyPage()
    throw error
  }
}

export async function getEpisodeById(id, init) {
  return fetchJson(`${BASE_URL}/episode/${id}`, init)
}

export async function getEpisodesByIds(ids, init) {
  if (!ids.length) return []
  return fetchJson(`${BASE_URL}/episode/${ids.join(',')}`, init)
    .then(data => Array.isArray(data) ? data : [data])
}

// Locations
export async function getLocations(page = 1, filters = {}, init) {
  const query = buildQuery({ page, ...filters })
  try {
    return await fetchJson(`${BASE_URL}/location${query}`, init)
  } catch (error) {
    if (error.status === 404) return createEmptyPage()
    throw error
  }
}

export async function getLocationById(id, init) {
  return fetchJson(`${BASE_URL}/location/${id}`, init)
}

// Helpers to extract IDs from API URLs like "https://rickandmortyapi.com/api/character/1"
export function extractId(url) {
  return url.split('/').pop()
}

export function extractIds(urls) {
  return urls.map(extractId)
}
