"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";
import { Button } from "@/components/ui/button";

type StatsSectionShellProps = {
  id: string;
  title: string;
  description: string;
  nextHref: string;
  isLoading: boolean;
  error: string | null;
  isEmpty: boolean;
  children: React.ReactNode;
};

export function StatsSectionShell({
  id,
  title,
  description,
  nextHref,
  isLoading,
  error,
  isEmpty,
  children,
}: StatsSectionShellProps) {
  const { status } = useSession();

  return (
    <section id={id} className="min-h-screen scroll-mt-24 px-4 py-24 md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">{title}</h2>
            <p className="mt-2 text-slate-400">{description}</p>
          </div>
          <Button asChild variant="outline" className="border-white/20 text-slate-200 hover:text-green-400">
            <Link href={nextHref}>Next section</Link>
          </Button>
        </div>

        {status !== "authenticated" ? (
          <div className="rounded-xl border border-dashed border-green-500/30 bg-green-500/5 p-8 text-center">
            <p className="mb-4 text-slate-300">Sign in with Spotify to load this section.</p>
            <SpotifyAuthButton />
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">{error}</div>
        ) : isEmpty && !isLoading ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-slate-300">No data yet.</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}
