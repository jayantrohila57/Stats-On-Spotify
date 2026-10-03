# Stats on Spotify

Spotify listening stats in the browser: top tracks, artists, and playlists. Built with Next.js, NextAuth, and the Spotify Web API.

Live: https://statsonspotify.vercel.app

## Run

```bash
git clone https://github.com/jayantrohila57/Stats-On-Spotify.git
cd Stats-On-Spotify
npm install
npm run dev
```

Open http://localhost:3000. Sign-in needs a Spotify app. Set these in `.env.local`:

- `SPOTIFY_CLIENT_ID`
- `SPOTIFY_CLIENT_SECRET`
- `NEXTAUTH_SECRET`
