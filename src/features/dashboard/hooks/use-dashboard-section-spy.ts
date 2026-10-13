"use client";

import { useCallback, useEffect, useState } from "react";
import { DASHBOARD_SECTIONS } from "@/features/dashboard/components/analytics/dashboard-section-nav";

/** Matches section anchor `scroll-mt-20` and sticky chrome. */
export const DASHBOARD_SECTION_SCROLL_OFFSET_PX = 80;

const SECTION_IDS = DASHBOARD_SECTIONS.map((section) => section.id);

/**
 * Picks the section whose anchor contains the scroll probe line (below sticky header).
 * Anchors are zero-height elements at each section start — not the full section box.
 */
function pickActiveSectionId(): string {
  const probeY = DASHBOARD_SECTION_SCROLL_OFFSET_PX + 1;
  let active = SECTION_IDS[0] ?? "section-overview";
  let fallbackTop = -Infinity;

  for (const id of SECTION_IDS) {
    const element = document.getElementById(id);
    if (!element) {
      continue;
    }
    const rect = element.getBoundingClientRect();
    if (rect.top <= probeY && rect.bottom > probeY) {
      return id;
    }
    if (rect.top <= probeY && rect.top > fallbackTop) {
      fallbackTop = rect.top;
      active = id;
    }
  }

  return active;
}

export function useDashboardSectionSpy() {
  const [activeSectionId, setActiveSectionId] = useState<string>(SECTION_IDS[0] ?? "section-overview");

  const refresh = useCallback(() => {
    const next = pickActiveSectionId();
    setActiveSectionId((current) => (current === next ? current : next));
  }, []);

  useEffect(() => {
    let debounceTimer: ReturnType<typeof setTimeout> | undefined;
    let rafId: number | undefined;

    const scheduleRefresh = () => {
      if (debounceTimer !== undefined) {
        clearTimeout(debounceTimer);
      }
      debounceTimer = setTimeout(() => {
        debounceTimer = undefined;
        if (rafId !== undefined) {
          cancelAnimationFrame(rafId);
        }
        rafId = requestAnimationFrame(() => {
          rafId = undefined;
          refresh();
        });
      }, 48);
    };

    scheduleRefresh();
    window.addEventListener("scroll", scheduleRefresh, { passive: true });
    window.addEventListener("resize", scheduleRefresh);

    const onHashChange = () => {
      const hash = window.location.hash.replace(/^#/, "");
      if (hash && SECTION_IDS.includes(hash as (typeof SECTION_IDS)[number])) {
        setActiveSectionId(hash);
      }
      scheduleRefresh();
    };
    window.addEventListener("hashchange", onHashChange);

    return () => {
      window.removeEventListener("scroll", scheduleRefresh);
      window.removeEventListener("resize", scheduleRefresh);
      window.removeEventListener("hashchange", onHashChange);
      if (debounceTimer !== undefined) {
        clearTimeout(debounceTimer);
      }
      if (rafId !== undefined) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [refresh]);

  return activeSectionId;
}
