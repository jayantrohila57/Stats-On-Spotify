import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const url = process.argv[2] ?? "https://statsonspotify.vercel.app/login";
const outDir = process.argv[3] ?? "/opt/cursor/artifacts/screenshots";
const widths = [390, 768, 1440];

await mkdir(outDir, { recursive: true });

const browser = await chromium.launch();
const context = await browser.newContext({ colorScheme: "dark" });

for (const width of widths) {
  const page = await context.newPage();
  await page.setViewportSize({ width, height: 900 });
  await page.goto(url, { waitUntil: "networkidle", timeout: 120_000 });
  await page.waitForTimeout(1500);
  const file = path.join(outDir, `viewport-${width}.png`);
  await page.screenshot({ path: file, fullPage: true });
  console.log("wrote", file);
  await page.close();
}

await browser.close();
