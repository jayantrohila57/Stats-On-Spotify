"use client";

import { LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

/**
 * PLACEHOLDER: Spotify Web API does not expose friends' listening activity for this app.
 * Static demo rows only — not live social data.
 */
const placeholderFriends = [
  { name: "Amber Holmes", track: "Dutch Kiss - Inner Mix", ring: "ring-pink-500" },
  { name: "Marcus Lee", track: "Night Drive - Analog Soul", ring: "ring-blue-500" },
  { name: "Sofia Patel", track: "Lowkey Tech - Minimal Set", ring: "ring-amber-500" },
  { name: "Jordan Kim", track: "Afterglow - Deep House", ring: "ring-emerald-500" },
];

export function FriendsActivityPanel() {
  return (
    <aside className="fixed top-16 right-4 z-20 hidden w-72 rounded-3xl border border-white/5 bg-zinc-950/95 p-4 shadow-2xl backdrop-blur xl:block xl:h-[calc(100vh-7rem)]">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="font-semibold">Friends Activity</h3>
        <LayoutGrid className="size-4 text-zinc-500" />
      </div>
      <ScrollArea className="h-[calc(100%-4rem)] pr-2">
        <ul className="space-y-3">
          {placeholderFriends.map((friend) => (
            <li key={friend.name} className="flex items-center gap-3">
              <div className={`size-10 rounded-full bg-zinc-800 ring-2 ${friend.ring}`} />
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{friend.name}</p>
                <p className="truncate text-xs text-zinc-500">{friend.track}</p>
              </div>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Button type="button" variant="outline" className="mt-4 w-full rounded-full border-white/10" disabled>
        View All (placeholder)
      </Button>
    </aside>
  );
}
