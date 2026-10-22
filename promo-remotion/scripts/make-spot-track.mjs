// Music bed for the 30s voiceover spot (WheelProSpot). 120 BPM, bars start at 1.0s + 2k.
// Written around the locked voiceover cues in src/spot/cues.ts — sound leads picture.
//   0–1s    pickup: notification ping, sub swell
//   1–5s    hook: heartbeat kick, filtered pad (sits under VO 1)
//   5–9s    pain: groove builds, ticks on every chip, riser + snare roll
//   9.0s    DROP: impact on the brand reveal
//   11–19s  benefits: one chord per bar = one benefit per bar
//   19–23s  proof: lift, fill into the end card
//   23–30s  end card: resolve, light pulse, clean tag, fade
import { writeFileSync } from "node:fs";

const SR = 44100;
const DUR = 30;
const N = SR * DUR;
const L = new Float32Array(N);
const R = new Float32Array(N);
const BEAT = 0.5;
const DROP = 9.0;

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


// ── 0–1s pickup
pluck(0.2, 74, 1.4, 0.08, 0.3);
add(0, (x) => Math.sin(2 * Math.PI * 41 * x) * Math.min(1, x / 4) * 0.3, 5.0);

// ── 1–5s hook: heartbeat under the voice
for (let t = 1; t < 5; t += 2) { kick(t, 0.75); kick(t + 1, 0.55); }
for (let t = 1.5; t < 5; t += 1) hat(t, 0.35);
pad(1, [50, 57, 62], 4, 0.022, 1.5);

// ── 5–9s pain: groove builds, a tick on every chip
for (let t = 5; t < DROP; t += BEAT) kick(t, 0.8);
for (let t = 5.25; t < DROP; t += BEAT) hat(t, 0.6);
[6, 7, 8].forEach((t) => clap(t + 0.5, 0.6));
for (let t = 5; t < 8.6; t += 0.5) pluck(t, 81 + ((t * 2) % 3), 0.25, 0.035, (t * 2) % 2 ? 0.4 : -0.4);
pad(5, [50, 57, 62, 64], 4, 0.025, 2.5);
add(6.5, (x) => {
  const p = x / 2.5;
  const ph = 2 * Math.PI * (220 * x + 180 * x * x);
  return (Math.sin(ph) * 0.1 + rnd() * 0.09) * p * p;
}, 2.5, 0, 1);
for (let t = 8.0; t < 8.5; t += 0.125) snare(t, 0.5);
for (let t = 8.5; t < DROP - 0.01; t += 0.0625) snare(t, 0.35 + (t - 8.5));

// ── 9.0 DROP
kick(DROP, 1.25);
add(DROP, (x) => Math.sin(2 * Math.PI * (38 + 40 * Math.exp(-x * 6)) * x) * Math.exp(-x * 1.4) * 0.6, 2.2);
add(DROP, (x) => rnd() * Math.exp(-x * 9) * 0.35, 0.6);
pad(DROP, [50, 57, 62, 66, 69], 2.1, 0.045, 0.02);
pluck(DROP, 81, 1.8, 0.08);
kick(10, 0.7); hat(10.5, 0.5);
for (let t = 10.5; t < 11; t += 0.125) snare(t, 0.3);

// ── 11–19s benefits, 19–23 proof: one chord per bar
const prog = [
  { root: 50, chord: [62, 66, 69] }, // D   — leads
  { root: 47, chord: [59, 62, 66] }, // Bm  — quotes
  { root: 43, chord: [59, 62, 67] }, // G   — follow-ups
  { root: 45, chord: [61, 64, 69] }, // A   — deposits
  { root: 50, chord: [62, 66, 69] }, // D   — proof
  { root: 43, chord: [62, 67, 71] }, // G   — proof, fill out
];
prog.forEach((c, i) => {
  const t0 = 11 + i * 2;
  for (let b = 0; b < 4; b++) kick(t0 + b * BEAT, 0.85);
  [1, 3].forEach((b) => clap(t0 + b * BEAT, 0.8));
  for (let h = 0; h < 8; h++) hat(t0 + h * 0.25 + 0.125, 0.5, h % 2 ? 0.3 : -0.3);
  for (let e = 0; e < 8; e++) bass(t0 + e * 0.25, c.root - 12 + (e === 6 ? 12 : 0), 0.24, 0.3);
  pad(t0, c.chord, 2.0, 0.026, 0.05);
  pluck(t0, c.chord[2] + 12, 0.8, 0.06, 0.2);
});
for (let t = 22.5; t < 23; t += 0.125) snare(t, 0.3 + (t - 22.5));

// ── 23–30s end card: resolve, then a light pulse under the CTA
kick(23, 1.0);
add(23, (x) => Math.sin(2 * Math.PI * (40 + 30 * Math.exp(-x * 5)) * x) * Math.exp(-x * 1.2) * 0.45, 3);
pad(23, [50, 57, 62, 66, 69, 74], 7, 0.035, 0.05);
pluck(23, 86, 3, 0.07);
for (let t = 25; t < 29; t += 1) kick(t, 0.45);
for (let t = 25.5; t < 29; t += 1) hat(t, 0.3);
pluck(29, 81, 1.0, 0.05, -0.3);
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
const out = new URL("../public/music/spot-track.wav", import.meta.url);
writeFileSync(out, buf);
console.log("wrote", out.pathname);
