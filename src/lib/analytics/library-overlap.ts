import { idsFromArtists, idsFromTracks, overlapCount } from "@/lib/analytics/behavior";
import type { SpotifyArtist, SpotifySavedTrack, SpotifyTrack } from "@/lib/spotify/types";

/** Matches server `getSavedTracks` default cap. */
export const SAVED_TRACKS_SAMPLE_LIMIT = 150;

export function savedTrackIdsFromLibrary(saved: SpotifySavedTrack[]): Set<string> {
  const ids = new Set<string>();
  for (const entry of saved) {
    const id = entry.track?.id;
    if (id) {
      ids.add(id);
    }
  }
  return ids;
}

export type TopTracksSavedOverlap = {
  topTrackTotal: number;
  /** Raw items returned from the saved-tracks API (may include unavailable entries). */
  savedSampleFetched: number;
  /** Distinct saved track IDs with a resolvable `track.id`. */
  savedSampleWithIds: number;
  savedSampleLimit: number;
  savedSampleCapped: boolean;
  overlapCount: number;
  overlapPercentOfTop: number;
};

export type TopArtistsFollowOverlap = {
  topArtistTotal: number;
  followedSampleFetched: number;
  overlapCount: number;
  overlapPercentOfTop: number;
};

export type LibraryOverlapMetrics = {
  tracks: TopTracksSavedOverlap;
  artists: TopArtistsFollowOverlap;
};

function formatSavedSampleNote(fetched: number, withIds: number, capped: boolean, limit: number): string {
  if (capped) {
    return `first ~${limit} saved tracks fetched (${withIds} with IDs)`;
  }
  return `${fetched} saved tracks in sample (${withIds} with IDs)`;
}

export function computeLibraryOverlapMetrics(
  topTracks: SpotifyTrack[],
  topArtists: SpotifyArtist[],
  savedTracks: SpotifySavedTrack[],
  followedArtists: SpotifyArtist[],
): LibraryOverlapMetrics {
  const topTrackIds = idsFromTracks(topTracks);
  const savedIds = savedTrackIdsFromLibrary(savedTracks);
  const trackOverlap = overlapCount(topTrackIds, savedIds);
  const topTrackTotal = topTrackIds.size;

  const topArtistIds = idsFromArtists(topArtists);
  const followedIds = idsFromArtists(followedArtists);
  const artistOverlap = overlapCount(topArtistIds, followedIds);
  const topArtistTotal = topArtistIds.size;

  const savedSampleCapped = savedTracks.length >= SAVED_TRACKS_SAMPLE_LIMIT;

  return {
    tracks: {
      topTrackTotal,
      savedSampleFetched: savedTracks.length,
      savedSampleWithIds: savedIds.size,
      savedSampleLimit: SAVED_TRACKS_SAMPLE_LIMIT,
      savedSampleCapped,
      overlapCount: trackOverlap,
      overlapPercentOfTop: topTrackTotal > 0 ? Math.round((trackOverlap / topTrackTotal) * 100) : 0,
    },
    artists: {
      topArtistTotal,
      followedSampleFetched: followedArtists.length,
      overlapCount: artistOverlap,
      overlapPercentOfTop: topArtistTotal > 0 ? Math.round((artistOverlap / topArtistTotal) * 100) : 0,
    },
  };
}

export function topTracksSavedOverlapHint(metrics: TopTracksSavedOverlap): string {
  const sample = formatSavedSampleNote(
    metrics.savedSampleFetched,
    metrics.savedSampleWithIds,
    metrics.savedSampleCapped,
    metrics.savedSampleLimit,
  );
  return `${metrics.overlapCount} of ${metrics.topTrackTotal} top tracks in saved sample (${sample})`;
}
