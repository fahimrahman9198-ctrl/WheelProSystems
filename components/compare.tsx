"use client";

import Image from "next/image";
import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowButton } from "./ui/button";
import { easeOut } from "./ui/motion";

const Tick = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#fff"
    strokeWidth="3"
    aria-hidden="true"
  >
    <path d="M5 12.5l4.5 4.5L19 7.5" />
  </svg>
);

// Small proof snippets: a slice of the real product for each row.
const Line = ({
  t,
  dot,
  children,
  end,
}: {
  t?: string;
  dot: string;
  children: ReactNode;
  end?: ReactNode;
}) => (
  <div className="flex items-center gap-3 border-t border-dark-line py-2.5 text-[14px] text-[#d4d4d8] first:border-t-0">
    {t && <time className="t-mono w-12 text-[12.5px] text-[#71717a]">{t}</time>}
    <span
      className="size-2 shrink-0 rounded-xs"
      style={{ background: dot }}
    />
    <span>{children}</span>
    {end && (
      <span className="t-mono ml-auto text-[12.5px] text-[#a1a1aa]">{end}</span>
    )}
  </div>
);
const Chip = ({ dot, children }: { dot?: string; children: ReactNode }) => (
  <span className="inline-flex h-7 items-center gap-1.5 rounded-sm border border-[#2a2a2f] px-2.5 text-[12.5px] text-[#d4d4d8]">
    {dot && (
      <span className="size-1.5 rounded-xs" style={{ background: dot }} />
    )}
    {children}
  </span>
);

const BRONZE = "#c98a4b",
  GREEN = "#22c55e",
  GREY = "#52525b";

const rows: { key: string; today: string; wp: string; proof: ReactNode }[] = [
  {
    key: "Response time",
    today: "Hours, depending on when you're free",
    wp: "Seconds, at any time of day",
    proof: (
      <div>
        <Line t="08:14" dot={GREY} end="Jordan M.">
          Photos received from your website form
        </Line>
        <Line t="08:14" dot={BRONZE} end="Instant">
          Auto-reply sent: “Got your photos, quote within 2 hours”
        </Line>
      </div>
    ),
  },
  {
    key: "Job information",
    today: "Collected across several messages",
    wp: "Complete from the first submission",
    proof: (
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex gap-2">
          {["rash-lip", "rash-chips", "rash-dark", "model-y"].map((p) => (
            <span
              key={p}
              className="relative block size-16 overflow-hidden rounded-md border border-dark-line"
            >
              <Image
                src={`/photos/${p}.jpg`}
                alt=""
                fill
                sizes="64px"
                className="object-cover"
              />
            </span>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <Chip>4 × 21″</Chip>
          <Chip>Curb rash ×2</Chip>
          <Chip dot="#a8814d">Satin Bronze</Chip>
          <Chip>Mobile · Surrey</Chip>
        </div>
      </div>
    ),
  },
  {
    key: "Quote follow-up",
    today: "Manual and often missed",
    wp: "Scheduled and sent automatically",
    proof: (
      <div className="flex flex-wrap gap-2">
        <Chip dot={BRONZE}>Quote sent · Mon</Chip>
        <Chip>Reminder · Tue</Chip>
        <Chip>Last call · Thu</Chip>
        <Chip dot={GREEN}>Approved · Thu 10:12</Chip>
      </div>
    ),
  },
  {
    key: "Bookings",
    today: "Confirmed by word of mouth",
    wp: "Confirmed with a paid deposit",
    proof: (
      <div>
        <Line dot={GREEN} end="$150.00">
          Deposit paid · Visa ·· 4242
        </Line>
        <Line dot={BRONZE} end="Thu 9:00">
          Mobile visit booked · Surrey
        </Line>
      </div>
    ),
  },
  {
    key: "Invoicing",
    today: "Retyped from scratch",
    wp: "Generated from the approved quote",
    proof: (
      <div>
        <Line dot={GREY} end="$1,029.00">
          INV-0412 created from quote Q-1044
        </Line>
        <Line dot={GREEN} end="$879.00">
          Balance paid · Apple Pay
        </Line>
      </div>
    ),
  },
];

const N = rows.length;
// Rows reveal across the first 88% of the pinned scroll, leaving a short rest at the end.
const SPAN = 0.88 / N;
const startOf = (i: number) => 0.04 + i * SPAN;

const mq = "(min-width: 1024px)";
const subscribe = (cb: () => void) => {
  const m = matchMedia(mq);
  m.addEventListener("change", cb);
  return () => m.removeEventListener("change", cb);
};
const useDesktop = () =>
  useSyncExternalStore(
    subscribe,
    () => matchMedia(mq).matches,
    () => false,
  );

function RowText({ r, i }: { r: (typeof rows)[number]; i: number }) {
  return (
    <>
      <div className="flex items-baseline gap-4">
        <span className="t-mono text-[12px] text-[#52525b]">0{i + 1}</span>
        <span className="t-label text-[11px] text-[#a1a1aa]">{r.key}</span>
      </div>
    </>
  );
}

/** Pinned version: one step on screen at a time, driven by scroll progress. */
function ScrollStep({
  r,
  i,
  progress,
}: {
  r: (typeof rows)[number];
  i: number;
  progress: MotionValue<number>;
}) {
  const s = startOf(i);
  const e = s + SPAN;
  const last = i === N - 1;
  const opacity = useTransform(
    progress,
    [s - 0.01, s + SPAN * 0.12, e - SPAN * 0.12, e],
    [0, 1, 1, last ? 1 : 0],
  );
  const y = useTransform(
    progress,
    [s - 0.01, s + SPAN * 0.12, e - SPAN * 0.12, e],
    [48, 0, 0, last ? 0 : -48],
  );
  const strike = useTransform(
    progress,
    [s + SPAN * 0.2, s + SPAN * 0.42],
    [0, 1],
  );
  const todayOpacity = useTransform(
    progress,
    [s + SPAN * 0.2, s + SPAN * 0.5],
    [1, 0.4],
  );
  const wpOpacity = useTransform(
    progress,
    [s + SPAN * 0.38, s + SPAN * 0.6],
    [0, 1],
  );
  const wpY = useTransform(
    progress,
    [s + SPAN * 0.38, s + SPAN * 0.6],
    [14, 0],
  );
  const tick = useTransform(
    progress,
    [s + SPAN * 0.4, s + SPAN * 0.6],
    ["#27272a", "#c98a4b"],
  );
  const proofOpacity = useTransform(
    progress,
    [s + SPAN * 0.52, s + SPAN * 0.74],
    [0, 1],
  );
  const proofY = useTransform(
    progress,
    [s + SPAN * 0.52, s + SPAN * 0.74],
    [16, 0],
  );

  return (
    <motion.div
      style={{ opacity, y }}
      className="absolute inset-0 flex flex-col justify-center"
    >
      <div className="flex items-baseline gap-4">
        <span className="t-mono text-[13px] text-[#71717a]">0{i + 1}</span>
        <span className="t-label text-[12px] text-[#a1a1aa]">{r.key}</span>
      </div>
      <motion.p
        style={{ opacity: todayOpacity }}
        className="relative mt-6 self-start text-[22px] leading-snug text-[#a1a1aa]"
      >
        {r.today}
        <motion.span
          style={{ scaleX: strike }}
          className="absolute top-1/2 left-0 h-[1.5px] w-full origin-left bg-[#a1a1aa]"
          aria-hidden="true"
        />
      </motion.p>
      <motion.p
        style={{ opacity: wpOpacity, y: wpY }}
        className="mt-4 flex items-start gap-4 text-[clamp(1.75rem,2.6vw,2.375rem)] leading-[1.15] font-semibold tracking-[-0.03em] text-on-dark"
      >
        <motion.span
          style={{ background: tick }}
          className="mt-2 grid size-7 shrink-0 place-items-center rounded-sm"
        >
          <Tick />
        </motion.span>
        {r.wp}
      </motion.p>
      <motion.div
        style={{ opacity: proofOpacity, y: proofY }}
        className="mt-10"
      >
        <p className="t-label mb-2 text-[10.5px] text-[#71717a]">In WheelPro</p>
        <div className="rounded-lg border border-dark-line bg-dark-2 px-5 py-4">
          {r.proof}
        </div>
      </motion.div>
    </motion.div>
  );
}

/** Phones and reduced motion: reveal each row as it enters view. */
function StaticRow({
  r,
  i,
  reduce,
}: {
  r: (typeof rows)[number];
  i: number;
  reduce: boolean;
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.6 }}
      transition={reduce ? { duration: 0 } : { duration: 0.8, ease: easeOut }}
      className="border-t border-dark-line py-6 first:border-t-0"
    >
      <RowText r={r} i={i} />
      <p className="mt-3 text-[16px] text-[#71717a] line-through decoration-[#52525b]">
        {r.today}
      </p>
      <p className="mt-2 flex items-start gap-3 text-[19px] leading-snug font-medium text-on-dark">
        <span className="mt-1 grid size-5 shrink-0 place-items-center rounded-xs bg-[#c98a4b]">
          <Tick />
        </span>
        {r.wp}
      </p>
      <div className="mt-4 rounded-lg border border-dark-line bg-dark-2 px-4 py-3">
        {r.proof}
      </div>
    </motion.li>
  );
}

/** Desktop: pinned while the steps play out. Owns the scroll tracking so it
 *  only runs when this layout is actually mounted. */
function PinnedCompare({ heading }: { heading: ReactNode }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const [finished, setFinished] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.max(
      0,
      Math.min(N - 1, Math.floor((v - 0.04 + SPAN * 0.5) / SPAN)),
    );
    setActive((a) => (a === i ? a : i));
    setFinished(v > 0.9);
  });
  const bar = useTransform(scrollYProgress, [0.02, 0.92], [0, 1]);


  return (
          <div ref={trackRef} className="relative h-[460svh]">
            <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden pt-[72px]">
              <div className="wrap grid w-full grid-cols-12 gap-12">
                <div className="col-span-5 flex flex-col">
                  {heading}
                  <div className="mt-10 flex items-center gap-4">
                    <span className="t-mono text-[13px] text-on-dark">
                      0{active + 1}
                      <span className="text-[#52525b]"> / 0{N}</span>
                    </span>
                    <div className="relative h-px flex-1 bg-dark-line">
                      <motion.span
                        style={{ scaleX: bar }}
                        className="absolute inset-0 origin-left bg-[#c98a4b]"
                      />
                    </div>
                  </div>
                  <ol className="m-0 mt-6 grid list-none gap-1 p-0">
                    {rows.map((r, i) => {
                      const done = i < active || (finished && i === N - 1);
                      return (
                        <li
                          key={r.key}
                          className={`flex items-center gap-3 py-1.5 text-[15px] transition-colors duration-500 ${
                            i === active
                              ? "text-on-dark"
                              : done
                                ? "text-[#a1a1aa]"
                                : "text-[#52525b]"
                          }`}
                        >
                          <span
                            className={`grid size-4 place-items-center rounded-xs transition-colors duration-500 ${
                              done
                                ? "bg-[#c98a4b]"
                                : i === active
                                  ? "border border-[#c98a4b]"
                                  : "border border-[#3f3f46]"
                            }`}
                          >
                            {done && <Tick />}
                          </span>
                          {r.key}
                        </li>
                      );
                    })}
                  </ol>
                </div>
                <div className="relative col-span-7 col-start-6 h-[min(560px,70svh)] pl-6">
                  {rows.map((r, i) => (
                    <ScrollStep
                      key={r.key}
                      r={r}
                      i={i}
                      progress={scrollYProgress}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
  );
}

export function Compare() {
  const reduce = !!useReducedMotion();
  const desktop = useDesktop();
  const pinned = desktop && !reduce;
  const heading = (
    <>
      <p className="t-label text-[#71717a]">Day one</p>
      <h2 className="t-h1 on-dark-text mt-4 !text-on-dark">
        What <span className="t-outline">improves</span>
        <br />
        from day one
      </h2>
      <p className="t-body-lg mt-6 max-w-[44ch]">
        Your repair process doesn't change. The admin around it does, from the
        first enquiry to the final payment.
      </p>
    </>
  );

  return (
    <section id="results" className="px-3 md:px-6">
      <div className="rounded-xl bg-dark text-on-dark-2">
        {pinned ? (
          <PinnedCompare heading={heading} />
        ) : (
          <div className="wrap py-24">
            {heading}
            <ol className="m-0 mt-12 list-none border-t border-dark-line p-0">
              {rows.map((r, i) => (
                <StaticRow key={r.key} r={r} i={i} reduce={reduce} />
              ))}
            </ol>
          </div>
        )}

        <div className="wrap flex flex-col items-start justify-between gap-5 border-t border-dark-line py-10 sm:flex-row sm:items-center">
          <span className="text-[15px]">
            See it set up for your shop in 20 minutes.
          </span>
          <ArrowButton href="#book" className="!bg-on-dark !text-ink hover:!bg-white">
            Book a meeting
          </ArrowButton>
        </div>
      </div>
    </section>
  );
}
