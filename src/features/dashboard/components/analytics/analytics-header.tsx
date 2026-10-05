"use client";

import { ChevronDown, Circle } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
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
import { cn } from "@/lib/utils";

type AnalyticsHeaderProps = {
  profile: SpotifyUserProfile | null;
  profileLoading: boolean;
};

export function AnalyticsHeader({ profile, profileLoading }: AnalyticsHeaderProps) {
  const { data: session, status } = useSession();
  const displayName = profile?.display_name ?? session?.user?.name ?? "Account";
  const connected = status === "authenticated" && !profileLoading;

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center gap-4 px-4 md:px-6">
        <div className="min-w-0 flex-1">
          <h1 className="truncate text-sm font-semibold tracking-tight text-foreground">Stats On Spotify</h1>
          <p className="truncate text-xs text-muted-foreground">Personal listening analytics from your Spotify account</p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <div
            className={cn(
              "hidden items-center gap-1.5 text-xs text-muted-foreground sm:flex",
              connected && "text-foreground/80",
            )}
            title="Spotify connection"
          >
            <Circle className={cn("size-2 fill-current", connected ? "text-emerald-500" : "text-muted-foreground")} />
            <span>{connected ? "Connected to Spotify" : "Connecting…"}</span>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                type="button"
                className="flex items-center gap-2 rounded-md border border-border/80 bg-card px-2 py-1.5 text-left transition-colors hover:bg-muted/50"
              >
                <Avatar className="size-7">
                  <AvatarImage src={session?.user?.image ?? profile?.images[0]?.url ?? undefined} alt={displayName} />
                  <AvatarFallback className="text-xs">{displayName.slice(0, 1).toUpperCase()}</AvatarFallback>
                </Avatar>
                <span className="hidden max-w-[120px] truncate text-xs font-medium md:inline">{displayName}</span>
                <ChevronDown className="size-3.5 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col gap-0.5">
                  <span className="text-sm font-medium">{displayName}</span>
                  {profile?.email ? <span className="text-xs text-muted-foreground">{profile.email}</span> : null}
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              {profile ? (
                <DropdownMenuItem disabled className="text-xs text-muted-foreground">
                  {profile.followers.total.toLocaleString()} Spotify followers
                </DropdownMenuItem>
              ) : null}
              {profile?.external_urls.spotify ? (
                <DropdownMenuItem asChild>
                  <a href={profile.external_urls.spotify} target="_blank" rel="noreferrer">Open Spotify profile</a>
                </DropdownMenuItem>
              ) : null}
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/login" })}>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
