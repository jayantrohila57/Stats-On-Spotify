"use client";

import type { SpotifyArtist, SpotifyPlaylist, SpotifyTrack, SpotifyUserProfile } from "@/lib/spotify/types";
import { DashboardSidebar } from "@/features/dashboard/components/dashboard-sidebar";
import { DashboardTopBar } from "@/features/dashboard/components/dashboard-top-bar";
import { FeaturedPlaylistCards } from "@/features/dashboard/components/featured-playlist-cards";
import { GenresGrid } from "@/features/dashboard/components/genres-grid";
import { TracksOfWeekList } from "@/features/dashboard/components/tracks-of-week-list";
import { RecentArtistsGrid } from "@/features/dashboard/components/recent-artists-grid";
import { FriendsActivityPanel } from "@/features/dashboard/components/friends-activity-panel";
import { PlayerBar } from "@/features/dashboard/components/player-bar";

export type DashboardShellData = {
  topTracks: SpotifyTrack[];
  topArtists: SpotifyArtist[];
  playlists: SpotifyPlaylist[];
  profile: SpotifyUserProfile | null;
};

export function DashboardShell({ data }: { data: DashboardShellData }) {
  const spotlightTrack = data.topTracks[0] ?? null;

  return (
    <div className="flex min-h-screen bg-[#050505] text-white">
      <DashboardSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardTopBar profile={data.profile} />
        <div className="flex min-h-0 flex-1 gap-4 p-4 pb-28 xl:pr-80">
          <div className="min-w-0 flex-1 space-y-5 overflow-y-auto">
            <FeaturedPlaylistCards playlists={data.playlists} />
            <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)_minmax(0,0.9fr)]">
              <GenresGrid artists={data.topArtists} />
              <TracksOfWeekList tracks={data.topTracks} />
              <RecentArtistsGrid artists={data.topArtists} />
            </div>
          </div>
        </div>
        <FriendsActivityPanel />
        <PlayerBar track={spotlightTrack} />
      </div>
    </div>
  );
}
