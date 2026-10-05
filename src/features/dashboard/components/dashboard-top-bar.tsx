"use client";

import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { TimeRangeControl } from "@/features/dashboard/components/time-range-control";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type { SpotifyUserProfile } from "@/lib/spotify/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type DashboardTopBarProps = {
  profile: SpotifyUserProfile | null;
  timeRange: SpotifyTimeRange;
  onTimeRangeChange: (range: SpotifyTimeRange) => void;
  isRefreshingTops?: boolean;
};

export function DashboardTopBar({
  profile,
  timeRange,
  onTimeRangeChange,
  isRefreshingTops,
}: DashboardTopBarProps) {
  const { data: session } = useSession();
  const displayName = profile?.display_name ?? session?.user?.name ?? "You";

  return (
    <header className="flex flex-col gap-3 border-b border-white/5 px-4 py-3 sm:flex-row sm:flex-wrap sm:items-center">
      <div className="min-w-0">
        <h1 className="text-lg font-bold tracking-tight sm:text-xl">Listening analytics</h1>
        <p className="text-xs text-zinc-500">Top tracks, artists, and genres from your Spotify account</p>
      </div>
      <div className="flex flex-1 flex-wrap items-center justify-start gap-3 sm:justify-center">
        <TimeRangeControl value={timeRange} onChange={onTimeRangeChange} disabled={isRefreshingTops} />
      </div>
      <div className="flex items-center justify-end sm:ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 rounded-full bg-zinc-900 px-2 py-1"
              aria-label="Account menu"
            >
              <Avatar className="size-9 border border-white/10">
                <AvatarImage src={session?.user?.image ?? undefined} alt={displayName} />
                <AvatarFallback>{displayName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="hidden max-w-[120px] truncate text-sm font-medium sm:inline">{displayName}</span>
              <ChevronDown className="size-4 text-zinc-400" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 border-white/10 bg-zinc-950">
            <DropdownMenuLabel className="text-zinc-300">{displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/10" />
            {profile ? (
              <DropdownMenuItem disabled className="text-xs text-zinc-500">
                Spotify profile connected
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
