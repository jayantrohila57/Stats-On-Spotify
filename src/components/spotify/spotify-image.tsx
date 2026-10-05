"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

type SpotifyImageProps = {
  src?: string | null;
  alt: string;
  size: number;
  className?: string;
  rounded?: "sm" | "md" | "full";
};

const roundedClass = {
  sm: "rounded",
  md: "rounded-md",
  full: "rounded-full",
} as const;

export function SpotifyImage({ src, alt, size, className, rounded = "sm" }: SpotifyImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn("shrink-0 bg-muted", roundedClass[rounded], className)}
        style={{ width: size, height: size }}
        aria-hidden={!alt}
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={cn("shrink-0 object-cover", roundedClass[rounded], className)}
      onError={() => setFailed(true)}
    />
  );
}
