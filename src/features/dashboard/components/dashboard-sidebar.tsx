"use client";

import Link from "next/link";
import { Home, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-white/5 bg-[#050505] py-4 md:flex">
      <Link
        href="/"
        className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#1db954]/15 text-[#1db954]"
        aria-label="Stats On Spotify home"
      >
        <Music2 className="size-5" />
      </Link>
      <nav className="flex flex-1 flex-col items-center gap-3">
        <Link
          href="/"
          title="Home"
          className={cn(
            "flex size-11 items-center justify-center rounded-xl bg-white/10 text-[#1db954]",
          )}
        >
          <Home className="size-5" />
        </Link>
      </nav>
    </aside>
  );
}
