import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import LoadingSpinner from './components/LoadingSpinner'

const router = createBrowserRouter([
  {
    element: <App />,
    hydrateFallbackElement: <LoadingSpinner />,
    children: [
      { path: '/', lazy: () => import('./pages/HomePage').then(m => ({ Component: m.default })) },
      { path: '/characters', lazy: () => import('./pages/CharactersPage').then(m => ({ Component: m.default })) },
      { path: '/characters/:id', lazy: () => import('./pages/CharacterDetailPage').then(m => ({ Component: m.default })) },
      { path: '/episodes', lazy: () => import('./pages/EpisodesPage').then(m => ({ Component: m.default })) },
      { path: '/episodes/:id', lazy: () => import('./pages/EpisodeDetailPage').then(m => ({ Component: m.default })) },
      { path: '/locations', lazy: () => import('./pages/LocationsPage').then(m => ({ Component: m.default })) },
      { path: '/locations/:id', lazy: () => import('./pages/LocationDetailPage').then(m => ({ Component: m.default })) },
      { path: '*', lazy: () => import('./pages/NotFoundPage').then(m => ({ Component: m.default })) },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
