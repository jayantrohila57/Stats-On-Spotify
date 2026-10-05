"use client";

import { GitCompareArrows } from "lucide-react";
import { SectionHeader } from "@/features/dashboard/components/analytics/section-header";
import { RankMovement } from "@/features/dashboard/components/analytics/rank-movement";
import { comparePeriods } from "@/lib/analytics/compare";
import type { NormalizedArtist } from "@/lib/analytics/normalize";
import type { SpotifyArtist } from "@/lib/spotify/types";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import { timeRangeLabel } from "@/lib/spotify/time-range";
import { baselineCompareLabel } from "@/lib/spotify/period";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { SpotifyArtistAvatar } from "@/components/spotify/spotify-media";
import { pickSpotifyImageUrl } from "@/lib/spotify/images";

type TasteEvolutionSectionProps = {
  artists: NormalizedArtist[];
  artistsByPeriod: Record<SpotifyTimeRange, SpotifyArtist[]>;
  timeRange: SpotifyTimeRange;
  compareRange: SpotifyTimeRange;
};

export function TasteEvolutionSection({
  artists,
  artistsByPeriod,
  timeRange,
  compareRange,
}: TasteEvolutionSectionProps) {
  const comparisons = comparePeriods(artists, artistsByPeriod[compareRange] ?? [], timeRange, compareRange, artistsByPeriod);

  const movers = [...comparisons]
    .filter((c) => c.compareRank !== undefined && (c.delta.kind === "up" || c.delta.kind === "down"))
    .sort((a, b) => {
      const score = (d: typeof a.delta) =>
        d.kind === "up" ? d.delta : d.kind === "down" ? -d.delta : 0;
      return score(b.delta) - score(a.delta);
    })
    .slice(0, 12);

  const enteredCount = comparisons.filter((c) => c.compareRank === undefined).length;

  return (
    <section className="rounded-md border border-border/80 bg-card/30 p-4">
      <SectionHeader
        icon={GitCompareArrows}
        title="Taste evolution"
        description={`Rank changes among artists in both ${timeRangeLabel(timeRange)} and ${timeRangeLabel(compareRange)} top-50 lists. “Was” = rank in ${baselineCompareLabel(timeRange)}.`}
      />
      {movers.length === 0 ? (
        <p className="mt-3 text-xs text-muted-foreground">
          No rank changes between these windows for artists that appear in both top-50 lists.
          {enteredCount > 0
            ? ` ${enteredCount} artist${enteredCount === 1 ? "" : "s"} in your current top 50 ${enteredCount === 1 ? "is" : "are"} not ranked in the comparison window (shown as NEW in track/artist tables, omitted here).`
            : null}
        </p>
      ) : (
        <Table className="mt-3">
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Artist</TableHead>
              <TableHead className="w-16 text-right">Now</TableHead>
              <TableHead className="w-16 text-right">Was</TableHead>
              <TableHead className="w-20 text-right">Move</TableHead>
              <TableHead className="hidden lg:table-cell">All periods</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {movers.map(({ entity, currentRank, compareRank, delta, periods }) => {
              const image = pickSpotifyImageUrl(entity.images);
              return (
                <TableRow key={entity.id}>
                  <TableCell className="min-w-0">
                    <div className="flex items-center gap-2">
                      <SpotifyArtistAvatar src={image} name={entity.name} />
                      <span className="truncate text-sm font-medium">{entity.name}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right tabular-nums">#{currentRank}</TableCell>
                  <TableCell className="text-right tabular-nums text-muted-foreground">
                    {compareRank ? `#${compareRank}` : "—"}
                  </TableCell>
                  <TableCell className="text-right">
                    <RankMovement delta={delta} />
                  </TableCell>
                  <TableCell className="hidden text-[10px] text-muted-foreground lg:table-cell">
                    {(["short_term", "medium_term", "long_term"] as SpotifyTimeRange[])
                      .map((r) => (periods[r] ? `${r === "short_term" ? "4w" : r === "medium_term" ? "6m" : "all"}:#${periods[r]}` : null))
                      .filter(Boolean)
                      .join(" · ")}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
