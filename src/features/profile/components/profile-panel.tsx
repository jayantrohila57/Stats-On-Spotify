"use client";

import { useSession } from "next-auth/react";
import type { SpotifyUserProfile } from "@/lib/spotify/types";
import { useSpotifyResource } from "@/features/spotify/hooks/use-spotify-resource";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";
import { StatsErrorState, StatsSignInPrompt } from "@/components/stats/stats-feedback";

export function ProfilePanel() {
  const { data: session, status } = useSession();
  const { data: profile, isLoading, error, refetch } = useSpotifyResource<SpotifyUserProfile>(
    "/api/spotify/profile",
    status === "authenticated",
  );

  if (status === "loading") {
    return <Skeleton className="mx-auto mt-28 h-72 w-full max-w-3xl rounded-xl" />;
  }

  if (status !== "authenticated") {
    return (
      <div className="mx-auto mt-28 max-w-lg">
        <StatsSignInPrompt />
      </div>
    );
  }

  return (
    <Card className="mx-auto mt-28 max-w-3xl border-white/10 bg-white/5">
      <CardHeader>
        <CardTitle className="text-white">Your Spotify profile</CardTitle>
        <CardDescription>Account details from Spotify for your signed-in session.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
          <Avatar className="size-28 border border-white/10">
            <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? "You"} />
            <AvatarFallback className="text-2xl">{session?.user?.name?.slice(0, 1) ?? "S"}</AvatarFallback>
          </Avatar>
          <div className="space-y-2 text-center sm:text-left">
            <h1 className="text-3xl font-bold text-white md:text-4xl">{session?.user?.name}</h1>
            <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
            {isLoading ? <Skeleton className="h-6 w-40" /> : null}
            {profile ? (
              <p className="text-lg text-slate-200">
                <span className="font-semibold text-white">{profile.followers.total.toLocaleString()}</span>{" "}
                <span className="text-green-400">Spotify followers</span>
              </p>
            ) : null}
          </div>
        </div>
        <Separator className="bg-white/10" />
        {error ? <StatsErrorState message={error} onRetry={refetch} /> : null}
        <SpotifyAuthButton />
      </CardContent>
    </Card>
  );
}
