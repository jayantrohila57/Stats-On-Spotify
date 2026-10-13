import { AnalyticsDashboardPreview } from "@/features/dashboard/components/analytics/analytics-dashboard-preview";

export const metadata = {
  title: "Dashboard preview (fixtures)",
  robots: { index: false, follow: false },
};

/** Signed-out QA page with fixture data — no Spotify session required. */
export default function PreviewPage() {
  return <AnalyticsDashboardPreview />;
}
