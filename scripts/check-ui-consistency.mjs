#!/usr/bin/env node
/**
 * Flags legacy / arbitrary styling that breaks shadcn layout conventions.
 * Exits 1 when violations are found.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.join(process.cwd(), "src");
const SKIP_DIRS = new Set(["node_modules"]);
const ALLOWED_FILES = new Set(["src/components/ui/chart.tsx"]);

const RULES = [
  {
    id: "zinc-palette",
    pattern: /\bzinc-\d{2,3}\b/,
    message: "Use semantic tokens (background, muted, border, foreground) instead of zinc-*",
  },
  {
    id: "arbitrary-text-size",
    pattern: /\btext-\[\d+px\]/,
    message: "Use text-xs, text-sm, text-base, text-lg, etc. instead of arbitrary text-[Npx]",
  },
  {
    id: "hex-background",
    pattern: /\bbg-\[#/,
    message: "Use theme colors instead of hex background utilities",
  },
  {
    id: "legacy-rounded-2xl",
    pattern: /\brounded-2xl\b/,
    message: "Use rounded-xl (Card) or rounded-md (controls) per shadcn defaults",
  },
  {
    id: "faded-border-token",
    pattern: /\bborder-border\/\d+/,
    message: "Prefer border-border for surfaces; use Separator for subtle dividers",
  },
];

async function walk(dir, files = []) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      await walk(path.join(dir, entry.name), files);
    } else if (/\.(tsx|ts|css)$/.test(entry.name)) {
      files.push(path.join(dir, entry.name));
    }
  }
  return files;
}

const files = await walk(ROOT);
const violations = [];

for (const file of files) {
  const rel = path.relative(process.cwd(), file).replaceAll("\\", "/");
  if (ALLOWED_FILES.has(rel)) continue;
  const content = await readFile(file, "utf8");
  const lines = content.split("\n");
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.includes("// ui-consistency-ignore")) continue;
    for (const rule of RULES) {
      if (rule.pattern.test(line)) {
        violations.push({ file: rel, line: i + 1, rule: rule.id, message: rule.message, snippet: line.trim() });
      }
    }
  }
}

if (violations.length === 0) {
  console.log("check-ui-consistency: OK");
  process.exit(0);
}

console.error(`check-ui-consistency: ${violations.length} violation(s)\n`);
for (const v of violations) {
  console.error(`${v.file}:${v.line} [${v.rule}] ${v.message}`);
  console.error(`  ${v.snippet}\n`);
}
process.exit(1);
