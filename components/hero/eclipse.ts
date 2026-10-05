// Hero "eclipse wheel": a real wheel photo sits in the bottom-right corner
// (a quarter of it visible) with two dotted orbits of step icons around it.
// Scrolling turns the wheel and swirls both orbits (inner clockwise, outer
// counter-clockwise); scrolling back up reverses them. Comets land on the next
// step so the job progresses. One rAF loop, outside React render.

import { JOBS, STEPS, icon } from "./job-arc";

const COLORS = ["#2f5bff", "#7c3aed", "#d97706", "#0d9488", "#16a34a"];
const ORBITS = [
  { dir: 1, drift: 90, steps: [0, 1], copies: 4 }, // inner: clockwise
  { dir: -1, drift: 120, steps: [2, 3, 4], copies: 4 }, // outer: counter-clockwise
];
const WHEEL_SPIN = 0.3; // wheel degrees per scrolled pixel
const SWIRL = 0.22; // orbit degrees per scrolled pixel
const COMET_MS = 1400;
const GAP_MS = 2800;

type Item = { k: string; job: number; step: number };
const SEQ: Item[] = JOBS.flatMap((j, ji) =>
  [j.src, "quote", "email", "invoice", "payment"].map((k, step) => ({ k, job: ji, step })),
);

export function startEclipse(hero: HTMLElement, svg: SVGSVGElement, wheel: HTMLElement, live: HTMLElement, reduce: boolean) {
  let W = 0, H = 0, mobile = false, rWheel = 0;
  let radii: [number, number] = [0, 0];
  let job = 0;
  const state: string[] = STEPS.map((_, i) => (i === 0 ? "now" : ""));

  type Planet = { el: HTMLDivElement; oi: number; step: number; base: number };
  const planets: Planet[] = [];
  ORBITS.forEach((o, oi) => {
    const n = o.steps.length * o.copies;
    for (let k = 0; k < n; k++) {
      const step = o.steps[k % o.steps.length];
      const el = document.createElement("div");
      el.className = "orbit-planet";
      el.setAttribute("aria-hidden", "true");
      el.style.setProperty("--pc", COLORS[step]);
      el.innerHTML = `<span class="orb">${icon(STEPS[step].icon, 2)}</span><span class="lbl">${STEPS[step].label}</span>`;
      hero.appendChild(el);
      planets.push({ el, oi, step, base: (k / n) * 360 });
    }
  });

  let orbitEls: SVGCircleElement[] = [];
  function layout() {
    W = hero.clientWidth;
    H = hero.clientHeight;
    mobile = W < 1024;
    rWheel = mobile ? 135 : 220;
    radii = mobile ? [205, 285] : [330, 455];
    svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
    let g = "";
    for (let k = 0; k < 10; k++)
      g += `<circle cx="${W}" cy="${H}" r="${rWheel + 4 + k * (mobile ? 8 : 12)}" fill="none" stroke="#2f5bff" stroke-width="${mobile ? 8 : 12}" opacity="${(0.13 * (1 - k / 10)).toFixed(3)}"/>`;
    radii.forEach((r) => (g += `<circle class="orbit-line" cx="${W}" cy="${H}" r="${r}"/>`));
    svg.innerHTML = g;
    orbitEls = [...svg.querySelectorAll<SVGCircleElement>(".orbit-line")];
    const d = rWheel * 2;
    Object.assign(wheel.style, { width: `${d}px`, height: `${d}px`, left: `${W - rWheel}px`, top: `${H - rWheel}px` });
    paint();
  }

  function paint() {
    planets.forEach((p) => (p.el.className = `orbit-planet ${state[p.step]}`));
    planets.filter((p) => p.step === 0).forEach((p) => (p.el.querySelector(".orb")!.innerHTML = icon(JOBS[job].src, 2)));
  }

  function land(item: Item) {
    if (item.step === 0) {
      job = item.job;
      state.fill("");
    }
    state[item.step] = "done";
    if (item.step + 1 < STEPS.length) state[item.step + 1] = "now";
    paint();
    live.textContent = `${JOBS[job].name}: ${STEPS[item.step].label}`;
  }

  // ---- scroll drives wheel + orbits (smoothed both ways) ----
  let target = window.scrollY, eased = target;
  const onScroll = () => (target = window.scrollY);
  window.addEventListener("scroll", onScroll, { passive: true });

  let t = 0;
  const orbitTurn = (oi: number) => ORBITS[oi].dir * ((t / 1000) * (360 / ORBITS[oi].drift) + eased * SWIRL);
  const angleOf = (p: Planet) => ((((p.base + orbitTurn(p.oi) + 180) % 360) + 360) % 360);
  const pt = (r: number, deg: number): [number, number] => {
    const a = (deg * Math.PI) / 180;
    return [W + r * Math.cos(a), H + r * Math.sin(a)];
  };

  // ---- comets: fly in from the top-right and land on the next step's visible planet ----
  type Comet = { el: HTMLDivElement; trail: HTMLSpanElement[]; hist: [number, number][]; p: Planet; item: Item; t0: number };
  const comets: Comet[] = [];
  let seq = 0, nextAt = 1200;
  function launch() {
    const item = SEQ[seq % SEQ.length];
    const visible = planets.filter((p) => p.step === item.step).map((p) => ({ p, a: angleOf(p) })).filter(({ a }) => a > 195 && a < 260);
    if (!visible.length) return false;
    seq++;
    const p = visible.sort((a, b) => Math.abs(a.a - 228) - Math.abs(b.a - 228))[0].p;
    const el = document.createElement("div");
    el.className = "orbit-comet";
    el.setAttribute("aria-hidden", "true");
    el.style.setProperty("--pc", COLORS[item.step]);
    el.innerHTML = icon(item.k, 2);
    const trail = Array.from({ length: 7 }, (_, k) => {
      const d = document.createElement("span");
      d.className = "orbit-trail";
      d.style.setProperty("--pc", COLORS[item.step]);
      d.style.opacity = (0.35 * (1 - k / 7)).toFixed(2);
      hero.appendChild(d);
      return d;
    });
    hero.appendChild(el);
    comets.push({ el, trail, hist: [], p, item, t0: t });
    return true;
  }

  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(hero);
  let raf = 0, visibleHero = true, last = performance.now();
  const io = new IntersectionObserver(([e]) => (visibleHero = e.isIntersecting));
  io.observe(hero);

  function frame(now: number) {
    const dt = Math.min(64, now - last);
    last = now;
    const running = visibleHero && !document.hidden && !reduce;
    if (running) t += dt;
    eased += (target - eased) * (reduce ? 1 : 0.12);

    wheel.style.transform = `rotate(${(eased * WHEEL_SPIN).toFixed(2)}deg)`;
    orbitEls.forEach((el, i) => el.setAttribute("transform", `rotate(${orbitTurn(i).toFixed(2)} ${W} ${H})`));
    planets.forEach((p) => {
      const [x, y] = pt(radii[p.oi], angleOf(p));
      p.el.style.transform = `translate(${x}px, ${y}px)`;
    });

    if (running && t >= nextAt) nextAt = t + (launch() ? GAP_MS : 300);
    for (let i = comets.length - 1; i >= 0; i--) {
      const cm = comets[i];
      const k = Math.min(1, (t - cm.t0) / COMET_MS), e = 1 - Math.pow(1 - k, 3);
      const [tx, ty] = pt(radii[cm.p.oi], angleOf(cm.p));
      const sx = W - 40, sy = 30;
      const x = sx + (tx - sx) * e, y = sy + (ty - sy) * e - Math.sin(e * Math.PI) * 60;
      cm.hist.unshift([x, y]);
      cm.hist.length = Math.min(cm.hist.length, 15);
      cm.el.style.transform = `translate(${x}px, ${y}px)`;
      cm.trail.forEach((d, j) => {
        const h = cm.hist[Math.min(cm.hist.length - 1, (j + 1) * 2)];
        d.style.transform = `translate(${h[0]}px, ${h[1]}px)`;
      });
      if (k >= 1) {
        cm.el.remove();
        cm.trail.forEach((d) => d.remove());
        comets.splice(i, 1);
        land(cm.item);
        cm.p.el.querySelector(".orb")!.animate([{ transform: "scale(1.35)" }, { transform: "scale(1)" }], {
          duration: 600,
          easing: "cubic-bezier(.16,1,.3,1)",
        });
      }
    }
    raf = requestAnimationFrame(frame);
  }
  raf = requestAnimationFrame(frame);
  if (reduce) SEQ.slice(0, 2).forEach(land);

  return () => {
    cancelAnimationFrame(raf);
    ro.disconnect();
    io.disconnect();
    window.removeEventListener("scroll", onScroll);
    planets.forEach((p) => p.el.remove());
    comets.forEach((c) => {
      c.el.remove();
      c.trail.forEach((d) => d.remove());
    });
  };
}
