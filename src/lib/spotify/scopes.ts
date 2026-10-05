export const SPOTIFY_SCOPES = [
  "user-read-email",
  "user-read-private",
  "playlist-read-collaborative",
  "playlist-read-private",
  "user-library-read",
  "user-top-read",
  "user-read-recently-played",
  "user-follow-read",
] as const;

export const SPOTIFY_SCOPE_STRING = SPOTIFY_SCOPES.join(" ");
