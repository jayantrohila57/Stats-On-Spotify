import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify/types";

export type AnalyticsSelection =
  | { kind: "track"; track: SpotifyTrack }
  | { kind: "artist"; artist: SpotifyArtist }
  | { kind: "genre"; genre: string; relatedArtists: SpotifyArtist[] }
  | null;
