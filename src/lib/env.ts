function required(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

export function getSpotifyClientId(): string {
  return required("SPOTIFY_CLIENT_ID");
}

export function getSpotifyClientSecret(): string {
  return required("SPOTIFY_CLIENT_SECRET");
}

export function getAuthSecret(): string {
  return required("NEXTAUTH_SECRET");
}
