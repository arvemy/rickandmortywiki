# Rick and Morty Wiki

A responsive Rick and Morty wiki built with React, Vite, Tailwind CSS, and React Router. It uses live data from [The Rick and Morty API](https://rickandmortyapi.com/) to browse characters, episodes, and locations, plus a local question bank for a 10-question quiz.

Live app: https://rickandmortywiki-rose.vercel.app/

## Features

- Browse characters, episodes, and locations from the Rick and Morty multiverse.
- Open detail pages with related data, including character episode appearances, episode casts, and location residents.
- Search characters, episodes, and locations with URL-backed query state.
- Filter characters by status and gender.
- Take a 10-question random quiz and review answers after submitting.
- View live home-page stats from the API with fallback values when the request fails.
- Navigate with responsive layouts, mobile navigation, animated transitions, and route-aware metadata.
- See loading, error, empty-state, retry, and 404 screens.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Tailwind CSS 4
- ESLint 9
- The Rick and Morty API
- wsrv.nl image optimization

## Requirements

- Node.js 20 or newer
- npm

No environment variables are required.

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Then open `http://localhost:5173`.

## Scripts

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build in `dist/`.
- `npm run preview` previews the production build locally.
- `npm run lint` runs ESLint across the project.

## Routes

- `/` home page with live multiverse stats and section links.
- `/characters` searchable and filterable character index.
- `/characters/:id` character profile with origin, last known location, and episode appearances.
- `/episodes` searchable episode index grouped by season.
- `/episodes/:id` episode detail page with the character roster.
- `/locations` searchable location index.
- `/locations/:id` location detail page with known residents.
- `/quiz` random 10-question quiz.

## Project Structure

```text
src/
  assets/       Image and SVG assets used by the UI
  components/   Reusable UI components
  data/         Local quiz question bank
  hooks/        Data-fetching and page metadata hooks
  pages/        Route-level screens
  services/     API and media helper functions
  utils/        Formatting helpers
public/
  fonts/        Self-hosted font files
```

## API and Images

Data is fetched from [The Rick and Morty API](https://rickandmortyapi.com/). Character images are proxied through `wsrv.nl` for resizing and WebP conversion before rendering.

## Deployment

The project is configured for Vercel. `vercel.json` rewrites all routes to `index.html` so React Router can handle direct visits to client-side routes.
