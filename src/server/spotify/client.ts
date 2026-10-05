import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type { SpotifyImage } from "@/lib/spotify/types";
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

function hasUsableAlbumArt(images?: SpotifyImage[]): boolean {
  return Boolean(images?.some((image) => Boolean(image.url?.trim())));
}

function trackNeedsEnrichment(track: SpotifyTrack): boolean {
  const missingArt = !hasUsableAlbumArt(track.album?.images);
  const missingPopularity = typeof track.popularity !== "number" || Number.isNaN(track.popularity);
  return missingArt || missingPopularity;
}

async function getTracksByIds(accessToken: string, ids: string[]): Promise<Map<string, SpotifyTrack>> {
  const map = new Map<string, SpotifyTrack>();
  if (ids.length === 0) {
    return map;
  }

  const chunkSize = 50;
  for (let offset = 0; offset < ids.length; offset += chunkSize) {
    const chunk = ids.slice(offset, offset + chunkSize);
    const data = await spotifyFetch<{ tracks: (SpotifyTrack | null)[] }>({
      accessToken,
      path: "/tracks",
      searchParams: { ids: chunk.join(",") },
    });
    for (const track of data.tracks) {
      if (track) {
        map.set(track.id, track);
      }
    }
  }

  return map;
}

function mergeTrack(base: SpotifyTrack, full: SpotifyTrack): SpotifyTrack {
  const albumImages = full.album?.images?.length ? full.album.images : base.album.images;
  const popularity =
    typeof full.popularity === "number" && !Number.isNaN(full.popularity) ? full.popularity : base.popularity;

  return {
    ...base,
    ...full,
    popularity,
    album: {
      ...base.album,
      ...full.album,
      images: albumImages,
    },
  };
}

async function enrichTopTracks(accessToken: string, tracks: SpotifyTrack[]): Promise<SpotifyTrack[]> {
  const ids = tracks.filter(trackNeedsEnrichment).map((track) => track.id);
  if (ids.length === 0) {
    return tracks;
  }

  const byId = await getTracksByIds(accessToken, ids);
  return tracks.map((track) => {
    const full = byId.get(track.id);
    return full ? mergeTrack(track, full) : track;
  });
}

export async function getMyTopTracks(
  accessToken: string,
  limit = 50,
  timeRange: SpotifyTimeRange = "medium_term",
): Promise<SpotifyTrack[]> {
  const data = await spotifyFetch<Paginated<SpotifyTrack>>({
    accessToken,
    path: "/me/top/tracks",
    searchParams: { limit, time_range: timeRange },
  });
  return enrichTopTracks(accessToken, data.items);
}

export async function getMyTopArtists(
  accessToken: string,
  limit = 50,
  timeRange: SpotifyTimeRange = "medium_term",
): Promise<SpotifyArtist[]> {
  const data = await spotifyFetch<Paginated<SpotifyArtist>>({
    accessToken,
    path: "/me/top/artists",
    searchParams: { limit, time_range: timeRange },
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
