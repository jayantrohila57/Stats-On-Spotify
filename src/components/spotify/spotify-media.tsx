"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";
import { Disc3, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

/** Pixel sizes used across analytics tables and cards. */
export const SPOTIFY_MEDIA_SIZE = {
  table: 32,
  card: 40,
  release: 48,
  detail: 80,
} as const;

type FixedFrameProps = {
  size: number;
  rounded: "sm" | "md" | "full";
  className?: string;
  children: ReactNode;
};

function FixedMediaFrame({ size, rounded, className, children }: FixedFrameProps) {
  const roundedClass = {
    sm: "rounded",
    md: "rounded-md",
    full: "rounded-full",
  } as const;

  return (
    <div
      className={cn("relative shrink-0 overflow-hidden bg-muted", roundedClass[rounded], className)}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
        flexShrink: 0,
      }}
    >
      {children}
    </div>
  );
}

type SpotifyThumbnailProps = {
  src?: string | null;
  alt: string;
  /** Edge length in pixels (e.g. 32 for table rows). */
  size?: number;
  className?: string;
};

/** Fixed square artwork for tracks, albums, playlists, and releases. */
export function SpotifyThumbnail({ src, alt, size = SPOTIFY_MEDIA_SIZE.table, className }: SpotifyThumbnailProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src?.trim()) && !failed;

  return (
    <FixedMediaFrame size={size} rounded="sm" className={cn("border border-border/60", className)}>
      {showImage ? (
        <Image
          src={src!}
          alt={alt}
          fill
          sizes={`${size}px`}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <div className="flex size-full items-center justify-center text-muted-foreground">
          <Disc3 className="size-4" aria-hidden />
        </div>
      )}
    </FixedMediaFrame>
  );
}

type SpotifyArtistAvatarProps = {
  src?: string | null;
  name?: string;
  size?: number;
  className?: string;
};

/** Fixed circular artist image using shadcn Avatar. */
export function SpotifyArtistAvatar({
  src,
  name = "Artist",
  size = SPOTIFY_MEDIA_SIZE.table,
  className,
}: SpotifyArtistAvatarProps) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(src?.trim()) && !failed;
  const initial = name.trim().slice(0, 1).toUpperCase() || "?";

  return (
    <Avatar
      className={cn("shrink-0 overflow-hidden border border-border/60", className)}
      style={{
        width: size,
        height: size,
        minWidth: size,
        minHeight: size,
      }}
    >
      {showImage ? (
        <AvatarImage src={src!} alt={name} className="size-full object-cover" onError={() => setFailed(true)} />
      ) : null}
      <AvatarFallback className="size-full rounded-full bg-muted text-muted-foreground">
        {initial !== "?" ? initial : <User className="size-3.5" aria-hidden />}
      </AvatarFallback>
    </Avatar>
  );
}
