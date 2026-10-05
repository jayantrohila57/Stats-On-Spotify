"use client";

import { BarChart3 } from "lucide-react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

export function LoginScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6">
      <div className="w-full max-w-md rounded-md border border-border bg-card p-8 shadow-sm">
        <div className="mb-8 flex flex-col items-start">
          <div className="mb-4 flex size-11 items-center justify-center rounded-md border border-border bg-muted">
            <BarChart3 className="size-5 text-foreground" />
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">Stats On Spotify</h1>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Analytics dashboard for your Spotify account. Sign in to view top tracks, artists, playlists, and derived
            genre insights from live API data.
          </p>
        </div>
        <SpotifyAuthButton size="lg" className="w-full" />
        <p className="mt-6 text-xs text-muted-foreground">
          Single-account personal use. We do not store your listening history on our servers.
        </p>
      </div>
    </div>
  );
}
