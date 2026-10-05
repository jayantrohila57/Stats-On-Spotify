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

type AnalyticsToolbarProps = {
  profile: SpotifyUserProfile | null;
  timeRange: SpotifyTimeRange;
  onTimeRangeChange: (range: SpotifyTimeRange) => void;
  isRefreshingTops?: boolean;
};

export function AnalyticsToolbar({
  profile,
  timeRange,
  onTimeRangeChange,
  isRefreshingTops,
}: AnalyticsToolbarProps) {
  const { data: session } = useSession();
  const displayName = profile?.display_name ?? session?.user?.name ?? "You";

  return (
    <div
      className="flex flex-col gap-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between"
      role="toolbar"
      aria-label="Dashboard controls"
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold text-white">Stats On Spotify</p>
        <p className="text-xs text-zinc-500">Listening analytics</p>
      </div>
      <TimeRangeControl value={timeRange} onChange={onTimeRangeChange} disabled={isRefreshingTops} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="flex items-center gap-2 self-start rounded-xl border border-zinc-800 bg-zinc-900 px-2 py-1.5 sm:self-auto"
            aria-label="Account menu"
          >
            <Avatar className="size-8 border border-zinc-700">
              <AvatarImage src={session?.user?.image ?? undefined} alt={displayName} />
              <AvatarFallback>{displayName.slice(0, 1)}</AvatarFallback>
            </Avatar>
            <span className="max-w-[140px] truncate text-sm font-medium">{displayName}</span>
            <ChevronDown className="size-4 shrink-0 text-zinc-500" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="border-zinc-800 bg-zinc-950">
          <DropdownMenuLabel className="text-zinc-300">{displayName}</DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-zinc-800" />
          {profile ? (
            <DropdownMenuItem disabled className="text-xs text-zinc-500">
              Spotify profile connected
            </DropdownMenuItem>
          ) : null}
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
