import type { NormalizedArtist, NormalizedTrack } from "@/lib/analytics/normalize";
import type { SpotifyPlayHistoryItem, SpotifyPlaylist } from "@/lib/spotify/types";

const cover = "https://i.scdn.co/image/ab67616d0000b273c8a11e48c91a982d086afc69";

export const fixtureTracks: NormalizedTrack[] = Array.from({ length: 12 }, (_, i) => ({
  id: `track-${i}`,
  name:
    i === 0
      ? "Lose My Mind (feat. Doja Cat) [From F1 The Album] — Extended Overflow Fixture Title"
      : `Fixture Track ${i + 1} With A Long Title For Overflow Testing`,
  uri: `spotify:track:track-${i}`,
  popularity: 70 - i,
  duration_ms: 200000 + i * 1000,
  preview_url: null,
  track_number: 1,
  album: {
    id: `album-${i % 4}`,
    name: `Album ${i % 4}`,
    images: [{ url: cover, height: 300, width: 300 }],
    external_urls: { spotify: "https://open.spotify.com" },
  },
  artists: [
    {
      id: `a-${i}`,
      name: `Artist ${i}`,
      external_urls: { spotify: "https://open.spotify.com" },
    },
  ],
  external_urls: { spotify: "https://open.spotify.com" },
  periods: { short_term: i + 1, medium_term: i + 2, long_term: i + 3 },
}));

export const fixtureArtists: NormalizedArtist[] = Array.from({ length: 12 }, (_, i) => ({
  id: `artist-${i}`,
  name: `Fixture Artist ${i + 1}`,
  popularity: 65 - i,
  genres: i % 2 === 0 ? ["metalcore", "metal"] : ["anime", "j-pop"],
  images: [{ url: cover, height: 300, width: 300 }],
  external_urls: { spotify: "https://open.spotify.com" },
  followers: { total: 1000 * (i + 1) },
  periods: { short_term: i + 1, medium_term: i + 2, long_term: i + 3 },
}));

export const fixturePlaylists: SpotifyPlaylist[] = [
  {
    id: "pl-1",
    name: "Fixture Playlist",
    description: "Preview",
    images: [{ url: cover, height: 300, width: 300 }],
    external_urls: { spotify: "https://open.spotify.com" },
    owner: { display_name: "You", external_urls: { spotify: "https://open.spotify.com" } },
    tracks: { total: 42 },
  },
];

export const fixtureRecent: SpotifyPlayHistoryItem[] = fixtureTracks.slice(0, 8).map((track, i) => ({
  played_at: new Date(Date.now() - i * 3600000).toISOString(),
  track,
  context: null,
}));
