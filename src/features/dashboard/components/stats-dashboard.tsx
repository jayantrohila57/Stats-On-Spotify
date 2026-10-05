"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { TopTracksPanel } from "@/features/top-tracks/components/top-tracks-panel";
import { TopArtistsPanel } from "@/features/top-artists/components/top-artists-panel";
import { PlaylistsPanel } from "@/features/playlists/components/playlists-panel";
import { NewReleasesPanel } from "@/features/new-releases/components/new-releases-panel";
import { StatsSignInPrompt } from "@/components/stats/stats-feedback";

const tabs = [
  { value: "top-tracks", label: "Top tracks" },
  { value: "top-artists", label: "Top artists" },
  { value: "playlists", label: "Playlists" },
  { value: "new-releases", label: "New releases" },
] as const;

type TabValue = (typeof tabs)[number]["value"];

function tabFromHash(hash: string): TabValue {
  const normalized = hash.replace("#", "");
  if (tabs.some((tab) => tab.value === normalized)) {
    return normalized as TabValue;
  }
  return "top-tracks";
}

export function StatsDashboard() {
  const { status } = useSession();
  const [activeTab, setActiveTab] = useState<TabValue>("top-tracks");

  useEffect(() => {
    const syncFromHash = () => setActiveTab(tabFromHash(window.location.hash));
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const onTabChange = (value: string) => {
    const next = value as TabValue;
    setActiveTab(next);
    window.history.replaceState(null, "", `#${next}`);
  };

  if (status !== "authenticated") {
    return (
      <section id="stats" className="px-4 py-16 md:px-8">
        <div className="mx-auto max-w-3xl">
          <StatsSignInPrompt />
        </div>
      </section>
    );
  }

  return (
    <section id="stats" className="px-4 py-10 md:px-8 md:py-14">
      <div className="mx-auto max-w-6xl space-y-6">
        <Card className="border-white/10 bg-white/5">
          <CardHeader>
            <CardTitle className="text-white">Your listening stats</CardTitle>
            <CardDescription>
              Top tracks and artists (medium term), your playlists (owned and followed), and new releases.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
              <TabsList className="mb-6 flex h-auto w-full flex-wrap justify-start gap-1 bg-black/40 p-1">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    id={tab.value}
                    className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-300"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
              <TabsContent value="top-tracks" className="mt-0">
                <TopTracksPanel />
              </TabsContent>
              <TabsContent value="top-artists" className="mt-0">
                <TopArtistsPanel />
              </TabsContent>
              <TabsContent value="playlists" className="mt-0">
                <PlaylistsPanel />
              </TabsContent>
              <TabsContent value="new-releases" className="mt-0">
                <NewReleasesPanel />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
