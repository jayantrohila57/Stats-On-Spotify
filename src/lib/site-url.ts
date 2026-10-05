/** Canonical production host for Stats On Spotify (Vercel). */
export const CANONICAL_SITE_URL = "https://statsonspotify.vercel.app";

const BLOCKED_AUTH_HOSTS = ["netlify.app"];

function isBlockedAuthUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    return BLOCKED_AUTH_HOSTS.some((blocked) => host.includes(blocked));
  } catch {
    return false;
  }
}

function normalizeSiteUrl(raw: string): string {
  const trimmed = raw.trim().replace(/\/$/, "");
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

/**
 * Resolves the public site URL used for Auth.js / OAuth callbacks.
 * Ignores stale Netlify (or other blocked) values in AUTH_URL / NEXTAUTH_URL.
 */
export function getSiteUrl(): string {
  const candidates = [
    process.env.AUTH_URL,
    process.env.NEXTAUTH_URL,
    process.env.VERCEL_ENV === "production" ? CANONICAL_SITE_URL : undefined,
    process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : undefined,
  ].filter((value): value is string => Boolean(value));

  for (const candidate of candidates) {
    const normalized = normalizeSiteUrl(candidate);
    if (!isBlockedAuthUrl(normalized)) {
      return normalized;
    }
  }

  if (process.env.NODE_ENV === "production") {
    return CANONICAL_SITE_URL;
  }

  return "http://localhost:3000";
}

/**
 * Ensures Auth.js sees a safe AUTH_URL at runtime (never a stale Netlify deploy URL).
 */
export function applyAuthUrlEnvDefaults(): void {
  const resolved = getSiteUrl();
  process.env.AUTH_URL = resolved;
  process.env.NEXTAUTH_URL = resolved;
}
