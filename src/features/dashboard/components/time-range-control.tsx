"use client";

import { SEGMENTED_CONTROL_CLASS } from "@/lib/ui/layout-classes";
import { TIME_RANGE_OPTIONS, type SpotifyTimeRange } from "@/lib/spotify/time-range";
import { cn } from "@/lib/utils";

type TimeRangeControlProps = {
  value: SpotifyTimeRange;
  onChange: (range: SpotifyTimeRange) => void;
  disabled?: boolean;
};

export function TimeRangeControl({ value, onChange, disabled }: TimeRangeControlProps) {
  return (
    <div className={cn(SEGMENTED_CONTROL_CLASS, "w-full flex-wrap gap-1 sm:w-auto")} role="group" aria-label="Listening time range">
      {TIME_RANGE_OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          disabled={disabled}
          title={option.label}
          onClick={() => onChange(option.value)}
          className={cn(
            "rounded-md px-3 py-1.5 text-xs font-medium transition sm:px-4 sm:text-sm",
            value === option.value
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-muted hover:text-foreground",
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
