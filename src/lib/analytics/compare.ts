import type { SpotifyTimeRange } from "@/lib/spotify/time-range";

export type PeriodRanks = Partial<Record<SpotifyTimeRange, number>>;

export type RankDelta =
  | { kind: "up"; delta: number }
  | { kind: "down"; delta: number }
  | { kind: "same" }
  | { kind: "new" }
  | { kind: "out" }
  | { kind: "pending" };

/** Lower rank number = better (1 is top). */
export function getRankDelta(
  fromRank: number | undefined,
  toRank: number | undefined,
  compareReady = true,
): RankDelta {
  if (!compareReady) {
    return { kind: "pending" };
  }
  if (fromRank === undefined && toRank !== undefined) {
    return { kind: "new" };
  }
  if (fromRank !== undefined && toRank === undefined) {
    return { kind: "out" };
  }
  if (fromRank === undefined || toRank === undefined) {
    return { kind: "same" };
  }
  if (fromRank === toRank) {
    return { kind: "same" };
  }
  if (toRank < fromRank) {
    return { kind: "up", delta: fromRank - toRank };
  }
  return { kind: "down", delta: toRank - fromRank };
}

export function getPeriodPresence(periods: PeriodRanks, range: SpotifyTimeRange): boolean {
  return typeof periods[range] === "number";
}

export type PeriodComparison<T extends { id: string }> = {
  entity: T;
  currentRank: number;
  compareRank: number | undefined;
  delta: RankDelta;
  periods: PeriodRanks;
};

export function comparePeriods<T extends { id: string }>(
  currentList: T[],
  compareList: T[],
  currentRange: SpotifyTimeRange,
  compareRange: SpotifyTimeRange,
  allLists: Record<SpotifyTimeRange, T[]>,
): PeriodComparison<T>[] {
  const compareRankById = new Map(compareList.map((item, index) => [item.id, index + 1]));

  const periodsById = new Map<string, PeriodRanks>();
  for (const range of Object.keys(allLists) as SpotifyTimeRange[]) {
    const list = allLists[range];
    list.forEach((item, index) => {
      const existing = periodsById.get(item.id) ?? {};
      existing[range] = index + 1;
      periodsById.set(item.id, existing);
    });
  }

  return currentList.map((entity, index) => {
    const currentRank = index + 1;
    const compareRank = compareRankById.get(entity.id);
    const periods = periodsById.get(entity.id) ?? { [currentRange]: currentRank };
    const wasRank = periods[compareRange] ?? compareRank;

    return {
      entity,
      currentRank,
      compareRank: wasRank,
      delta: getRankDelta(wasRank, currentRank),
      periods,
    };
  });
}
