"use client";

import { Clock3, Compass, Home, MessageSquare, Mic2, MoreHorizontal, Music2 } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { icon: Home, label: "Home", active: true },
  { icon: Compass, label: "Explore" },
  { icon: Mic2, label: "Podcasts" },
  { icon: MessageSquare, label: "Messages" },
  { icon: Clock3, label: "History" },
];

export function DashboardSidebar() {
  return (
    <aside className="hidden w-16 shrink-0 flex-col items-center border-r border-white/5 bg-[#050505] py-4 md:flex">
      <div className="mb-6 flex size-10 items-center justify-center rounded-xl bg-[#1db954]/15 text-[#1db954]">
        <Music2 className="size-5" />
      </div>
      <nav className="flex flex-1 flex-col items-center gap-3">
        {items.map((item) => (
          <button
            key={item.label}
            type="button"
            title={item.label}
            className={cn(
              "flex size-11 items-center justify-center rounded-xl text-zinc-400 transition hover:bg-white/5 hover:text-white",
              item.active && "bg-white/10 text-[#1db954]",
            )}
          >
            <item.icon className="size-5" />
          </button>
        ))}
      </nav>
      <button
        type="button"
        title="More"
        className="flex size-11 items-center justify-center rounded-xl text-zinc-500 hover:bg-white/5 hover:text-white"
      >
        <MoreHorizontal className="size-5" />
      </button>
    </aside>
  );
}
