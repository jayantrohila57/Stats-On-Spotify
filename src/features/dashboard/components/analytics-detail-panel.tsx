"use client";

import Image from "next/image";
import Link from "next/link";
import { ExternalLink, X } from "lucide-react";
import type { AnalyticsSelection } from "@/features/dashboard/types/analytics-selection";
import type { SpotifyArtist, SpotifyTrack } from "@/lib/spotify/types";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

type AnalyticsDetailPanelProps = {
  selection: AnalyticsSelection;
  onClose: () => void;
  onSelectArtist: (artistId: string) => void;
  onSelectTrack: (trackId: string) => void;
};

export function AnalyticsDetailPanel({
  selection,
  onClose,
  onSelectArtist,
  onSelectTrack,
}: AnalyticsDetailPanelProps) {
  if (!selection) {
    return null;
  }

  return (
    <aside
      className="fixed inset-y-0 right-0 z-40 flex w-full max-w-md flex-col border-l border-border bg-card sm:top-0"
      aria-label="Detail panel"
    >
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <h2 className="text-sm font-semibold text-foreground">
          {selection.kind === "track" && "Track"}
          {selection.kind === "artist" && "Artist"}
          {selection.kind === "genre" && "Genre"}
        </h2>
        <Button type="button" variant="ghost" size="icon" onClick={onClose} aria-label="Close detail panel">
          <X className="size-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        {selection.kind === "track" ? <TrackDetail track={selection.track} onSelectArtist={onSelectArtist} /> : null}
        {selection.kind === "artist" ? (
          <ArtistDetail artist={selection.artist} onSelectTrack={onSelectTrack} />
        ) : null}
        {selection.kind === "genre" ? (
          <GenreDetail genre={selection.genre} artists={selection.relatedArtists} onSelectArtist={onSelectArtist} />
        ) : null}
      </ScrollArea>
    </aside>
  );
}

function TrackDetail({
  track,
  onSelectArtist,
}: {
  track: SpotifyTrack;
  onSelectArtist: (artistId: string) => void;
}) {
  const image = track.album.images[0]?.url;

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        {image ? (
          <Image
            src={image}
            alt={track.album.name}
            width={120}
            height={120}
            className="size-[120px] shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="size-[120px] shrink-0 rounded-lg bg-muted" />
        )}
        <div className="min-w-0 flex-1">
          <p className="text-lg font-bold leading-snug text-white">{track.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {track.artists.map((artist, index) => (
              <span key={artist.id}>
                {index > 0 ? ", " : null}
                <button
                  type="button"
                  className="text-left hover:text-green-500"
                  onClick={() => onSelectArtist(artist.id)}
                >
                  {artist.name}
                </button>
              </span>
            ))}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">{track.album.name}</p>
        </div>
      </div>

      <Separator className="bg-white/10" />

      <dl className="grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Popularity</dt>
          <dd className="font-medium">{track.popularity}/100</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Track #</dt>
          <dd className="font-medium">{track.track_number}</dd>
        </div>
      </dl>

      <Link
        href={track.external_urls.spotify}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-green-500/90"
      >
        Open in Spotify
        <ExternalLink className="ml-2 size-4" />
      </Link>
    </div>
  );
}

function ArtistDetail({ artist }: { artist: SpotifyArtist; onSelectTrack: (trackId: string) => void }) {
  const image = artist.images?.[0]?.url;

  return (
    <div className="space-y-4">
      {image ? (
        <Image
          src={image}
          alt={artist.name}
          width={280}
          height={280}
          className="mx-auto aspect-square w-full max-w-[240px] rounded-xl object-cover"
        />
      ) : (
        <div className="mx-auto flex aspect-square w-full max-w-[240px] items-center justify-center rounded-xl bg-muted text-muted-foreground">
          {artist.name}
        </div>
      )}

      <div className="text-center">
        <p className="text-xl font-bold">{artist.name}</p>
        {artist.followers ? (
          <p className="mt-1 text-sm text-muted-foreground">{artist.followers.total.toLocaleString()} followers on Spotify</p>
        ) : null}
      </div>

      {artist.genres && artist.genres.length > 0 ? (
        <>
          <Separator className="bg-white/10" />
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">Genres</p>
            <ul className="flex flex-wrap gap-2">
              {artist.genres.slice(0, 8).map((genre) => (
                <li
                  key={genre}
                  className="rounded-full bg-muted px-3 py-1 text-xs capitalize text-foreground"
                >
                  {genre}
                </li>
              ))}
            </ul>
          </div>
        </>
      ) : null}

      {typeof artist.popularity === "number" ? (
        <dl className="text-sm">
          <dt className="text-muted-foreground">Popularity</dt>
          <dd className="font-medium">{artist.popularity}/100</dd>
        </dl>
      ) : null}

      <Link
        href={artist.external_urls.spotify}
        target="_blank"
        rel="noreferrer"
        className="inline-flex w-full items-center justify-center rounded-full bg-green-500 px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-green-500/90"
      >
        Open in Spotify
        <ExternalLink className="ml-2 size-4" />
      </Link>
    </div>
  );
}

function GenreDetail({
  genre,
  artists,
  onSelectArtist,
}: {
  genre: string;
  artists: SpotifyArtist[];
  onSelectArtist: (artistId: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-2xl font-bold capitalize">{genre}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          From your top artists in this period — {artists.length} match{artists.length === 1 ? "" : "es"}
        </p>
      </div>

      <Separator className="bg-white/10" />

      <ul className="space-y-2">
        {artists.map((artist) => (
          <li key={artist.id}>
            <button
              type="button"
              onClick={() => onSelectArtist(artist.id)}
              className="flex w-full items-center gap-3 rounded-xl bg-muted/60 px-3 py-2 text-left hover:bg-muted"
            >
              {artist.images?.[0]?.url ? (
                <Image
                  src={artist.images[0].url}
                  alt={artist.name}
                  width={40}
                  height={40}
                  className="size-10 rounded-full object-cover"
                />
              ) : (
                <div className="size-10 rounded-full bg-muted" />
              )}
              <span className="truncate font-medium">{artist.name}</span>
            </button>
          </li>
        ))}
        {artists.length === 0 ? (
          <p className="text-sm text-muted-foreground">No top artists tagged with this genre for the selected range.</p>
        ) : null}
      </ul>
    </div>
  );
}
