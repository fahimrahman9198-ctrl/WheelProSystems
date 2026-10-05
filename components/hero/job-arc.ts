// Imperative animation for the hero: icons roll along a quarter-circle track,
// then drop into one of five concentric rings (one per step). Neighbouring rings
// turn in opposite directions; a ring lights up when its step is reached.
// Runs outside React render so the 60fps loop never re-renders the tree.

const NS = "http://www.w3.org/2000/svg";

const ICONS: Record<string, string> = {
  website: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/>',
  gmail: '<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><path d="M3 6.5l9 6.5 9-6.5"/>',
  quote: '<path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/><path d="M14 3v6h6M8 13h8M8 17h5"/>',
  email: '<path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/>',
  invoice: '<path d="M5 2h14v20l-3-2-2 2-2-2-2 2-2-2-3 2z"/><path d="M9 7h6M9 11h6M9 15h4"/>',
  payment: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M2 10h20M6 15h4"/>',
};

export const icon = (k: string, w = 1.8) =>
  `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICONS[k]}</svg>`;

export const JOBS = [
  { id: 1044, name: "Jordan M.", desc: "4 × 20″ · Satin Bronze", src: "website", srcName: "Website form" },
  { id: 1045, name: "Priya S.", desc: "2 × 19″ · Gloss Black", src: "gmail", srcName: "Gmail" },
];
export const STEPS = [
  { label: "Lead captured", time: "08:14", icon: "website" },
  { label: "Quote sent", time: "09:02", icon: "quote" },
  { label: "Follow-up emailed", time: "Tue 09:00", icon: "email" },
  { label: "Invoice sent", time: "Thu 16:20", icon: "invoice" },
  { label: "Paid", time: "Thu 16:41", icon: "payment" },
];

type Item = { k: string; tag: string; job: number; step: number; src?: boolean };
const SEQ: Item[] = JOBS.flatMap((j, ji) => [
  { k: j.src, tag: j.srcName, job: ji, step: 0, src: true },
  { k: "quote", tag: "Quote", job: ji, step: 1 },
  { k: "email", tag: "Follow-up", job: ji, step: 2 },
  { k: "invoice", tag: "Invoice", job: ji, step: 3 },
  { k: "payment", tag: "Payment", job: ji, step: 4 },
]);

const START = 274; // degrees: enters just past the right edge
const END = 206; // where icons leave the track and drop into the rings
const N = 4; // icons on the track at once
const LAP = 10400; // ms for one icon to travel the track

const RING_SPEED = [70, 58, 48, 40, 34]; // seconds per revolution, outer → inner
const NODES = 4; // nodes per ring, 90° apart, so one is always in view

export function startJobArc(hero: HTMLElement, track: SVGSVGElement, live: HTMLElement, reduce: boolean) {
  // ring state: "" pending, "now" next step, "done" reached
  const state: string[] = STEPS.map((_, i) => (i === 0 ? "now" : ""));
  let job = 0;
  const nodes: HTMLDivElement[][] = STEPS.map((st) =>
    Array.from({ length: NODES }, () => {
      const el = document.createElement("div");
      el.className = "ring-node";
      el.setAttribute("aria-hidden", "true");
      el.innerHTML = `<span class="ic">${icon(st.icon, 2)}</span><span class="lbl">${st.label}</span>`;
      hero.appendChild(el);
      return el;
    }),
  );
  let ringEls: SVGCircleElement[] = [];
  let radii: number[] = [];

  function paint() {
    nodes.forEach((ns, i) => ns.forEach((n) => (n.className = `ring-node ${state[i]}`)));
    ringEls.forEach((c, i) => c.setAttribute("class", `ring ${state[i]}`));
    nodes[0].forEach((n) => (n.querySelector(".ic")!.innerHTML = icon(JOBS[job].src, 2)));
  }
  function tick(item: Item) {
    if (item.step === 0) {
      job = item.job;
      state.fill("");
    }
    state[item.step] = "done";
    if (item.step + 1 < STEPS.length) state[item.step + 1] = "now";
    paint();
    live.textContent = `${JOBS[job].name}: ${STEPS[item.step].label}`;
  }

  // geometry: quarter circle centred on the hero's bottom-right corner
  let W = 0, H = 0, R = 0, mobile = false;
  const pt = (deg: number, r = R): [number, number] => {
    const a = (deg * Math.PI) / 180;
    return [W + r * Math.cos(a), H + r * Math.sin(a)];
  };

  type Badge = { el: HTMLDivElement; i: number; lastP: number | null; item: Item; trail: SVGCircleElement[] };
  let next = 0;
  const badges: Badge[] = Array.from({ length: N }, (_, i) => {
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    hero.appendChild(el);
    return { el, i, lastP: null, item: SEQ[0], trail: [] };
  });
  const assign = (b: Badge) => {
    b.item = SEQ[next++ % SEQ.length];
    b.el.className = "arc-badge" + (b.item.src ? " src" : "");
    b.el.innerHTML = icon(b.item.k) + `<span class="tag">${b.item.tag}</span>`;
  };
  // the badge furthest along arrives first, so it carries the first item
  [...badges].sort((a, b) => b.i - a.i).forEach(assign);

  function layout() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    mobile = W < 1024;
    const band = mobile ? 64 : 96;
    R = mobile ? W * 1.02 : Math.min(W * 0.44, H * 0.74);
    track.setAttribute("viewBox", `0 0 ${W} ${H}`);
    track.innerHTML = `
      <defs>
        <linearGradient id="arcBand" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3f4f5"/><stop offset="1" stop-color="#e9eaed"/></linearGradient>
        <filter id="arcBlur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="${mobile ? 6 : 9}"/></filter>
      </defs>
      <circle cx="${W}" cy="${H}" r="${R}" fill="none" stroke="url(#arcBand)" stroke-width="${band}"/>
      <circle cx="${W}" cy="${H}" r="${R + band / 2}" fill="none" stroke="#e7e8eb"/>
      <circle cx="${W}" cy="${H}" r="${R - band / 2}" fill="none" stroke="#eceef0"/>
      <circle cx="${W}" cy="${H}" r="${R}" fill="none" stroke="#fff" stroke-width="1.5" stroke-dasharray="2 10" opacity=".9"/>
      <g id="arcRings"></g>
      <g id="arcTrails" filter="url(#arcBlur)"></g>`;
    const inner = R - band / 2 - (mobile ? 14 : 28);
    radii = STEPS.map((_, i) => inner * (0.92 - i * 0.12));
    const ringsG = track.querySelector("#arcRings")!;
    ringEls = radii.map((r) => {
      const c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", String(W));
      c.setAttribute("cy", String(H));
      c.setAttribute("r", String(r));
      ringsG.appendChild(c);
      return c;
    });
    paint();
    const trails = track.querySelector("#arcTrails")!;
    for (const b of badges) {
      b.trail = Array.from({ length: 8 }, (_, k) => {
        const c = document.createElementNS(NS, "circle");
        c.setAttribute("r", String((mobile ? 22 : 28) - k));
        c.setAttribute("fill", "#1e2433");
        trails.appendChild(c);
        return c;
      });
    }
  }

  const ringAngle = (i: number, t: number) => (((t / 1000) * 360) / RING_SPEED[i]) * (i % 2 ? -1 : 1);
  // the node of ring i currently closest to the middle of the visible quadrant
  function target(i: number) {
    const base = ringAngle(i, elapsed);
    let best = 0, bestD = 999;
    for (let k = 0; k < NODES; k++) {
      const a = (((base + k * 90) % 360) + 360) % 360;
      const d = Math.abs(a - 225);
      if (d < bestD) {
        bestD = d;
        best = a;
      }
    }
    return pt(best, radii[i]);
  }

  function flyToRing(item: Item, x: number, y: number) {
    const f = document.createElement("div");
    f.className = "arc-fly";
    f.innerHTML = icon(item.k);
    hero.appendChild(f);
    const [tx, ty] = target(item.step);
    f.animate(
      [
        { transform: `translate(${x}px, ${y}px) scale(2.4)`, opacity: 1, filter: "blur(0px)" },
        { transform: `translate(${tx}px, ${ty}px) scale(1.4)`, opacity: 0.9, filter: "blur(0px)", offset: 0.8 },
        { transform: `translate(${tx}px, ${ty}px) scale(.6)`, opacity: 0, filter: "blur(6px)" },
      ],
      { duration: 900, easing: "cubic-bezier(.65,0,.35,1)" },
    ).finished.then(() => {
      f.remove();
      tick(item);
    }, () => f.remove());
  }

  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(hero);

  let raf = 0, visible = true, elapsed = 0, last = performance.now();
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
  io.observe(hero);

  function frame(now: number) {
    const dt = Math.min(64, now - last);
    last = now;
    if (visible && !document.hidden) elapsed += dt;
    const t = reduce ? 0.3 : elapsed / LAP;
    nodes.forEach((ns, i) => {
      const base = ringAngle(i, reduce ? 0 : elapsed);
      ns.forEach((n, k) => {
        const [x, y] = pt(base + k * 90 + (reduce ? 225 : 0), radii[i]);
        n.style.transform = `translate(${x}px, ${y}px)`;
      });
    });
    for (const b of badges) {
      const p = (t + b.i / N) % 1;
      const ang = START - p * (START - END);
      const [x, y] = pt(ang);
      const fade = Math.min(1, p / 0.06, (1 - p) / 0.06);
      b.el.style.transform = `translate(${x}px, ${y}px) scale(${0.85 + 0.15 * fade})`;
      b.el.style.opacity = String(fade);
      b.trail.forEach((c, k) => {
        const [tx, ty] = pt(ang + (k + 1) * (mobile ? 2.4 : 1.8));
        c.setAttribute("cx", String(tx));
        c.setAttribute("cy", String(ty));
        c.setAttribute("opacity", (0.28 * (1 - k / 8) * fade).toFixed(3));
      });
      if (!reduce && b.lastP !== null && p < b.lastP && b.lastP > 0.9) {
        flyToRing(b.item, ...pt(END));
        assign(b);
      }
      b.lastP = p;
    }
    if (!reduce) raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  if (reduce) SEQ.slice(0, 3).forEach(tick);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    badges.forEach((b) => b.el.remove());
    nodes.flat().forEach((n) => n.remove());
    hero.querySelectorAll(".arc-fly").forEach((f) => f.remove());
  };
}
