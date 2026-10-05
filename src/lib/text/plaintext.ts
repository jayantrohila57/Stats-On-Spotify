const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: "\u00a0",
};

/**
 * Decode common HTML entities and strip tags from Spotify playlist descriptions.
 * Safe for React text children (no HTML injection).
 */
export function spotifyPlainText(raw: string | null | undefined): string {
  if (!raw) {
    return "";
  }

  const withoutTags = raw.replace(/<[^>]*>/g, "");
  return decodeHtmlEntities(withoutTags).replace(/\s+/g, " ").trim();
}

export function decodeHtmlEntities(text: string): string {
  return text.replace(/&(#(?:x([0-9a-fA-F]+)|([0-9]+))|([a-zA-Z]+));/g, (match, _grp, hex: string | undefined, dec: string | undefined, name: string | undefined) => {
    if (hex) {
      const code = parseInt(hex, 16);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (dec) {
      const code = parseInt(dec, 10);
      return Number.isFinite(code) ? String.fromCodePoint(code) : match;
    }
    if (name && name in NAMED_ENTITIES) {
      return NAMED_ENTITIES[name];
    }
    return match;
  });
}
