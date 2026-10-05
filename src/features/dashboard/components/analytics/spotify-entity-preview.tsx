"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { SpotifyArtistAvatar, SpotifyThumbnail } from "@/components/spotify/spotify-media";
import { albumImageFromTrack, pickSpotifyImageUrl } from "@/lib/spotify/images";
import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack } from "@/lib/spotify/types";
import { formatDurationMs } from "@/lib/text/duration";

type PreviewProps =
  | { kind: "track"; track: SpotifyTrack }
  | { kind: "artist"; artist: SpotifyArtist }
  | { kind: "playlist"; playlist: SpotifyPlaylist };

export function SpotifyEntityPreview(props: PreviewProps & { children: React.ReactNode }) {
  const { children } = props;

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>{children}</HoverCardTrigger>
      <HoverCardContent className="w-72 p-3" align="start">
        {props.kind === "track" ? (
          <TrackPreview track={props.track} />
        ) : props.kind === "artist" ? (
          <ArtistPreview artist={props.artist} />
        ) : (
          <PlaylistPreview playlist={props.playlist} />
        )}
      </HoverCardContent>
    </HoverCard>
  );
}

function TrackPreview({ track }: { track: SpotifyTrack }) {
  const image = albumImageFromTrack(track);
  return (
    <div className="flex gap-3">
      <SpotifyThumbnail src={image} alt={track.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{track.name}</p>
        <p className="truncate text-xs text-muted-foreground">{track.artists.map((a) => a.name).join(", ")}</p>
        <p className="mt-1 text-[11px] text-muted-foreground">
          {track.album.name} · {formatDurationMs(track.duration_ms)} · Pop. {track.popularity}
        </p>
        <Link
          href={track.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs text-foreground hover:underline"
        >
          Open in Spotify <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}

function ArtistPreview({ artist }: { artist: SpotifyArtist }) {
  const image = pickSpotifyImageUrl(artist.images);
  return (
    <div className="flex gap-3">
      <SpotifyArtistAvatar src={image} name={artist.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{artist.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {artist.followers ? `${artist.followers.total.toLocaleString()} followers` : "Followers hidden"}
          {typeof artist.popularity === "number" ? ` · Pop. ${artist.popularity}` : null}
        </p>
        <Link
          href={artist.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs hover:underline"
        >
          Open in Spotify <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}

function PlaylistPreview({ playlist }: { playlist: SpotifyPlaylist }) {
  const image = pickSpotifyImageUrl(playlist.images);
  return (
    <div className="flex gap-3">
      <SpotifyThumbnail src={image} alt={playlist.name} />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{playlist.name}</p>
        <p className="text-[11px] text-muted-foreground">
          {playlist.tracks.total.toLocaleString()} tracks · {playlist.owner.display_name}
        </p>
        <Link
          href={playlist.external_urls.spotify}
          target="_blank"
          rel="noreferrer"
          className="mt-2 inline-flex items-center gap-1 text-xs hover:underline"
        >
          Open in Spotify <ExternalLink className="size-3" />
        </Link>
      </div>
    </div>
  );
}
