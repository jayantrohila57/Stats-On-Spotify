"use client";

import Link from "next/link";
import { Menu, Music2, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/#get-started", label: "Get started" },
  { href: "/#top-tracks", label: "Top tracks" },
  { href: "/#playlists", label: "Playlists" },
  { href: "/account", label: "Account" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6">
        <Link href="/#home" className="flex items-center gap-2">
          <span className="flex size-10 items-center justify-center rounded-md bg-green-500/15 text-green-400">
            <Music2 className="size-5" />
          </span>
          <span className="text-lg font-bold text-white">Stats On Spotify</span>
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-200 hover:text-green-400">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          {status === "authenticated" && session?.user ? (
            <Link href="/account" className="flex items-center gap-2">
              <Avatar className="size-8 border border-white/10">
                <AvatarImage src={session.user.image ?? undefined} alt={session.user.name ?? "You"} />
                <AvatarFallback>{session.user.name?.slice(0, 1) ?? "S"}</AvatarFallback>
              </Avatar>
            </Link>
          ) : null}
          <SpotifyAuthButton size="sm" />
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-label="Toggle menu"
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      <div className={cn("border-t border-white/10 bg-black/95 md:hidden", open ? "block" : "hidden")}>
        <div className="flex flex-col gap-4 px-4 py-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-lg font-semibold text-white hover:text-green-400"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <SpotifyAuthButton className="w-full" />
        </div>
      </div>
    </header>
  );
}
