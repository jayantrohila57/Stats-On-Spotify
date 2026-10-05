"use client";

import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

const services = [
  {
    href: "/#top-tracks",
    title: "Top 50 Tracks",
    description: "See the songs you listen to most.",
  },
  {
    href: "/#top-artists",
    title: "Top 50 Artists",
    description: "Your most-played artists at a glance.",
  },
  {
    href: "/#playlists",
    title: "Your Playlists",
    description: "Browse playlists you own or follow.",
  },
  {
    href: "/#new-releases",
    title: "New Releases",
    description: "Fresh albums from Spotify's catalog.",
  },
];

export function GetStartedSection() {
  const { data: session, status } = useSession();

  return (
    <section id="get-started" className="flex min-h-screen items-center px-4 py-24 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-6">
          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-4">
              {session.user.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name ?? "Profile"}
                  width={72}
                  height={72}
                  className="rounded-full border border-white/20"
                />
              ) : null}
              <div>
                <p className="text-xl font-semibold text-green-400">{session.user.name}</p>
                <p className="truncate text-sm text-slate-400">{session.user.email}</p>
              </div>
            </div>
          ) : null}
          <h2 className="text-3xl font-bold text-white md:text-5xl">We offer these services for free</h2>
          <p className="text-slate-300">
            Sign in with Spotify to load your personal listening stats. Your data stays tied to your session — this is
            not a multi-user SaaS.
          </p>
          <SpotifyAuthButton size="lg" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card className="h-full border-green-500/20 bg-green-500/5 transition hover:border-green-500/40 hover:bg-green-500/10">
                <CardHeader>
                  <CardTitle className="text-green-400">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
