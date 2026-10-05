"use client";

import { Music2 } from "lucide-react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

export function LoginScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-6">
      <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-950 p-10">
        <div className="mb-8 flex flex-col items-center text-center">
          <div className="mb-4 flex size-16 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900 text-[#1db954]">
            <Music2 className="size-8" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-white">Stats On Spotify</h1>
          <p className="mt-3 text-sm text-zinc-400">
            Your personal listening analytics. Sign in with Spotify to explore your top tracks, artists, and genres.
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
