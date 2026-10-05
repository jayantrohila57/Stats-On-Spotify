"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { X } from "lucide-react";
import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify/types";
import { formatGenreLabel } from "@/lib/analytics/derive";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DetailSheetProps = {
  open: boolean;
  onClose: () => void;
  track: SpotifyTrack | null;
  artist: SpotifyArtist | null;
  rank?: number;
  derivedShare?: number;
};

export function DetailSheet({ open, onClose, track, artist, rank, derivedShare }: DetailSheetProps) {
  if (!open || (!track && !artist)) {
    return null;
  }

  const title = track?.name ?? artist?.name ?? "";
  const image = track?.album.images[0]?.url ?? artist?.images?.[0]?.url;
  const spotifyUrl = track?.external_urls.spotify ?? artist?.external_urls.spotify;

  return (
    <>
      <button
        type="button"
        aria-label="Close details"
        className="fixed inset-0 z-50 bg-black/60"
        onClick={onClose}
      />
      <aside
        className={cn(
          "fixed top-0 right-0 z-50 flex h-full w-full max-w-md flex-col border-l border-border bg-background shadow-xl",
        )}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className="flex items-center justify-between border-b border-border/80 px-4 py-3">
          <h3 className="text-sm font-semibold">Details</h3>
          <Button type="button" variant="ghost" size="icon" className="size-8" onClick={onClose}>
            <X className="size-4" />
          </Button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex gap-3">
            {image ? (
              <Image src={image} alt="" width={80} height={80} className="size-20 rounded border border-border/80 object-cover" />
            ) : (
              <div className="size-20 rounded border border-border/80 bg-muted" />
            )}
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-tight">{title}</p>
              {track ? (
                <p className="mt-1 text-sm text-muted-foreground">{track.artists.map((a) => a.name).join(", ")}</p>
              ) : null}
              {rank ? <p className="mt-2 text-xs text-muted-foreground">Rank #{rank} in your top list for this period</p> : null}
            </div>
          </div>

          <dl className="mt-6 space-y-3 text-sm">
            {track ? (
              <>
                <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Album</dt>
                  <dd className="text-right font-medium">{track.album.name}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Track #</dt>
                  <dd className="tabular-nums">{track.track_number}</dd>
                </div>
                <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                  <dt className="text-muted-foreground">Spotify popularity</dt>
                  <dd className="tabular-nums">{track.popularity}</dd>
                </div>
                <p className="text-[11px] text-muted-foreground">
                  Popularity is Spotify&apos;s global score (0–100), not your personal play count.
                </p>
              </>
            ) : null}
            {artist ? (
              <>
                {artist.popularity !== undefined ? (
                  <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Spotify popularity</dt>
                    <dd className="tabular-nums">{artist.popularity}</dd>
                  </div>
                ) : null}
                {artist.followers ? (
                  <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Followers</dt>
                    <dd className="tabular-nums">{artist.followers.total.toLocaleString()}</dd>
                  </div>
                ) : null}
                {derivedShare !== undefined ? (
                  <div className="flex justify-between gap-4 border-b border-border/50 pb-2">
                    <dt className="text-muted-foreground">Derived rank share</dt>
                    <dd className="tabular-nums">{(derivedShare * 100).toFixed(1)}%</dd>
                  </div>
                ) : null}
                <p className="text-[11px] text-muted-foreground">
                  Derived share weights list position only — Spotify does not return play counts here.
                </p>
                {artist.genres?.length ? (
                  <div>
                    <dt className="text-muted-foreground">Genres</dt>
                    <dd className="mt-2 flex flex-wrap gap-1">
                      {artist.genres.map((g) => (
                        <span key={g} className="rounded border border-border/80 px-2 py-0.5 text-xs">
                          {formatGenreLabel(g)}
                        </span>
                      ))}
                    </dd>
                  </div>
                ) : null}
              </>
            ) : null}
          </dl>

          {spotifyUrl ? (
            <Link
              href={spotifyUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex text-sm font-medium text-foreground underline-offset-4 hover:underline"
            >
              Open in Spotify
            </Link>
          ) : null}
        </div>
      </aside>
    </>
  );
}
