"use client";

import { Bell, ChevronDown, Search, Shield, SlidersHorizontal } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import type { SpotifyUserProfile } from "@/lib/spotify/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

const filterPills = ["Minimal", "House", "Electronic"];

export function DashboardTopBar({ profile }: { profile: SpotifyUserProfile | null }) {
  const { data: session } = useSession();
  const displayName = profile?.display_name ?? session?.user?.name ?? "You";

  return (
    <header className="flex flex-wrap items-center gap-3 border-b border-white/5 px-4 py-3">
      <div className="relative min-w-[220px] flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-zinc-500" />
        <Input
          placeholder="Search..."
          className="h-11 rounded-full border-white/10 bg-zinc-900/80 pl-10 text-white placeholder:text-zinc-500"
        />
      </div>
      <div className="hidden items-center gap-2 lg:flex">
        {filterPills.map((pill) => (
          <Button key={pill} variant="secondary" size="sm" className="rounded-full bg-zinc-900 text-zinc-300">
            {pill}
          </Button>
        ))}
        <Button variant="secondary" size="sm" className="rounded-full bg-zinc-900 text-zinc-300">
          <SlidersHorizontal className="size-4" />
          Filters
        </Button>
      </div>
      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
          <Shield className="size-4" />
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full text-zinc-400 hover:text-white">
          <Bell className="size-4" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button type="button" className="flex items-center gap-2 rounded-full bg-zinc-900 px-2 py-1">
              <Avatar className="size-9 border border-white/10">
                <AvatarImage src={session?.user?.image ?? undefined} alt={displayName} />
                <AvatarFallback>{displayName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <ChevronDown className="size-4 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-white/10 bg-zinc-950">
            <DropdownMenuLabel className="text-zinc-300">{displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            {profile ? (
              <DropdownMenuItem disabled className="text-xs text-zinc-500">
                {profile.followers.total.toLocaleString()} Spotify followers
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
