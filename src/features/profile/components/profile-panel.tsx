"use client";

import Image from "next/image";
import type { SpotifyUserProfile } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

export function ProfilePanel() {
  const { data: session, status } = useSession();
  const { data: profile, isLoading, error } = useSpotifyResource<SpotifyUserProfile>(
    "/api/spotify/profile",
    status === "authenticated",
  );

  if (status === "loading") {
    return <Skeleton className="mx-auto mt-32 h-64 w-full max-w-3xl" />;
  }

  if (status !== "authenticated") {
    return (
      <div className="mx-auto mt-32 max-w-lg rounded-xl border border-dashed border-green-500/30 bg-green-500/5 p-8 text-center">
        <p className="mb-4 text-slate-300">Sign in to view your Spotify profile.</p>
        <SpotifyAuthButton />
      </div>
    );
  }

  return (
    <Card className="mx-auto mt-32 max-w-3xl border-white/10 bg-white/5">
      <CardContent className="flex flex-col items-center gap-6 p-8 md:flex-row md:items-start">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name ?? "Profile"}
            width={160}
            height={160}
            className="rounded-full border border-white/20"
          />
        ) : null}
        <div className="space-y-3 text-center md:text-left">
          <h1 className="text-3xl font-bold text-white md:text-5xl">{session?.user?.name}</h1>
          {isLoading ? <Skeleton className="h-6 w-48" /> : null}
          {profile ? (
            <p className="text-2xl text-slate-200">
              <span className="font-bold">{profile.followers.total.toLocaleString()}</span>{" "}
              <span className="text-green-400">followers</span>
            </p>
          ) : null}
          <p className="truncate text-slate-400">{session?.user?.email}</p>
          {error ? <p className="text-sm text-red-300">{error}</p> : null}
          <SpotifyAuthButton />
        </div>
      </CardContent>
    </Card>
  );
}
