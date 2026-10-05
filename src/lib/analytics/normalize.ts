import type { PeriodRanks } from "@/lib/analytics/compare";
import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";

export type NormalizedTrack = SpotifyTrack & { periods: PeriodRanks };
export type NormalizedArtist = SpotifyArtist & { periods: PeriodRanks };

function buildPeriodMaps<T extends { id: string }>(
  byPeriod: Record<SpotifyTimeRange, T[]>,
): Map<string, PeriodRanks> {
  const map = new Map<string, PeriodRanks>();
  for (const range of Object.keys(byPeriod) as SpotifyTimeRange[]) {
    byPeriod[range].forEach((item, index) => {
      const ranks = map.get(item.id) ?? {};
      ranks[range] = index + 1;
      map.set(item.id, ranks);
    });
  }
  return map;
}

export function normalizeTracksByPeriod(
  byPeriod: Record<SpotifyTimeRange, SpotifyTrack[]>,
  activeRange: SpotifyTimeRange,
): NormalizedTrack[] {
  const periodMaps = buildPeriodMaps(byPeriod);
  const activeList = byPeriod[activeRange] ?? [];
  const entityById = new Map<string, SpotifyTrack>();
  for (const list of Object.values(byPeriod)) {
    for (const track of list) {
      entityById.set(track.id, track);
    }
  }

  return activeList.map((track) => ({
    ...(entityById.get(track.id) ?? track),
    periods: periodMaps.get(track.id) ?? { [activeRange]: activeList.findIndex((t) => t.id === track.id) + 1 },
  }));
}

export function normalizeArtistsByPeriod(
  byPeriod: Record<SpotifyTimeRange, SpotifyArtist[]>,
  activeRange: SpotifyTimeRange,
): NormalizedArtist[] {
  const periodMaps = buildPeriodMaps(byPeriod);
  const activeList = byPeriod[activeRange] ?? [];
  const entityById = new Map<string, SpotifyArtist>();
  for (const list of Object.values(byPeriod)) {
    for (const artist of list) {
      entityById.set(artist.id, artist);
    }
  }

  return activeList.map((artist) => ({
    ...(entityById.get(artist.id) ?? artist),
    periods: periodMaps.get(artist.id) ?? { [activeRange]: activeList.findIndex((a) => a.id === artist.id) + 1 },
  }));
}
