"use client";

import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  const { data: session } = useSession();
  const greeting = session?.user?.name ? `${session.user.name}, welcome to` : "Welcome to";

  return (
    <section id="home" className="relative min-h-screen">
      <Image
        src="https://images.unsplash.com/photo-1623018035813-9cfb5b502e04?auto=format&fit=crop&w=2070&q=80"
        alt="Concert crowd"
        fill
        priority
        className="object-cover opacity-40"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-black via-black/40 to-black" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <p className="text-lg text-slate-200 md:text-2xl">{greeting}</p>
        <h1 className="mt-2 text-5xl font-black tracking-tight text-white md:text-8xl">
          <span className="text-green-400">Stats On Spotify</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-2xl">
          An easy way to review your top tracks, artists, and playlists in one place.
        </p>
        <Button asChild variant="spotify" size="lg" className="mt-8">
          <Link href="/#get-started">Get started</Link>
        </Button>
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
