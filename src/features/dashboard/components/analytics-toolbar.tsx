"use client";

import { ChevronDown } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { TimeRangeControl } from "@/features/dashboard/components/time-range-control";
import type { SpotifyTimeRange } from "@/lib/spotify/time-range";
import type { SpotifyUserProfile } from "@/lib/spotify/types";
import { Card, CardContent } from "@/components/ui/card";
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
    <Card className="shadow-sm" role="toolbar" aria-label="Dashboard controls">
      <CardContent className="flex flex-col gap-4 p-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-foreground">Stats On Spotify</p>
          <p className="text-xs text-muted-foreground">Listening analytics</p>
        </div>
        <TimeRangeControl value={timeRange} onChange={onTimeRangeChange} disabled={isRefreshingTops} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2 self-start rounded-md border border-border bg-card px-2 py-1.5 sm:self-auto"
              aria-label="Account menu"
            >
              <Avatar className="size-8 border border-border">
                <AvatarImage src={session?.user?.image ?? undefined} alt={displayName} />
                <AvatarFallback>{displayName.slice(0, 1)}</AvatarFallback>
              </Avatar>
              <span className="max-w-[140px] truncate text-sm font-medium">{displayName}</span>
              <ChevronDown className="size-4 shrink-0 text-muted-foreground" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>{displayName}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {profile ? (
              <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                Spotify profile connected
              </DropdownMenuItem>
            ) : null}
            <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
}
