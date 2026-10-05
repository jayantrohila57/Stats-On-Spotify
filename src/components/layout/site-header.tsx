"use client";

import Link from "next/link";
import { Menu, Music2, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { SpotifyAuthButton } from "@/features/auth/components/spotify-auth-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/#home", label: "Home" },
  { href: "/account", label: "Account" },
  { href: "/contribute", label: "Contribute" },
  { href: "/more-info", label: "More Info" },
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

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-200 hover:text-green-400">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          {status === "authenticated" ? (
            <SpotifyAuthButton size="sm" />
          ) : (
            <Button asChild variant="ghost" className="text-slate-200 hover:text-green-400">
              <Link href="/#get-started">Get started</Link>
            </Button>
          )}
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

      <div
        className={cn(
          "border-t border-white/10 bg-black/95 md:hidden",
          open ? "block" : "hidden",
        )}
      >
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
          {status === "authenticated" && session?.user?.name ? (
            <p className="text-sm text-green-400">{session.user.name}</p>
          ) : null}
          <SpotifyAuthButton className="w-full" />
        </div>
      </div>
    </header>
  );
}
