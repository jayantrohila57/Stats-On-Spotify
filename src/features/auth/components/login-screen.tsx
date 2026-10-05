"use client";

import { Music2 } from "lucide-react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

export function LoginScreen() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#050505] px-6">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(29,185,84,0.12),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(99,102,241,0.12),transparent_35%)]" />
      <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/10 bg-zinc-950/80 p-10 shadow-2xl backdrop-blur-md">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-[#1db954]/15 text-[#1db954]">
            <Music2 className="size-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Stats On Spotify</h1>
          <p className="mt-3 text-sm text-zinc-400">
            Your personal listening dashboard. Sign in with Spotify to view your top tracks, artists, and playlists.
          </p>
        </div>
        <SpotifyAuthButton size="lg" className="w-full" />
        <p className="mt-6 text-center text-xs text-zinc-500">
          This app is for your account only — not a multi-user service.
        </p>
      </div>
    </div>
  );
}
