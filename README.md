# Rick and Morty Wiki

A responsive Rick and Morty wiki built with React, Vite, Tailwind CSS, and React Router. The app uses live data from The Rick and Morty API to browse characters, episodes, and locations with search, filtering, pagination, and detail pages.

Live app: https://rickandmortywiki-rose.vercel.app/

## Features

- Home page with a short introduction and fast navigation into the main sections.
- Characters, episodes, and locations listing pages.
- Detail pages for characters, episodes, and locations with related API data.
- Search and filter controls that update the route state reactively.
- Loading, error, empty-state, and retry handling.
- Responsive layouts, custom typography, and animated transitions.
- Route-aware metadata updates for title, description, and canonical URL.

## Tech Stack

- React 19
- Vite
- React Router
- Tailwind CSS 4
- The Rick and Morty API
- wsrv.nl for image optimization

## Getting Started

```bash
npm install
npm run dev
```

Then open `http://localhost:5173`.

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint across the project.

## Project Structure

- `src/components` reusable UI components.
- `src/pages` route-level screens.
- `src/services` API and media helpers.
- `src/hooks` data-fetching and metadata hooks.
- `public` static files and fonts.

## API

Data is fetched from [The Rick and Morty API](https://rickandmortyapi.com/). Images are resized and converted through `wsrv.nl` before rendering.
