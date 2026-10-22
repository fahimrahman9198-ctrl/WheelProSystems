import { loadFont } from "@remotion/fonts";
import { Easing, interpolate, spring, staticFile } from "remotion";

// Shared bits for the per-shop pitch video (ShopPitch). Same world as the shop demos:
// warm cream, near-black ink, one orange, teal for second lines; the wheelprosystems.com faces.

for (const w of ["300", "400", "500", "600"]) {
  loadFont({ family: "General Sans", url: staticFile(`fonts/general-sans/GeneralSans-${w}.woff2`), weight: w });
}
// Latin subsets from Google Fonts, self-hosted so a render never needs the network.
loadFont({ family: "Instrument Serif", url: staticFile("fonts/instrument-serif-italic.woff2"), style: "italic", weight: "400" });
loadFont({ family: "Fragment Mono", url: staticFile("fonts/fragment-mono.woff2"), weight: "400" });

export const SANS = "General Sans, sans-serif";
export const SERIF = "Instrument Serif, serif";
export const MONO = "Fragment Mono, monospace";

export const c = {
  bg: "#f3efe3",
  subtle: "#ece6d6",
  muted: "#e4ddca",
  line: "#ddd5c2",
  lineStrong: "#cbc1aa",
  ink: "#141413",
  ink2: "#3b3a36",
  ink3: "#6b675d",
  accent: "#ee5131",
  teal: "#12807a",
  card: "#f9f6ee",
  dark: "#141413",
  readout: "#d8d4c8",
  green: "#5fd39a",
};

export const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;
export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);

/** Fade + rise in at a frame. */
export const rise = (frame: number, at: number, dist = 40) => ({
  opacity: interpolate(frame, [at, at + 10], [0, 1], clamp),
  translate: interpolate(frame, [at, at + 24], [`0px ${dist}px`, "0px 0px"], { ...clamp, easing: easeOut }),
});

/** A springy 0→1 that overshoots before it settles: the rubber-band feel. */
export const stretch = (frame: number, at: number, fps: number, damping = 9) =>
  spring({ frame: frame - at, fps, config: { damping, stiffness: 120, mass: 0.7 } });

/** Squish on a button press at `at`: wider and flatter, then an elastic return. */
export const squish = (frame: number, at: number, fps: number) => {
  const press = interpolate(frame, [at - 4, at], [0, 1], clamp) * (frame < at + 1 ? 1 : 0);
  const back = frame >= at ? 1 - spring({ frame: frame - at, fps, config: { damping: 6, stiffness: 220, mass: 0.5 } }) : 0;
  const k = Math.max(press, back);
  return { scale: `${1 + 0.1 * k} ${1 - 0.14 * k}` };
};

/** Shop names run from 9 to 40 characters. Shrink the font so a line stays within maxWidth. */
export const fitSize = (text: string, maxWidth: number, base: number, charWidth = 0.52) =>
  Math.min(base, Math.floor(maxWidth / (text.length * charWidth)));

/** Same initials as the demo's shop monogram: "The Complete Wheel Shop" → "CW". */
export const initials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** A path in public/ or a full URL. Empty stays empty so scenes can show a fallback. */
export const asset = (p: string) => (!p ? "" : /^https?:/.test(p) ? p : staticFile(p));

// The demo admin's lead funnel (lib/demo-data.ts, "Last 30 days"). Keep in step with it. Sample numbers.
export const funnel = {
  stages: [
    { label: "Requests in", n: 48 },
    { label: "Quote sent", n: 41 },
    { label: "Deposit paid", n: 23 },
    { label: "Booked", n: 21 },
    { label: "Job paid", n: 19 },
  ],
  leakAt: 2, // Quote sent → Deposit paid
  wonBack: 6,
  sources: [
    { name: "Website", leads: 20, booked: 10 },
    { name: "Google", leads: 13, booked: 6 },
    { name: "Instagram", leads: 9, booked: 3 },
    { name: "Facebook", leads: 6, booked: 2 },
  ],
};
