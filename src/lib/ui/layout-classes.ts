/** Shared layout tokens — align with shadcn Card/Button radius and spacing scale. */

/** Primary dashboard content width (matches header + filter bar). */
export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-[1400px] px-4 md:px-6";

/** In-page section anchor offset (sticky header + mobile nav). */
export const SECTION_SCROLL_MARGIN_CLASS = "scroll-mt-20";

/** Vertical rhythm between major dashboard blocks. */
export const SECTION_STACK_CLASS = "space-y-8";

/** Segmented control / toolbar inset (period filter, table page size). */
export const SEGMENTED_CONTROL_CLASS = "inline-flex rounded-md border border-border p-0.5";

/** Nested panel inside a section (KPI snapshot, overlap stats) — matches CardContent padding. */
export const INSET_PANEL_CLASS = "rounded-md border border-border bg-muted/30 p-6";

/** Horizontal scroll container for wide tables inside cards. */
export const TABLE_SCROLL_WRAPPER_CLASS = "min-w-0 max-w-full overflow-x-auto";

/** Major section grid gap (pair cards, two-column layouts). */
export const SECTION_GRID_GAP_CLASS = "gap-8";

/** Account menu trigger in analytics header (avatar + chevron, no name on narrow viewports). */
export const HEADER_ACCOUNT_BUTTON_SKELETON_CLASS = "h-9 w-[4.25rem] shrink-0 rounded-md";

/** Mobile section nav chip — matches `py-1` + `text-xs` + border. */
export const MOBILE_NAV_CHIP_SKELETON_CLASS = "h-[26px] w-[4.5rem] shrink-0 rounded-md border border-transparent";
