export type SpotifyImage = {
  url: string;
  height: number | null;
  width: number | null;
};

export type SpotifyExternalUrls = {
  spotify: string;
};

export type SpotifyArtist = {
  id: string;
  name: string;
  external_urls: SpotifyExternalUrls;
  followers?: { total: number };
  images?: SpotifyImage[];
  genres?: string[];
  popularity?: number;
};

export type SpotifyAlbum = {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
};

export type SpotifyTrack = {
  id: string;
  name: string;
  uri: string;
  popularity: number;
  duration_ms: number;
  explicit?: boolean;
  preview_url: string | null;
  track_number: number;
  external_urls: SpotifyExternalUrls;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
};

export type SpotifyPlayHistoryItem = {
  track: SpotifyTrack;
  played_at: string;
  context: {
    type: string;
    href: string;
    external_urls: SpotifyExternalUrls;
    uri: string;
  } | null;
};

export type SpotifyEpisode = {
  id: string;
  name: string;
  duration_ms: number;
  explicit?: boolean;
  external_urls: SpotifyExternalUrls;
  images?: SpotifyImage[];
  show?: { id: string; name: string; external_urls?: SpotifyExternalUrls };
};

export type SpotifyPlaybackItem =
  | (SpotifyTrack & { type?: "track" })
  | (SpotifyEpisode & { type?: "episode" });

export type SpotifyCurrentlyPlaying = {
  is_playing: boolean;
  item: SpotifyPlaybackItem | null;
  currently_playing_type?: "track" | "episode" | "ad" | "unknown";
  progress_ms: number | null;
  timestamp: number;
};

/** API wrapper — always returned with HTTP 200 when session is valid. */
export type CurrentlyPlayingPayload = {
  playing: SpotifyCurrentlyPlaying | null;
  scopeMissing?: boolean;
};

export type SpotifySavedTrack = {
  added_at: string;
  track: SpotifyTrack;
};

export type SpotifyPlaylist = {
  id: string;
  name: string;
  description: string | null;
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
  owner: {
    display_name: string;
    external_urls: SpotifyExternalUrls;
  };
  tracks: {
    total: number;
  };
};

export type SpotifyUserProfile = {
  id: string;
  display_name: string | null;
  email: string;
  followers: { total: number };
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
};

export type SpotifyAlbumRelease = {
  id: string;
  name: string;
  images: SpotifyImage[];
  external_urls: SpotifyExternalUrls;
  artists: SpotifyArtist[];
};

export type Paginated<T> = {
  items: T[];
  total: number;
  limit: number;
  offset: number;
};
