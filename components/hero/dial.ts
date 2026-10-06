// Hero "rev dial": a blueprint wheel in the bottom-right corner wrapped by a
// rev-counter scale. Scroll position drives the needle through the job steps
// (scroll down climbs Lead → Paid, scroll up drops back); the step name and
// detail ride on two curved lines that follow the needle. The wheel turns with
// scroll. Behind it, faint rings spread out from the dial and the ring under
// the pointer lights up in bronze. One rAF loop, outside React render.

const NS = "http://www.w3.org/2000/svg";

const STEPS = [
  { v: 0, label: "Waiting for a lead", info: "System idle" },
  { v: 1.2, label: "Lead captured", info: "Website form · Jordan M." },
  { v: 2.7, label: "Quote sent", info: "Q-1044 · 4 × 20″ · $180" },
  { v: 4.2, label: "Follow-up emailed", info: "Day 2 · automatic" },
  { v: 5.7, label: "Invoice sent", info: "INV-1044 · $180" },
  { v: 7.1, label: "Paid", info: "$180 received · Stripe" },
];
const RED = 7.5; // red line starts here (scale runs 0–8)
const PAID_ZONE = 4; // from "Invoice sent" on, the red line turns green
const WHEEL_SPIN = 0.25; // wheel degrees per scrolled pixel

const f = (n: number) => n.toFixed(1);
const P = (r: number, deg: number): [number, number] => {
  const t = (deg * Math.PI) / 180;
  return [r * Math.cos(t), r * Math.sin(t)];
};
const arc = (r: number, a0: number, a1: number) => {
  const [x0, y0] = P(r, a0), [x1, y1] = P(r, a1);
  return `M${f(x0)} ${f(y0)}A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${f(x1)} ${f(y1)}`;
};
function mk<K extends keyof SVGElementTagNameMap>(p: Element, tag: K, a: Record<string, string | number> = {}, cls?: string) {
  const e = document.createElementNS(NS, tag);
  for (const k in a) e.setAttribute(k, String(a[k]));
  if (cls) e.setAttribute("class", cls);
  p.appendChild(e);
  return e;
}
const stepAt = (v: number) => STEPS.reduce((s, st, i) => (v >= st.v - 0.02 ? i : s), 0);
const rpm = (v: number) => (Math.round((v * 1000) / 50) * 50).toLocaleString("en-US");

// Line drawing of a rally-style wheel around (0,0): eight rounded windows and
// a ring of rivets around the centre.
function wheel(g: SVGGElement, R: number) {
  const draw = (el: SVGElement) => el.classList.add("dial-stroke");
  const L = (r: number, a: number) => P(r, a).map(f).join(" ");
  const rb = R * 0.73, rh = R * 0.27, r1 = R * 0.37, r2 = rb - R * 0.05;
  [R, R * 0.9, R * 0.8, R * 0.765, rh, R * 0.19, R * 0.07].forEach((r) => draw(mk(g, "circle", { r: f(r) })));
  mk(g, "circle", { r: f(rb) }, "dial-thin");
  for (let i = 0; i < 8; i++) {
    const c = i * 45 + 22.5;
    const d = `M${L(r1, c - 11)}L${L(r2, c - 16)}A${f(r2)} ${f(r2)} 0 0 1 ${L(r2, c + 16)}L${L(r1, c + 11)}A${f(r1)} ${f(r1)} 0 0 0 ${L(r1, c - 11)}Z`;
    draw(mk(g, "path", { d }));
    const [x, y] = P(R * 0.315, i * 45);
    draw(mk(g, "circle", { cx: f(x), cy: f(y), r: f(R * 0.011) }));
  }
  for (let i = 0; i < 5; i++) {
    const [lx, ly] = P(R * 0.13, i * 72 - 54);
    draw(mk(g, "circle", { cx: f(lx), cy: f(ly), r: f(R * 0.022) }));
  }
  for (let i = 0; i < 90; i++) {
    const [x1, y1] = P(R * 0.9, i * 4 + 2), [x2, y2] = P(R, i * 4 + 2);
    mk(g, "line", { x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2) }, "dial-tread");
  }
}

export function startDial(stage: HTMLElement, pin: HTMLElement, svg: SVGSVGElement, rings: HTMLCanvasElement, live: HTMLElement, reduce: boolean, onStep?: (step: number) => void) {
  let update: (v: number, rot: number) => void = () => {};
  let ring = { cx: 0, cy: 0, r0: 0, W: 0, H: 0, dpr: 1 };
  let uid = 0;

  function build() {
    const W = stage.clientWidth, H = stage.clientHeight, m = W < 1024;
    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    // Phones: the wheel sits behind the copy; its centre stays below the buttons
    // so the curved labels land in the clear space under them.
    const copy = stage.querySelector("h1")?.parentElement;
    const copyEnd = copy ? copy.getBoundingClientRect().bottom - stage.getBoundingClientRect().top : H * 0.6;
    const R = m ? Math.min(W * 0.68, 300) : Math.min(H * 0.38, 300), cx = m ? W + W * 0.12 : W - 10;
    const cy = m ? Math.max(H * 0.8, copyEnd + 200) : H - 34;
    const r0 = R + (m ? 44 : 58), r1 = R + (m ? 62 : 80), A = (v: number) => 180 + (v / 8) * 90;
    const pt = (r: number, v: number) => { const [x, y] = P(r, A(v)); return [cx + x, cy + y]; };
    const dpr = Math.min(devicePixelRatio || 1, 2);
    rings.width = Math.round(W * dpr);
    rings.height = Math.round(H * dpr);
    ring = { cx, cy, r0: R + (m ? 120 : 170), W, H, dpr };
    const fx = mk(svg, "g"), g = mk(svg, "g");
    wheel(g, R);

    // scale
    const sc = mk(fx, "g");
    mk(sc, "path", { d: arc(r1, 180, 270), transform: `translate(${cx} ${cy})` }, "dial-line");
    mk(sc, "path", { d: arc(r1 + 6, A(RED), 270), transform: `translate(${cx} ${cy})` }, "dial-red");
    for (let v = 0; v <= 8.001; v += 0.25) {
      const major = Math.abs(v - Math.round(v)) < 0.01;
      const [x1, y1] = P(major ? r0 : r1 - 9, A(v)), [x2, y2] = P(r1, A(v));
      mk(sc, "line", { x1: f(cx + x1), y1: f(cy + y1), x2: f(cx + x2), y2: f(cy + y2) }, `dial-tick${major ? " major" : ""}${v >= RED ? " red" : ""}`);
      if (major) {
        const [nx, ny] = P(r1 + 24, A(v));
        const t = mk(sc, "text", { x: f(cx + nx), y: f(cy + ny + 5), "text-anchor": "middle" }, "dial-num");
        t.textContent = String(Math.round(v));
      }
    }

    // needle + two curved lines of text that follow it
    const needle = mk(fx, "line", {}, "dial-needle");
    const rText = r1 + (m ? 80 : 92), id = `dial-${++uid}`;
    const curve = (r: number, k: string, cls: string) => {
      mk(fx, "path", { id: id + k, d: arc(r, 140, 310), transform: `translate(${cx} ${cy})`, fill: "none" });
      const T = mk(fx, "text", {}, `dial-curve ${cls}`);
      return mk(T, "textPath", { href: `#${id}${k}`, "text-anchor": "middle" });
    };
    // Phones: the arc is wider than the screen, so the labels sit flat in the
    // clear space under the buttons instead of riding the curve.
    const flat = (y: number, cls: string) => mk(fx, "text", { x: 20, y: f(y) }, `dial-curve ${cls}`);
    const big = m ? flat(copyEnd + 64, "big") : curve(rText + 18, "a", "big");
    const small = m ? flat(copyEnd + 88, "small") : curve(rText - 10, "b", "small");
    if (m) [g, sc].forEach((el) => el.setAttribute("opacity", "0.55"));
    // Labels follow the needle but stay on the visible part of the arc.
    const lo = 206, hi = 252;
    const at = (v: number) => `${(((Math.min(hi, Math.max(lo, A(v))) - 140) / 170) * 100).toFixed(2)}%`;

    let last = -1;
    update = (v, rot) => {
      g.setAttribute("transform", `translate(${f(cx)} ${f(cy)}) rotate(${f(rot)})`);
      const [x1, y1] = pt(R + 14, v), [x2, y2] = pt(rText - 34, v);
      needle.setAttribute("x1", f(x1));
      needle.setAttribute("y1", f(y1));
      needle.setAttribute("x2", f(x2));
      needle.setAttribute("y2", f(y2));
      if (!m) {
        big.setAttribute("startOffset", at(v));
        small.setAttribute("startOffset", at(v));
      }
      const s = stepAt(v);
      if (s !== last) {
        last = s;
        svg.classList.toggle("dial-ok", s >= PAID_ZONE);
        big.textContent = STEPS[s].label;
        small.innerHTML = `${STEPS[s].info.toUpperCase()}<tspan dx="10" class="rp"></tspan><tspan dx="4">R/MIN</tspan>`;
        if (s > 0) live.textContent = `${STEPS[s].label}: ${STEPS[s].info}`;
        onStep?.(s);
      }
      small.querySelector(".rp")!.textContent = rpm(v);
    };
  }

  build();
  const ro = new ResizeObserver(build);
  ro.observe(stage);

  // Needle follows scroll progress through the pinned hero (or the first
  // 520px of scroll when the hero isn't pinned, e.g. on phones).
  let target = window.scrollY, eased = target, raf = 0;
  const onScroll = () => (target = window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });
  // Pointer for the rings; with no pointer (phones, idle) it drifts slowly.
  const ptr = { x: -1e4, y: -1e4, sx: -1e4, sy: -1e4, last: -1e9 };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = stage.getBoundingClientRect();
    ptr.x = e.clientX - r.left;
    ptr.y = e.clientY - r.top;
    ptr.last = performance.now();
  };
  stage.addEventListener("pointermove", onMove);
  const ctx = rings.getContext("2d")!;
  function drawRings(t: number) {
    const { cx, cy, r0, W, H, dpr } = ring;
    if (!reduce && t - ptr.last > 2500) {
      const s = t / 1000;
      ptr.x = W * (0.62 + 0.22 * Math.sin(s * 0.3));
      ptr.y = H * (0.45 + 0.25 * Math.sin(s * 0.47 + 1));
    }
    if (ptr.sx < -1e3) {
      ptr.sx = ptr.x;
      ptr.sy = ptr.y;
    }
    ptr.sx += (ptr.x - ptr.sx) * 0.12;
    ptr.sy += (ptr.y - ptr.sy) * 0.12;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);
    const pd = Math.hypot(ptr.sx - cx, ptr.sy - cy), pa = Math.atan2(ptr.sy - cy, ptr.sx - cx);
    const rMax = Math.hypot(cx, cy) + 20;
    for (let r = r0; r < rMax; r += 26) {
      const k = reduce ? 0 : Math.exp(-((r - pd) ** 2) / (2 * 26 * 26));
      ctx.lineWidth = 0.8 + k * 0.6;
      ctx.strokeStyle = `rgba(110,106,97,${0.045 + 0.035 * k})`;
      ctx.beginPath();
      ctx.arc(cx, cy, r, Math.PI * 0.94, Math.PI * 1.5);
      ctx.stroke();
      if (k > 0.03) {
        ctx.strokeStyle = `rgba(154,91,30,${0.26 * k})`;
        ctx.beginPath();
        ctx.arc(cx, cy, r, pa - 0.22, pa + 0.22);
        ctx.stroke();
      }
    }
  }

  function frame(t: number) {
    eased += (target - eased) * (reduce ? 1 : 0.14);
    const top = pin.offsetTop, span = pin.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, (eased - top) / (span > 300 ? span : 520)));
    update(0.15 + p * 7.6, reduce ? 0 : (eased - top) * WHEEL_SPIN);
    if (!document.hidden && stage.getBoundingClientRect().bottom > 0) drawRings(t);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    window.removeEventListener("scroll", onScroll);
    stage.removeEventListener("pointermove", onMove);
    svg.innerHTML = "";
  };
}
