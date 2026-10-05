"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function HeroSection() {
  const { data: session, status } = useSession();
  const greeting =
    status === "authenticated" && session?.user?.name
      ? `Welcome back, ${session.user.name}`
      : "Your personal Spotify stats";

  return (
    <section id="home" className="relative min-h-[90vh] md:min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?auto=format&fit=crop&w=2070&q=80"
        alt="Concert crowd"
        fill
        priority
        className="object-cover opacity-35"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/50 to-black" />
      <div className="relative z-10 flex min-h-[90vh] flex-col items-center justify-center px-6 pt-24 text-center md:min-h-screen">
        <Badge variant="secondary" className="mb-4 bg-green-500/15 text-green-300">
          Personal · Spotify OAuth · No AI
        </Badge>
        <p className="text-base text-slate-300 md:text-xl">{greeting}</p>
        <h1 className="mt-3 max-w-4xl text-4xl font-black tracking-tight text-white md:text-7xl">
          <span className="text-green-400">Stats On Spotify</span>
        </h1>
        <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-xl">
          Top tracks, top artists, playlists you own or follow, and your profile — all in one clean dashboard.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Button asChild variant="spotify" size="lg">
            <Link href="/#get-started">{status === "authenticated" ? "View your stats" : "Sign in with Spotify"}</Link>
          </Button>
          <Button asChild variant="outline" className="border-white/20 text-slate-200">
            <Link href="/#top-tracks">Jump to top tracks</Link>
          </Button>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <Button asChild variant="ghost" size="icon" className="animate-bounce text-white hover:text-green-400">
          <Link href="/#get-started" aria-label="Scroll to get started">
            <ChevronDown className="size-8" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
