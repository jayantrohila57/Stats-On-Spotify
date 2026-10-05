import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify/types";
import { deriveRankShare } from "@/lib/analytics/derive";

/** Derived: share of inverse-rank weight in top N — not true play share. */
export function topNConcentrationShare(items: { id: string }[], n: number): number {
  const total = items.length;
  if (total === 0) return 0;
  const top = Math.min(n, total);
  let sum = 0;
  for (let i = 1; i <= top; i++) {
    sum += deriveRankShare(i, total);
  }
  return sum;
}

export function uniqueArtistRatioInTopTracks(tracks: SpotifyTrack[]): number {
  if (!tracks.length) return 0;
  const artistIds = new Set<string>();
  for (const track of tracks) {
    for (const artist of track.artists) {
      artistIds.add(artist.id);
    }
  }
  return artistIds.size / tracks.length;
}

export function overlapCount(idsA: Set<string>, idsB: Set<string>): number {
  let count = 0;
  for (const id of idsA) {
    if (idsB.has(id)) count++;
  }
  return count;
}

export function idsFromTracks(tracks: SpotifyTrack[]): Set<string> {
  return new Set(tracks.map((t) => t.id));
}

export function idsFromArtists(artists: SpotifyArtist[]): Set<string> {
  return new Set(artists.map((a) => a.id));
}

export type TasteDimension = {
  label: string;
  value: number;
  hint: string;
};

/** Derived radar dimensions (0–100), labeled honestly. */
export function deriveTasteDimensions(
  topTracks: SpotifyTrack[],
  topArtists: SpotifyArtist[],
  savedTrackIds: Set<string>,
  followedArtistIds: Set<string>,
): TasteDimension[] {
  const trackIds = idsFromTracks(topTracks);
  const artistIds = idsFromArtists(topArtists);
  const top10Share = topNConcentrationShare(topTracks, 10) * 100;
  const diversity = Math.min(100, uniqueArtistRatioInTopTracks(topTracks) * 100);
  const savedOverlap =
    trackIds.size > 0 ? (overlapCount(trackIds, savedTrackIds) / trackIds.size) * 100 : 0;
  const followOverlap =
    artistIds.size > 0 ? (overlapCount(artistIds, followedArtistIds) / artistIds.size) * 100 : 0;
  const genreSpread = Math.min(
    100,
    new Set(topArtists.flatMap((a) => a.genres ?? [])).size * 8,
  );

  return [
    {
      label: "Top-10 concentration",
      value: Math.round(top10Share),
      hint: "Derived inverse-rank weight in top 10 vs full top list",
    },
    {
      label: "Artist diversity",
      value: Math.round(diversity),
      hint: "Unique artists per top track (derived)",
    },
    {
      label: "Saved overlap",
      value: Math.round(savedOverlap),
      hint: "% of top tracks also in saved library sample",
    },
    {
      label: "Follow overlap",
      value: Math.round(followOverlap),
      hint: "% of top artists you follow (sample)",
    },
    {
      label: "Genre breadth",
      value: Math.round(genreSpread),
      hint: "Derived from genre tags on top artists",
    },
  ];
}
