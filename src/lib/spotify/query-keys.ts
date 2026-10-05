import type { SpotifyTimeRange } from "@/lib/spotify/time-range";

export const spotifyKeys = {
  all: ["spotify"] as const,
  topTracks: (timeRange: SpotifyTimeRange) => [...spotifyKeys.all, "top-tracks", timeRange] as const,
  topArtists: (timeRange: SpotifyTimeRange) => [...spotifyKeys.all, "top-artists", timeRange] as const,
  profile: () => [...spotifyKeys.all, "profile"] as const,
  playlists: () => [...spotifyKeys.all, "playlists"] as const,
  recentlyPlayed: () => [...spotifyKeys.all, "recently-played"] as const,
  savedTracks: () => [...spotifyKeys.all, "saved-tracks"] as const,
  followedArtists: () => [...spotifyKeys.all, "followed-artists"] as const,
  currentlyPlaying: () => [...spotifyKeys.all, "currently-playing"] as const,
  newReleases: () => [...spotifyKeys.all, "new-releases"] as const,
};
