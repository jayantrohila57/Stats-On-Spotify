import type { ChartConfig } from "@/components/ui/chart";

/** Compact dashboard charts: fixed height, full width, no aspect-ratio collapse. */
export const DASHBOARD_CHART_CLASS = "aspect-auto h-[140px] w-full min-w-0 sm:h-[160px]";

export const DASHBOARD_CHART_CLASS_TALL = "aspect-auto h-[180px] w-full min-w-0";

export const dashboardChartColors = {
  primary: "var(--chart-1)",
  secondary: "var(--chart-2)",
  tertiary: "var(--chart-3)",
  quaternary: "var(--chart-4)",
  muted: "var(--chart-5)",
} as const;

export const seriesChartConfig = {
  primary: {
    label: "Plays",
    color: dashboardChartColors.primary,
  },
  secondary: {
    label: "Compare",
    color: dashboardChartColors.secondary,
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export const periodCompareChartConfig = {
  active: {
    label: "Selected period",
    color: dashboardChartColors.primary,
  },
  compare: {
    label: "Compare period",
    color: dashboardChartColors.secondary,
  },
} satisfies ChartConfig;

export function genreChartKey(genre: string): string {
  if (genre === "other") return "other";
  const slug = genre
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return slug || "genre";
}

/** Slug-safe keys for chart config / CSS vars (see ChartStyle --color-*). */
export function buildGenreBarChartConfig(
  genres: Array<{ genre: string; label: string }>,
): ChartConfig {
  const config: ChartConfig = {
    value: { label: "Share", color: dashboardChartColors.primary },
    label: { color: "var(--background)" },
  };
  for (const { genre } of genres) {
    const key = genreChartKey(genre);
    if (!config[key]) {
      config[key] = { label: genres.find((g) => g.genre === genre)?.label ?? genre };
    }
  }
  return config;
}

export const HOUR_AXIS_TICKS = [0, 4, 8, 12, 16, 20];

export function formatHourTick(hour: number): string {
  return `${hour}`;
}
