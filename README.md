# Stats on Spotify

Personal Spotify listening stats in the browser: top tracks, artists, and playlists. Built with Next.js (App Router), NextAuth, Tailwind CSS, and shadcn/ui.

**Live:** https://statsonspotify.vercel.app

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- NextAuth (Spotify OAuth)
- Tailwind CSS v4 + shadcn/ui primitives
- Spotify Web API (server-side `fetch`, no client SDK)

## Project layout

```
src/
  app/                 # Routes, layouts, API route handlers only
  components/          # Presentational UI (including components/ui for shadcn)
  features/            # Feature slices (auth, home, top-tracks, playlists, …)
  lib/                 # Shared utilities, env helpers, Spotify types/scopes
  server/              # Auth config, Spotify API client, route helpers
  types/               # App-wide TypeScript declarations
```

UI components call feature hooks; hooks call `/api/spotify/*` routes; routes use `src/server/spotify` and the authenticated session. Swap the UI later without touching Spotify or auth code.

## Requirements

- Node.js 20+
- A [Spotify Developer](https://developer.spotify.com/dashboard) application

## Environment variables

Create `.env.local` in the project root:

| Variable | Required | Description |
|----------|----------|-------------|
| `SPOTIFY_CLIENT_ID` | Yes | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Yes | Spotify app client secret |
| `NEXTAUTH_SECRET` | Yes | Random secret for session encryption ([generate](https://generate-secret.vercel.app/32)) |
| `NEXTAUTH_URL` | Yes (production) | Canonical site URL, e.g. `https://statsonspotify.vercel.app` |

Local development usually works with `NEXTAUTH_URL=http://localhost:3000`.

In the Spotify dashboard, add redirect URI:

- `http://localhost:3000/api/auth/callback/spotify` (local)
- `https://statsonspotify.vercel.app/api/auth/callback/spotify` (production)

Env names are unchanged from the previous version (`SPOTIFY_*`, `NEXTAUTH_*`).

## Install & run

```bash
git clone https://github.com/jayantrohila57/Stats-On-Spotify.git
cd Stats-On-Spotify
npm install
npm run dev
```

Open http://localhost:3000 and sign in with Spotify.

## Scripts

- `npm run dev` — development server
- `npm run build` — production build
- `npm run start` — run production build locally
- `npm run lint` — ESLint

## Deploy

Production deploys from the `main` branch (e.g. Vercel). Set the same environment variables in the hosting provider.
