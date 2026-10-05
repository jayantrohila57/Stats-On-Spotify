"use client";

import Link from "next/link";
import { AccountLink } from "@/components/navigation/account-link";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";

const services = [
  { href: "/#top-tracks", title: "Top tracks", description: "Your 50 most-played songs (medium term)." },
  { href: "/#top-artists", title: "Top artists", description: "Artists you listen to most." },
  { href: "/#playlists", title: "Playlists", description: "Owned and followed playlists in your library." },
  { href: "/account", title: "Profile", description: "Spotify profile details and sign-out.", account: true },
] as const;

export function GetStartedSection() {
  const { data: session, status } = useSession();

  return (
    <section id="get-started" className="px-4 py-20 md:px-8">
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[1fr_1.3fr]">
        <div className="space-y-6">
          {status === "authenticated" && session?.user ? (
            <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <Avatar className="size-14 border border-white/10">
                <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "You"} />
                <AvatarFallback>{session.user.name?.slice(0, 1) ?? "S"}</AvatarFallback>
              </Avatar>
              <div className="min-w-0">
                <p className="truncate text-lg font-semibold text-green-400">{session.user.name}</p>
                <p className="truncate text-sm text-muted-foreground">{session.user.email}</p>
              </div>
            </div>
          ) : null}
          <div>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Get started in one click</h2>
            <p className="mt-3 text-muted-foreground">
              This app is for your account only. Sign in with Spotify to load your stats securely via the official API.
            </p>
          </div>
          <SpotifyAuthButton size="lg" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {services.map((service) => {
            const card = (
              <Card className="h-full border-green-500/20 bg-green-500/5 transition hover:border-green-500/40 hover:bg-green-500/10">
                <CardHeader>
                  <CardTitle className="text-green-400">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent />
              </Card>
            );

            if ("account" in service) {
              return (
                <AccountLink key={service.href} href={service.href}>
                  {card}
                </AccountLink>
              );
            }

            return (
              <Link key={service.href} href={service.href}>
                {card}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
