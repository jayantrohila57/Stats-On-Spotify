import type { Paginated, SpotifyAlbumRelease, SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";

const SPOTIFY_API_BASE = "https://api.spotify.com/v1";

type SpotifyFetchOptions = {
  accessToken: string;
  path: string;
  searchParams?: Record<string, string | number | undefined>;
};

async function spotifyFetch<T>({ accessToken, path, searchParams }: SpotifyFetchOptions): Promise<T> {
  const url = new URL(`${SPOTIFY_API_BASE}${path}`);
  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      if (value !== undefined) {
        url.searchParams.set(key, String(value));
      }
    }
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Spotify API error (${response.status}): ${body}`);
  }

  return response.json() as Promise<T>;
}

export async function getCurrentUserProfile(accessToken: string): Promise<SpotifyUserProfile> {
  return spotifyFetch<SpotifyUserProfile>({ accessToken, path: "/me" });
}

export async function getMyTopTracks(accessToken: string, limit = 50): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<Paginated<SpotifyTrack>>({
    accessToken,
    path: "/me/top/tracks",
    searchParams: { limit, time_range: "medium_term" },
  });
  return data.items;
}

export async function getMyTopArtists(accessToken: string, limit = 50): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<Paginated<SpotifyArtist>>({
    accessToken,
    path: "/me/top/artists",
    searchParams: { limit, time_range: "medium_term" },
  });
  return data.items;
}

export async function getMyPlaylists(accessToken: string, limit = 50): Promise<SpotifyPlaylist[]> {
  const data = await spotifyFetch<Paginated<SpotifyPlaylist>>({
    accessToken,
    path: "/me/playlists",
    searchParams: { limit },
  });
  return data.items;
}

export async function getNewReleases(accessToken: string, limit = 20): Promise<SpotifyAlbumRelease[]> {
  const data = await spotifyFetch<{ albums: Paginated<SpotifyAlbumRelease> }>({
    accessToken,
    path: "/browse/new-releases",
    searchParams: { limit, country: "US" },
  });
  return data.albums.items;
}

export async function refreshSpotifyAccessToken(refreshToken: string) {
  const params = new URLSearchParams({
    grant_type: "refresh_token",
    refresh_token: refreshToken,
  });

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`,
      ).toString("base64")}`,
    },
    body: params,
  });

  if (!response.ok) {
    throw new Error("Failed to refresh Spotify access token");
  }

  return response.json() as Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
  }>;
}
