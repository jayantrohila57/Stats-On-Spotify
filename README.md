# Stats on Spotify

Personal Spotify listening **dashboard** (dark, Spotify-inspired UI). Sign in with Spotify to see your top tracks, artists, playlists, and profile.

**Live:** https://statsonspotify.vercel.app

## UX

| State | Route | Experience |
|-------|--------|------------|
| Signed out | `/login` | Dedicated login screen — “Log in with Spotify” |
| Signed in | `/` | Dashboard (featured playlists, genres, top tracks, artists, profile menu) |

`src/proxy.ts` protects `/` (redirects guests to `/login` once) and sends signed-in users away from `/login`.

## Stack

Next.js 16 App Router · React 19 · TypeScript · Auth.js (`next-auth@5.0.0-beta.32`) · Tailwind v4 · shadcn/ui

## Layout

```
src/
  app/                 login + dashboard routes
  auth.ts              Auth.js config
  proxy.ts             auth gate for / and /login
  components/ui/       shadcn primitives
  features/dashboard/  dashboard UI + data hook
  features/auth/       login screen + sign-in button
  server/spotify/      API client + route helpers
```

## Environment variables

Create `.env.local`:

| Variable | Required |
|----------|----------|
| `SPOTIFY_CLIENT_ID` | Yes |
| `SPOTIFY_CLIENT_SECRET` | Yes |
| `AUTH_SECRET` or `NEXTAUTH_SECRET` | Yes |
| `AUTH_URL` or `NEXTAUTH_URL` | Yes in production → `https://statsonspotify.vercel.app` |

Spotify **Redirect URI** (Dashboard):

- `http://localhost:3000/api/auth/callback/spotify`
- `https://statsonspotify.vercel.app/api/auth/callback/spotify`

The Spotify provider in `src/auth.ts` must set `authorization.url` to `https://accounts.spotify.com/authorize` (params-only breaks Auth.js with `Invalid URL`).

## Scripts

```bash
npm install
npm run dev
npm run build
npm run lint
```

## Placeholders

Friends Activity and the bottom player bar are **UI placeholders** (no Spotify social/playback APIs in this pass). Top tracks, artists, playlists, and profile use live `/api/spotify/*` routes.
