// Music bed for the 48s per-shop pitch video (ShopPitch). 120 BPM, one bar = 2s.
// Cues follow promo-voiceover/SHOP-PITCH-SCRIPT.md and src/pitch/ShopPitch.tsx:
//   0–5s    hook: soft pad, heartbeat, a pluck on each kinetic line
//   5.0s    wipe into the website: whoosh + impact
//   5–14s   website: light groove, one chord per bar, click on the button press (12.7s)
//   14.0s   radial burst into the admin: riser + hit + sparkle arpeggio
//   18–32s  admin tour: full groove; PAID stamp thud at 30.5s
//   32–41s  lead funnel: a tick per stage, tension on the leak (35.7s), lift on follow-ups (37.7s)
//   41–48s  close: crumple + bin thump, resolve on the end card (44s), fade
import { writeFileSync } from "node:fs";

const SR = 44100;
const DUR = 48;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);
const BEAT = 0.5;

// Deterministic noise so re-runs give the same file.
let seed = 1234567;
const rnd = () => ((seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296) * 2 - 1;

const add = (t0, fn, len, pan = 0, gain = 1) => {
  const s0 = Math.floor(t0 * SR);
  const n = Math.floor(len * SR);
  const gl = gain * Math.cos(((pan + 1) * Math.PI) / 4);
  const gr = gain * Math.sin(((pan + 1) * Math.PI) / 4);
  for (let i = 0; i < n && s0 + i < N; i++) {
    if (s0 + i < 0) continue;
    const v = fn(i / SR);
    L[s0 + i] += v * gl;
    R[s0 + i] += v * gr;
  }
};

const midi = (m) => 440 * Math.pow(2, (m - 69) / 12);

function kick(t, g = 1) {
  add(t, (x) => {
    const f = 48 + 110 * Math.exp(-x * 28);
    const ph = 2 * Math.PI * (48 * x + (110 / 28) * (1 - Math.exp(-x * 28)));
    return Math.sin(ph) * Math.exp(-x * 7) * 0.9 + (x < 0.004 ? rnd() * 0.3 : 0) + 0 * f;
  }, 0.45, 0, g);
}
function hat(t, g = 1, pan = 0.25) {
  let hp = 0, prev = 0;
  add(t, (x) => {
    const n = rnd();
    hp = 0.6 * (hp + n - prev); prev = n;
    return hp * Math.exp(-x * 55) * 0.35;
  }, 0.08, pan, g);
}
function clap(t, g = 1) {
  add(t, (x) => {
    const env = Math.exp(-x * 22) * (x < 0.03 ? 0.6 + 0.4 * Math.sin(x * 600) : 1);
    return rnd() * env * 0.32;
  }, 0.25, -0.1, g);
}
function snare(t, g = 1) {
  add(t, (x) => (rnd() * 0.5 + Math.sin(2 * Math.PI * 190 * x) * 0.4) * Math.exp(-x * 26) * 0.4, 0.2, 0.05, g);
}
function pluck(t, m, len, g = 0.12, pan = 0) {
  const f = midi(m);
  add(t, (x) => {
    const s = Math.sin(2 * Math.PI * f * x) + 0.35 * Math.sin(4 * Math.PI * f * x);
    return s * Math.exp(-x * 5) * Math.min(1, x * 400);
  }, len, pan, g);
}
function bass(t, m, len, g = 0.32) {
  const f = midi(m);
  add(t, (x) => {
    const env = Math.min(1, x * 200) * Math.exp(-x * 3.2);
    return (Math.sin(2 * Math.PI * f * x) + 0.25 * Math.sin(4 * Math.PI * f * x)) * env;
  }, len, 0, g);
}
// Soft pad: detuned saws through a one-pole lowpass, slow attack.
function pad(t, notes, len, g = 0.05, att = 0.4) {
  for (const [k, m] of notes.entries()) {
    for (const det of [-0.08, 0.08]) {
      const f = midi(m + det);
      let lp = 0;
      add(t, (x) => {
        const saw = 2 * ((f * x) % 1) - 1;
        lp += 0.06 * (saw - lp);
        const env = Math.min(1, x / att) * Math.min(1, (len - x) / 0.6);
        return lp * env;
      }, len, det < 0 ? -0.4 : 0.4, g * (k === 0 ? 1.2 : 1));
    }
  }
}



const whoosh = (t, len = 0.5, g = 0.3) =>
  add(t - len, (x) => {
    const p = x / len;
    return rnd() * p * p * g;
  }, len, 0, 1);
const impact = (t, g = 1) => {
  kick(t, 1.2 * g);
  add(t, (x) => Math.sin(2 * Math.PI * (38 + 40 * Math.exp(-x * 6)) * x) * Math.exp(-x * 1.6) * 0.5 * g, 1.8);
  add(t, (x) => rnd() * Math.exp(-x * 10) * 0.3 * g, 0.5);
};
const prog = [
  { root: 50, chord: [62, 66, 69] }, // D
  { root: 47, chord: [59, 62, 66] }, // Bm
  { root: 43, chord: [59, 62, 67] }, // G
  { root: 45, chord: [61, 64, 69] }, // A
];
const groove = (t0, bars, { full = true } = {}) => {
  for (let i = 0; i < bars; i++) {
    const c = prog[i % prog.length];
    const b0 = t0 + i * 2;
    for (let b = 0; b < 4; b++) kick(b0 + b * BEAT, full ? 0.85 : 0.6);
    if (full) [1, 3].forEach((b) => clap(b0 + b * BEAT, 0.7));
    for (let h = 0; h < 8; h++) hat(b0 + h * 0.25 + 0.125, full ? 0.45 : 0.3, h % 2 ? 0.3 : -0.3);
    if (full) for (let e = 0; e < 8; e++) bass(b0 + e * 0.25, c.root - 12 + (e === 6 ? 12 : 0), 0.24, 0.26);
    pad(b0, c.chord, 2.0, full ? 0.024 : 0.02, 0.05);
  }
};

// ── 0–5s hook
add(0, (x) => Math.sin(2 * Math.PI * 41 * x) * Math.min(1, x / 3) * 0.25, 5.0);
pad(0, [50, 57, 62], 5, 0.02, 1.2);
for (let t = 1; t < 5; t += 2) { kick(t, 0.6); kick(t + 1, 0.45); }
[0.05, 0.83, 2.33].forEach((t, i) => pluck(t, [74, 78, 81][i], 1.2, 0.07, i % 2 ? 0.3 : -0.3));

// ── 5.0 wipe into the website
whoosh(5.0, 0.6, 0.35);
impact(5.0, 0.9);
groove(5, 4, { full: false });
pluck(12.67, 86, 0.6, 0.08); // button press
clap(12.67, 0.6);

// ── 14.0 radial burst
add(13.0, (x) => { const p = x; return (Math.sin(2 * Math.PI * (220 * x + 200 * x * x)) * 0.08 + rnd() * 0.06) * p * p; }, 1.0);
impact(14.0, 1);
[0, 1, 2, 3, 4, 5].forEach((k) => pluck(14.67 + k * 0.07, 74 + [0, 4, 7, 12, 16, 19][k], 0.7, 0.06, k % 2 ? 0.4 : -0.4));
pad(14, [50, 57, 62, 66, 69], 4, 0.03, 0.3);

// ── 18–32s admin tour
groove(18, 7);
// PAID stamp
impact(30.5, 1.15);
add(30.5, (x) => Math.sin(2 * Math.PI * 70 * x) * Math.exp(-x * 9) * 0.5, 0.4);

// ── 32–41s lead funnel
groove(32, 4);
for (let k = 0; k < 5; k++) pluck(32.6 + k * 0.4, 81 - k * 2, 0.4, 0.05, k % 2 ? 0.35 : -0.35);
pluck(35.67, 70, 1.2, 0.07); pluck(35.67, 73, 1.2, 0.05); // the leak: a tense minor third
pad(37.67, [62, 66, 69, 74], 2.5, 0.03, 0.1); pluck(37.67, 86, 1.0, 0.07); // follow-ups win them back
for (let t = 40.5; t < 41; t += 0.125) snare(t, 0.3 + (t - 40.5));

// ── 41–48s close
add(41.7, (x) => rnd() * Math.exp(-x * 6) * (0.5 + 0.5 * Math.sin(x * 90)) * 0.22, 0.6, -0.2); // crumple
kick(42.5, 0.7); add(42.5, (x) => Math.sin(2 * Math.PI * 95 * x) * Math.exp(-x * 14) * 0.35, 0.3); // into the bin
impact(44, 0.9);
pad(44, [50, 57, 62, 66, 69, 74], 4, 0.034, 0.05);
pluck(44, 86, 3, 0.07);
for (let t = 45; t < 47.5; t += 1) { kick(t, 0.4); hat(t + 0.5, 0.25); }
// ── master: gentle saturation, fades, normalize
let peak = 0;
for (let i = 0; i < N; i++) {
  const t = i / SR;
  const fade = Math.min(1, t / 0.05) * Math.min(1, (DUR - t) / 0.8);
  L[i] = Math.tanh(L[i] * 1.1) * fade;
  R[i] = Math.tanh(R[i] * 1.1) * fade;
  peak = Math.max(peak, Math.abs(L[i]), Math.abs(R[i]));
}
const norm = 0.89 / peak;
const buf = Buffer.alloc(44 + N * 4);
buf.write("RIFF", 0); buf.writeUInt32LE(36 + N * 4, 4); buf.write("WAVE", 8);
buf.write("fmt ", 12); buf.writeUInt32LE(16, 16); buf.writeUInt16LE(1, 20); buf.writeUInt16LE(2, 22);
buf.writeUInt32LE(SR, 24); buf.writeUInt32LE(SR * 4, 28); buf.writeUInt16LE(4, 32); buf.writeUInt16LE(16, 34);
buf.write("data", 36); buf.writeUInt32LE(N * 4, 40);
for (let i = 0; i < N; i++) {
  buf.writeInt16LE(Math.round(L[i] * norm * 32767), 44 + i * 4);
  buf.writeInt16LE(Math.round(R[i] * norm * 32767), 46 + i * 4);
}
const out = new URL("../public/music/pitch-track.wav", import.meta.url);
writeFileSync(out, buf);
console.log("wrote", out.pathname);
