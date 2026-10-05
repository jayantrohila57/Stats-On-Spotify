import type { SpotifyCurrentlyPlaying, SpotifyEpisode, SpotifyPlaybackItem, SpotifyTrack } from "@/lib/spotify/types";

function isTrackItem(item: Record<string, unknown>): item is SpotifyTrack & { type?: string } {
  return item.type === "track" || Array.isArray(item.artists);
}

function isEpisodeItem(item: Record<string, unknown>): item is SpotifyEpisode & { type?: string } {
  return item.type === "episode" || (typeof item.show === "object" && item.show !== null);
}

export function normalizePlaybackItem(raw: unknown): SpotifyPlaybackItem | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const item = raw as Record<string, unknown>;
  if (isTrackItem(item)) {
    return { ...(item as SpotifyTrack), type: "track" };
  }
  if (isEpisodeItem(item)) {
    return { ...(item as SpotifyEpisode), type: "episode" };
  }
  return null;
}

export function playbackItemTitle(item: SpotifyPlaybackItem): string {
  return item.name;
}

export function playbackItemSubtitle(item: SpotifyPlaybackItem): string {
  if (item.type === "episode" || ("show" in item && item.show)) {
    const episode = item as SpotifyEpisode;
    return episode.show?.name ?? "Podcast episode";
  }
  const track = item as SpotifyTrack;
  return track.artists.map((a) => a.name).join(", ");
}

export function playbackItemDurationMs(item: SpotifyPlaybackItem): number | null {
  const ms = item.duration_ms;
  return typeof ms === "number" && !Number.isNaN(ms) ? ms : null;
}

export function playbackItemSpotifyUrl(item: SpotifyPlaybackItem): string | null {
  return item.external_urls?.spotify ?? null;
}

export function playbackItemImageUrl(item: SpotifyPlaybackItem): string | null {
  if (item.type === "episode" || ("show" in item && !("album" in item))) {
    const episode = item as SpotifyEpisode;
    const fromEpisode = episode.images?.[0]?.url;
    if (fromEpisode) return fromEpisode;
    return null;
  }
  const track = item as SpotifyTrack;
  return track.album?.images?.[0]?.url ?? null;
}

export function normalizeCurrentlyPlaying(raw: unknown): SpotifyCurrentlyPlaying | null {
  if (!raw || typeof raw !== "object") {
    return null;
  }
  const body = raw as Record<string, unknown>;
  const item = normalizePlaybackItem(body.item);
  if (!item && body.item != null) {
    return {
      is_playing: Boolean(body.is_playing),
      item: null,
      currently_playing_type: "unknown",
      progress_ms: typeof body.progress_ms === "number" ? body.progress_ms : null,
      timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(),
    };
  }
  const playingType =
    body.currently_playing_type === "track" ||
    body.currently_playing_type === "episode" ||
    body.currently_playing_type === "ad"
      ? body.currently_playing_type
      : item?.type === "episode"
        ? "episode"
        : item
          ? "track"
          : undefined;

  return {
    is_playing: Boolean(body.is_playing),
    item,
    currently_playing_type: playingType,
    progress_ms: typeof body.progress_ms === "number" ? body.progress_ms : null,
    timestamp: typeof body.timestamp === "number" ? body.timestamp : Date.now(),
  };
}
