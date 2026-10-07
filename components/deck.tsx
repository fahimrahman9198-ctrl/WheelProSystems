"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowButton } from "./ui/button";

// "One system" deck: the section pins while five product cards are dealt onto
// a stack, one per stage of a job. A giant headline sits behind and blurs as
// the first card lands. One rAF loop writes transforms directly; no re-renders.

const cards = [
  {
    title: "Lead capture",
    text: "Every website and Gmail enquiry lands in one inbox with photos and details, and gets an instant reply.",
    tags: ["Website forms", "Gmail sync", "Instant auto-reply"],
    img: "leads",
    alt: "WheelPro Leads screen with website form and Gmail enquiries and a customer’s curb-rash photos",
  },
  {
    title: "Instant quotes",
    text: "Wheel size, damage photos and finish arrive up front. Price from your finish chart and send in one tap.",
    tags: ["Guided quote form", "Finish chart", "One-tap send"],
    img: "quote",
    alt: "WheelPro quote builder with line items, finish and the customer’s photos",
  },
  {
    title: "Automated follow-up",
    text: "Reminders go out on day 1 and day 3 and stop the moment the customer approves.",
    tags: ["Quote reminders", "Appointment reminders", "Review requests"],
    img: "email",
    alt: "WheelPro email automations with quote follow-ups, appointment reminders and review requests switched on",
  },
  {
    title: "Secured bookings",
    text: "Customers approve with a card deposit, so bay time and mobile visits are only held for committed jobs.",
    tags: ["Card deposits", "Stripe payouts", "Booking calendar"],
    img: "pay",
    alt: "WheelPro payments dashboard with deposits and paid jobs",
  },
  {
    title: "Invoices & payments",
    text: "The approved quote becomes the invoice. The balance is paid by card or Apple Pay in one tap.",
    tags: ["Quote-to-invoice", "Card and Apple Pay", "Paid status"],
    img: "invoice",
    alt: "WheelPro invoice made from the approved quote with the deposit deducted",
  },
];
const N = cards.length;

// Resting pose (deg, x, y) so the stack looks hand-dealt, and where each card flies in from.
const REST = [[-4, -18, 6], [3, 14, -4], [-2, -8, 10], [5, 18, -6], [-1, 0, 0]];
const ENTER = [[-16, -60], [14, 70], [-12, -40], [18, 80], [-8, 0]];

const clamp = (x: number) => Math.min(1, Math.max(0, x));
const ease = (x: number) => 1 - Math.pow(1 - x, 3);

export function Deck() {
  const trackRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const track = trackRef.current, bg = bgRef.current, count = countRef.current;
    if (!track || !bg || !count) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      track.dataset.static = "";
      return;
    }
    let raf = 0;
    const frame = () => {
      const vh = innerHeight, sx = Math.min(1, innerWidth / 1000);
      const r = track.getBoundingClientRect();
      if (r.bottom > 0 && r.top < vh) {
        const p = clamp(-r.top / (track.offsetHeight - vh));
        const seg = 1 / (N + 0.4);
        let shown = 1;
        cardRefs.current.forEach((c, i) => {
          if (!c) return;
          const e = ease(clamp((p - i * seg) / (seg * 0.85)));
          if (e > 0.5) shown = i + 1;
          const [rr, rx, ry] = REST[i], [er, ex] = ENTER[i];
          const rot = er + (rr - er) * e, x = (ex + (rx - ex) * e) * sx, y = (1 - e) * vh * 1.15 + ry * e;
          c.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) rotate(${rot.toFixed(2)}deg)`;
        });
        const b = clamp(p * 4);
        bg.style.filter = `blur(${(b * 12).toFixed(1)}px)`;
        bg.style.opacity = String(1 - b * 0.55);
        count.textContent = `0${shown}`;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section id="results" aria-labelledby="deck-title" className="deck bg-subtle">
      <div ref={trackRef} className="deck-track">
        <div className="deck-stage">
          {/* The headline lives in the cards area, so on smaller screens it sits below
              the intro and button instead of behind them. */}
          <div className="deck-cards">
            <div ref={bgRef} className="deck-bg" aria-hidden="true">
              One
              <br />
              system
            </div>
            {cards.map((c, i) => (
              <article
                key={c.img}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className="deck-card"
                style={{ zIndex: i + 1 }}
              >
                <div className="relative h-[52%] min-h-[200px] bg-[#eeebe4]">
                  <Image
                    src={`/screens/deck/${c.img}.svg`}
                    alt={c.alt}
                    fill
                    sizes="420px"
                    className="object-cover object-top"
                  />
                </div>
                <div className="flex flex-1 flex-col px-[22px] pt-5 pb-[18px]">
                  <h3 className="text-[length:clamp(1.8rem,2.7vw,2.3rem)] leading-[1] font-normal tracking-[-0.03em] !text-on-dark [font-family:var(--font-display)]">
                    {c.title}
                  </h3>
                  <p className="mt-3 max-w-[32ch] text-[13.5px] leading-normal text-on-dark-2">{c.text}</p>
                  <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                    <ul className="text-[13px] leading-[1.55] font-medium text-[#d7d1c6]">
                      {c.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                    <span className="t-mono text-[34px] leading-[0.8] text-[#c98a4b]">
                      0{i + 1}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="deck-side">
            <p className="t-mono mb-3 text-[13px] tracking-[0.08em] text-ink-2">
              <span ref={countRef}>01</span> / 0{N}
            </p>
            <h2 id="deck-title" className="text-[length:clamp(1.6rem,2.3vw,2.1rem)] leading-[1.05] font-normal tracking-[-0.03em] text-ink [font-family:var(--font-display)]">
              One job. Five steps. Zero chasing.
            </h2>
            <p className="mt-3 text-[15px] leading-relaxed text-ink-2">
              WheelPro is shop management software for wheel repair and refinishing businesses. Lead capture,
              quoting, follow-ups, deposits and invoicing run as one system, from the first enquiry to money in
              the bank.
            </p>
            <ArrowButton href="#book" className="mt-6">
              Book a meeting
            </ArrowButton>
          </div>

        </div>
      </div>
    </section>
  );
}
