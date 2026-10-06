// Hero "rev dial": a blueprint wheel in the bottom-right corner wrapped by a
// rev-counter scale. Scroll position drives the needle through the job steps
// (scroll down climbs Lead → Paid, scroll up drops back); the step name and
// detail ride on two curved lines that follow the needle. The wheel turns with
// scroll. One rAF loop, outside React render.

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

// Line drawing of a split 5-spoke wheel around (0,0); `draw` elements animate in.
function wheel(g: SVGGElement, R: number) {
  const draw = (el: SVGElement, d: number) => {
    el.classList.add("dial-draw");
    el.style.setProperty("--d", `${d}s`);
  };
  const rb = R * 0.73, rh = R * 0.27;
  ([[R, 0], [R * 0.9, 0.08], [R * 0.8, 0.16], [R * 0.765, 0.22], [rh, 0.3], [R * 0.19, 0.36], [R * 0.07, 0.42]] as const).forEach(([r, d]) =>
    draw(mk(g, "circle", { r: f(r) }), d),
  );
  mk(g, "circle", { r: f(rb) }, "dial-thin");
  for (let i = 0; i < 5; i++) {
    const a = i * 72 - 90;
    for (const s of [-1, 1]) {
      const c = a + s * 9;
      const p = [P(rh, c - 5), P(rb, c - 2.6), P(rb, c + 2.6), P(rh, c + 5)];
      const d = `M${f(p[0][0])} ${f(p[0][1])}L${f(p[1][0])} ${f(p[1][1])}A${f(rb)} ${f(rb)} 0 0 1 ${f(p[2][0])} ${f(p[2][1])}L${f(p[3][0])} ${f(p[3][1])}`;
      draw(mk(g, "path", { d }), 0.5 + i * 0.08);
    }
    const [lx, ly] = P(R * 0.13, a + 36);
    draw(mk(g, "circle", { cx: f(lx), cy: f(ly), r: f(R * 0.022) }), 0.95);
  }
  for (let i = 0; i < 90; i++) {
    const [x1, y1] = P(R * 0.9, i * 4 + 2), [x2, y2] = P(R, i * 4 + 2);
    mk(g, "line", { x1: f(x1), y1: f(y1), x2: f(x2), y2: f(y2) }, "dial-tread");
  }
}

export function startDial(stage: HTMLElement, pin: HTMLElement, svg: SVGSVGElement, live: HTMLElement, reduce: boolean) {
  let update: (v: number, rot: number) => void = () => {};
  let uid = 0;

  function build() {
    const W = stage.clientWidth, H = stage.clientHeight, m = W < 1024;
    svg.innerHTML = "";
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    const R = m ? 140 : Math.min(H * 0.38, 300), cx = W - (m ? 0 : 10), cy = H - (m ? 20 : 34);
    const r0 = R + (m ? 44 : 58), r1 = R + (m ? 62 : 80), A = (v: number) => 180 + (v / 8) * 90;
    const pt = (r: number, v: number) => { const [x, y] = P(r, A(v)); return [cx + x, cy + y]; };
    const fx = mk(svg, "g"), g = mk(svg, "g");
    wheel(g, R);

    // scale
    const sc = mk(fx, "g", {}, "dial-late");
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
    const big = curve(rText + 18, "a", "big"), small = curve(rText - 10, "b", "small");
    // Labels follow the needle but stay on the visible part of the arc.
    const lo = m ? 212 : 206, hi = m ? 248 : 252;
    const at = (v: number) => `${(((Math.min(hi, Math.max(lo, A(v))) - 140) / 170) * 100).toFixed(2)}%`;

    svg.querySelectorAll<SVGGeometryElement>(".dial-draw").forEach((el) => el.style.setProperty("--len", String(Math.ceil(el.getTotalLength()) + 1)));

    let last = -1;
    update = (v, rot) => {
      g.setAttribute("transform", `translate(${f(cx)} ${f(cy)}) rotate(${f(rot)})`);
      const [x1, y1] = pt(R + 14, v), [x2, y2] = pt(rText - 34, v);
      needle.setAttribute("x1", f(x1));
      needle.setAttribute("y1", f(y1));
      needle.setAttribute("x2", f(x2));
      needle.setAttribute("y2", f(y2));
      big.setAttribute("startOffset", at(v));
      small.setAttribute("startOffset", at(v));
      const s = stepAt(v);
      if (s !== last) {
        last = s;
        big.textContent = STEPS[s].label;
        small.innerHTML = `${STEPS[s].info.toUpperCase()}<tspan dx="10" class="rp"></tspan><tspan dx="4">R/MIN</tspan>`;
        if (s > 0) live.textContent = `${STEPS[s].label}: ${STEPS[s].info}`;
      }
      small.querySelector(".rp")!.textContent = rpm(v);
    };
  }

  build();
  const ro = new ResizeObserver(build);
  ro.observe(stage);
  const io = new IntersectionObserver(([e]) => e.isIntersecting && stage.classList.add("dial-in"), { threshold: 0.2 });
  io.observe(stage);

  // Needle follows scroll progress through the pinned hero (or the first
  // 520px of scroll when the hero isn't pinned, e.g. on phones).
  let target = window.scrollY, eased = target, raf = 0;
  const onScroll = () => (target = window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });
  function frame() {
    eased += (target - eased) * (reduce ? 1 : 0.14);
    const top = pin.offsetTop, span = pin.offsetHeight - window.innerHeight;
    const p = Math.min(1, Math.max(0, (eased - top) / (span > 300 ? span : 520)));
    update(0.15 + p * 7.6, reduce ? 0 : (eased - top) * WHEEL_SPIN);
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    svg.innerHTML = "";
  };
}
