// Renders one ShopPitch video per shop in ../lib/shops.ts (the same list that powers /demo/<slug>).
//
//   node scripts/render-pitches.mjs                       # every shop
//   node scripts/render-pitches.mjs --only pj-wheels,wheel-fix-it
//   node scripts/render-pitches.mjs --only pj-wheels --shots-only   # screenshots for Studio, no render
//
// For each shop, with headless Chrome:
//   their demo, five screens → public/pitch/<slug>-site/-leads/-quote/-pay/-paid.png (always retaken)
// then renders out/pitch/<slug>.mp4. The demo screens come from DEMO_ORIGIN (default: the local dev
// server, so run `npm run dev` in the site first).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { TAX } from "../../lib/demo-data.ts";
import { shops } from "../../lib/shops.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const CHROME = process.env.CHROME ?? "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PAGE_BASE = process.env.PAGE_BASE ?? "wheelprosystems.com/demo/";
const DEMO_ORIGIN = process.env.DEMO_ORIGIN ?? "http://localhost:3000";

const args = process.argv.slice(2);
const shotsOnly = args.includes("--shots-only");
const only = args.includes("--only") ? args[args.indexOf("--only") + 1].split(",") : null;

const list = only ? shops.filter((s) => only.includes(s.slug)) : shops;
if (only && list.length !== only.length) {
  console.error("Unknown slug in --only. Known:", shops.map((s) => s.slug).join(", "));
  process.exit(1);
}

try {
  await fetch(DEMO_ORIGIN, { method: "HEAD" });
} catch {
  console.error(`Can't reach ${DEMO_ORIGIN}. Start the site (npm run dev in the repo root) or set DEMO_ORIGIN.`);
  process.exit(1);
}

const screenshot = (url, file, size) =>
  spawnSync(CHROME, ["--headless=new", "--hide-scrollbars", "--disable-gpu", `--window-size=${size}`, "--virtual-time-budget=8000", `--screenshot=${file}`, url], {
    stdio: "ignore",
    timeout: 60_000,
  }).status === 0 && existsSync(file);

mkdirSync(join(root, "public/pitch"), { recursive: true });
mkdirSync(join(root, "out/pitch"), { recursive: true });

const failed = [];
for (const shop of list) {
  console.log(`\n▸ ${shop.name}`);
  // ?shot=1 hides the demo bars; each admin state is a URL, so these are the same every time.
  const demo = `${DEMO_ORIGIN}/demo/${shop.slug}`;
  const screens = {
    site: [`${demo}?shot=1`, "1440,2400"],
    leads: [`${demo}/admin?view=leads&lead=jordan&shot=1`, "1440,900"],
    quote: [`${demo}/admin?view=quote&lead=jordan&sent=1&shot=1`, "1440,900"],
    pay: [`${demo}/admin?view=payments&lead=jordan&shot=1`, "1440,900"],
    paid: [`${demo}/admin?view=payments&lead=jordan&paid=1&shot=1`, "1440,900"],
  };
  for (const [name, [url, size]] of Object.entries(screens)) {
    if (!screenshot(url, join(root, `public/pitch/${shop.slug}-${name}.png`), size)) {
      console.error(`  demo ${name}: screenshot failed (${url})`);
      failed.push(shop.slug);
    }
  }

  if (shotsOnly) continue;

  const props = {
    shopName: shop.name,
    city: shop.city,
    tax: (TAX[shop.province] ?? TAX.ON).label.replace(/ \d.*?%/g, ""),
    pageUrl: PAGE_BASE + shop.slug,
    demoShots: `pitch/${shop.slug}`,
  };
  const out = `out/pitch/${shop.slug}.mp4`;
  const r = spawnSync("npx", ["remotion", "render", "ShopPitch", out, `--props=${JSON.stringify(props)}`], { cwd: root, stdio: "inherit" });
  if (r.status === 0) console.log(`  video: ${out}`);
  else failed.push(shop.slug);
}

if (failed.length) {
  console.error(`\nFailed: ${failed.join(", ")}`);
  process.exit(1);
}
