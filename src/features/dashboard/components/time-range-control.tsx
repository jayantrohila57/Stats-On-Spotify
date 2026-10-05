"use client";

import { TIME_RANGE_OPTIONS, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type TimeRangeControlProps = {
  value: SpotifyTimeRange;
  onChange: (range: SpotifyTimeRange) => void;
  disabled?: boolean;
};

export function TimeRangeControl({ value, onChange, disabled }: TimeRangeControlProps) {
  return (
    <div
      className="inline-flex flex-wrap gap-1 rounded-full border border-white/10 bg-zinc-900/80 p-1"
      role="group"
      aria-label="Listening time range"
    >
      {TIME_RANGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          title={option.label}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-full px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm",
            value === option.value
              ? "bg-[#1db954] text-black"
              : "text-zinc-400 hover:bg-white/5 hover:text-white",
            disabled && "pointer-events-none opacity-60",
          )}
        >
          <span className="hidden sm:inline">{option.label}</span>
          <span className="sm:hidden">{option.shortLabel}</span>
        </button>
      ))}
    </div>
  );
}
