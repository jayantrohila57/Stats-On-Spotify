import { notFound } from "next/navigation";
import { AnalyticsDashboardPreview } from "@/features/dashboard/components/analytics/analytics-dashboard-preview";

export const metadata = {
  title: "Dashboard preview (fixtures)",
  robots: { index: false, follow: false },
};

/** Fixture dashboard for local/CI QA — not exposed in production. */
export default function PreviewPage() {
  if (process.env.NODE_ENV === "production") {
    notFound();
  }

  return <AnalyticsDashboardPreview />;
}
