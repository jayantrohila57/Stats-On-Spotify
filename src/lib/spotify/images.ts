import type { SpotifyImage } from "@/lib/spotify/types";

/** Prefer a ~64px cover; fall back to any image with a URL. */
export function pickSpotifyImageUrl(images?: SpotifyImage[] | null, targetSize = 64): string | undefined {
  if (!images?.length) {
    return undefined;
  }

  const withUrl = images.filter((image) => Boolean(image.url?.trim()));
  if (withUrl.length === 0) {
    return undefined;
  }

  const sorted = [...withUrl].sort((a, b) => (a.height ?? 0) - (b.height ?? 0));
  const atOrAbove = sorted.find((image) => (image.height ?? 0) >= targetSize);
  if (atOrAbove?.url) {
    return atOrAbove.url;
  }

  return sorted[sorted.length - 1]?.url ?? sorted[0]?.url;
}

export function albumImageFromTrack(track: { album?: { images?: SpotifyImage[] } }): string | undefined {
  return pickSpotifyImageUrl(track.album?.images);
}
