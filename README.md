# Stats on Spotify

Personal Spotify listening stats in the browser: top tracks, artists, playlists (owned + followed), and profile. Built with **Next.js 16** (App Router), **Auth.js / NextAuth v5**, **Tailwind CSS v4**, and **shadcn/ui**.

**Live:** https://statsonspotify.vercel.app

## Stack (current)

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router + React 19 |
| Language | TypeScript (strict) |
| Auth | Auth.js via `next-auth@5.0.0-beta.32` (Spotify OAuth, JWT + refresh) |
| Styling | Tailwind CSS v4 + shadcn/ui (`components.json`, CSS variables) |
| Data | Spotify Web API (`fetch` on the server, `/api/spotify/*` routes) |

## Project layout

```
src/
  app/                 # Routes, layouts, API route handlers
  auth.ts              # Auth.js config (handlers, auth, signIn, signOut)
  proxy.ts             # Route protection for /account (Next.js 16 proxy)
  components/          # Presentational UI (ui/ = shadcn primitives)
  features/            # Feature slices (auth, dashboard, playlists, …)
  lib/                 # Utils, env helpers, Spotify types/scopes
  server/              # Spotify API client + route helpers
```

UI → feature hooks → API routes → `src/server/spotify` + `auth()`. Swap UI later without touching Spotify or auth code.

## Requirements

- Node.js 20+
- [Spotify Developer](https://developer.spotify.com/dashboard) app

## Environment variables

Create `.env.local`:

| Variable | Required | Notes |
|----------|----------|--------|
| `SPOTIFY_CLIENT_ID` | Yes | Spotify app client ID |
| `SPOTIFY_CLIENT_SECRET` | Yes | Spotify app client secret |
| `AUTH_SECRET` or `NEXTAUTH_SECRET` | Yes | Session encryption secret ([generate](https://generate-secret.vercel.app/32)) |
| `AUTH_URL` or `NEXTAUTH_URL` | Yes in production | e.g. `https://statsonspotify.vercel.app` (local: `http://localhost:3000`) |

`SPOTIFY_*` and `NEXTAUTH_*` names are still supported; Auth.js also reads `AUTH_SECRET` / `AUTH_URL` when set.

### Spotify redirect URIs

- Local: `http://localhost:3000/api/auth/callback/spotify`
- Production: `https://statsonspotify.vercel.app/api/auth/callback/spotify`

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
- `npm run lint` — ESLint (flat config)

## shadcn/ui

Configured via `components.json`. Add or refresh components:

```bash
npx shadcn@latest add button card tabs alert badge avatar
```

## Deploy

Production ships from **`main`** (e.g. Vercel). Set the same env vars in the host dashboard.
