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
  track_number: number;
  external_urls: SpotifyExternalUrls;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
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
