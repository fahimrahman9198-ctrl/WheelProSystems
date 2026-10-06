"use client";

import { Check } from "lucide-react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { Accent, SectionIntro } from "../ui/bits";
import { easeOut, Reveal } from "../ui/motion";

const services = [
  {
    id: "leads",
    pill: "Lead collection",
    title: "Every *lead* captured",
    promise: "Quote requests from your website form and enquiries in your Gmail become leads in the system, so no job gets buried in your email.",
    points: ["Website form and Gmail leads", "Contact details saved automatically", "See who's ready to quote"],
    image: "/screens/leads.svg",
    status: { title: "New lead in", left: "Website form · 4 photos", right: "08:14" },
    alt: "WheelPro admin Leads screen listing website form and Gmail leads, with a customer’s curb-rash photos, beside a phone showing the customer quote form",
  },
  {
    id: "quote",
    pill: "Quotation",
    title: "Every request arrives *ready to price*",
    promise: "Customers send photos, wheel size, damage and the finish they want. You send a quote in one tap.",
    points: ["Photos, size, damage and finish", "Your finish chart with swatches", "Quote sent in one tap"],
    image: "/screens/quote.svg",
    status: { title: "Quote sent", left: "Q-1044 · 4 × 21″ Satin Bronze", right: "$1,029.00" },
    alt: "WheelPro quote builder with the customer’s curb-rash photos and line items, beside a phone showing the quote with an Approve and pay deposit button",
  },
  {
    id: "email",
    pill: "Email automation",
    title: "*Follow-ups* that send themselves",
    promise: "Instant replies, quote reminders, appointment reminders and review requests go out on time, every time.",
    points: ["Instant reply, day or night", "Win back quiet quotes", "Fewer no-shows, more reviews"],
    image: "/screens/email.svg",
    status: { title: "Follow-up sent", left: "Day 1 reminder · automatic", right: "09:00" },
    alt: "WheelPro email automations screen with five automated emails switched on, beside a phone inbox showing the quote follow-up email",
  },
  {
    id: "invoice",
    pill: "Invoicing",
    title: "Quote approved, *invoice ready*",
    promise: "The approved quote becomes an invoice with your name, tax and a pay button. Nothing to retype.",
    points: ["Made straight from the quote", "Tax and branding included", "Emailed with a pay button"],
    image: "/screens/invoice.svg",
    status: { title: "Invoice sent", left: "INV-0412 · viewed by Jordan", right: "$879.00" },
    alt: "WheelPro invoice made from the approved quote, with deposit deducted, balance due and an activity log",
  },
  {
    id: "payment",
    pill: "Payments",
    title: "*Deposits* and balances, paid by card",
    promise: "Take a deposit when the quote is approved and the balance when the job's done. Paid status shows on every job.",
    points: ["Deposits stop no-shows", "Card payments to your bank", "Paid status on every job"],
    image: "/screens/pay.svg",
    status: { title: "Deposit paid", left: "Visa ·· 4242", right: "$150.00 ✓" },
    alt: "WheelPro payments dashboard with a weekly chart and payment list, beside a phone checkout for a 150 dollar deposit",
  },
];

const LOOP_MS = 3000;

export function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const inView = useInView(ref, { amount: 0.35 });
  const playing = !paused && inView && !reduce;

  useEffect(() => {
    if (!playing) return;
    const t = setTimeout(() => {
      setActive((a) => (a + 1) % services.length);
      setCycle((c) => c + 1);
    }, LOOP_MS);
    return () => clearTimeout(t);
  }, [playing, active, cycle]);

  const choose = (i: number) => {
    setActive((i + services.length) % services.length);
    setCycle((c) => c + 1);
  };

  const onKey = (e: KeyboardEvent) => {
    const d = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
    if (!d) return;
    e.preventDefault();
    const next = (active + d + services.length) % services.length;
    choose(next);
    tabRefs.current[next]?.focus();
  };

  const s = services[active];

  return (
    <section id="services" className="section bg-white">
      <div className="wrap">
        <Reveal>
          <SectionIntro label="Services" title={<>Five tools<br /><span className="t-outline">One system</span></>} sub="This is what your shop runs on: real screens from a sample shop, from the first lead to money in the bank." />
        </Reveal>

        <div ref={ref} className="mt-14 md:mt-20">
          <div className="flex justify-center">
            <div className="relative max-w-full">
              <div
                role="tablist"
                aria-label="Services"
                onKeyDown={onKey}
                className="no-scrollbar flex snap-x gap-1 overflow-x-auto rounded-md border border-line bg-subtle/90 p-1.5 backdrop-blur-md"
              >
                {services.map((sv, i) => (
                  <button
                    key={sv.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`tab-${sv.id}`}
                    aria-selected={i === active}
                    aria-controls="service-panel"
                    tabIndex={i === active ? 0 : -1}
                    onClick={() => choose(i)}
                    className={`relative h-11 shrink-0 snap-center rounded-sm px-5 text-[15px] font-medium whitespace-nowrap transition-colors duration-200 ${
                      i === active ? "text-white" : "text-ink-2 hover:bg-muted hover:text-ink"
                    }`}
                  >
                    {i === active && (
                      <motion.span layoutId="pill-bg" className="absolute inset-0 rounded-sm bg-ink" transition={{ type: "spring", stiffness: 380, damping: 34 }} />
                    )}
                    <span className="relative">{sv.pill}</span>
                  </button>
                ))}
              </div>
              <div className="mx-6 mt-2 h-0.5 overflow-hidden rounded-full" aria-hidden="true">
                {playing && (
                  <motion.div
                    key={`${active}-${cycle}`}
                    className="h-full origin-left bg-accent"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: LOOP_MS / 1000, ease: "linear" }}
                  />
                )}
              </div>
            </div>
          </div>

          <div
            id="service-panel"
            role="tabpanel"
            aria-labelledby={`tab-${s.id}`}
            className="mt-6 grid gap-8 rounded-xl bg-subtle p-5 md:p-8 lg:grid-cols-12 lg:gap-10 lg:p-12"
          >
            <div className="order-2 flex flex-col justify-center lg:order-1 lg:col-span-4">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={s.id}
                  initial={reduce ? false : { opacity: 0, y: 10, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.25 } }}
                  transition={{ duration: 0.55, ease: easeOut }}
                >
                  <p className="t-mono mb-3 text-[12px] text-ink-3">
                    0{active + 1} / 0{services.length}
                  </p>
                  <h3 className="t-h2 [--outline-fill:var(--bg-subtle)]">
                    <Accent text={s.title} />
                  </h3>
                  <p className="mt-4 text-[16px] leading-relaxed text-ink-2">{s.promise}</p>
                  <ul className="mt-6 grid gap-2.5">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-2.5 text-[15px] text-ink">
                        <span className="grid size-5 place-items-center rounded-xs bg-ink text-white">
                          <Check size={12} strokeWidth={2.5} />
                        </span>
                        {p}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dark showcase card: screens slide like a carousel (auto, tap, swipe), status card follows the tab. */}
            <div
              className="relative order-1 rounded-lg bg-[#0e0f11] p-4 sm:p-6 lg:order-2 lg:col-span-8"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <div className="mb-4 flex items-center justify-between text-[13px] font-medium sm:mb-5 sm:text-[14px]">
                <span className="text-[#a1a1aa]">Sample job · Q-1044</span>
                <span className="flex items-center gap-2 pr-6 text-on-dark">
                  <span className="size-2 bg-[#22c55e]" />
                  System active
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-[1fr_120px] lg:grid-cols-[1fr_132px]">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-white sm:aspect-[16/10]">
                  <motion.div
                    className="flex h-full cursor-grab touch-pan-y active:cursor-grabbing"
                    animate={{ x: `${-active * 100}%` }}
                    transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 34 }}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onTap={() => choose(active + 1)}
                    onDragStart={() => setPaused(true)}
                    onDragEnd={(_, info) => {
                      setPaused(false);
                      const swipe = info.offset.x + info.velocity.x * 0.2;
                      if (swipe < -60) choose(active + 1);
                      else if (swipe > 60) choose(active - 1);
                    }}
                  >
                    {services.map((sv, i) => (
                      <div key={sv.id} className="relative h-full w-full shrink-0" aria-hidden={i !== active}>
                        <Image
                          src={sv.image}
                          alt={i === active ? sv.alt : ""}
                          fill
                          draggable={false}
                          sizes="(min-width: 1200px) 600px, 100vw"
                          className="pointer-events-none object-cover object-[88%_55%] select-none sm:object-center"
                        />
                      </div>
                    ))}
                  </motion.div>
                </div>
                <div className="hidden flex-col gap-2 sm:flex">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-md border border-[#2a2a2f]">
                    <Image src="/photos/rash-lip.jpg" alt="Customer photo of curb rash on a silver wheel" fill sizes="132px" className="object-cover" />
                  </div>
                  <span className="text-[13px] leading-tight font-semibold text-on-dark">
                    Damage
                    <br />
                    received
                  </span>
                </div>
              </div>

              {/* status card: overlaps the screen on desktop, sits below it on phones */}
              <div className="relative mt-3 rounded-lg bg-[#e6e7ea] p-4 sm:p-5 lg:absolute lg:right-6 lg:bottom-16 lg:mt-0 lg:w-[300px] lg:shadow-lg">
                <p className="text-[13px] font-medium text-ink-2">Job status · Jordan M.</p>
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={s.id}
                    initial={reduce ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -6, transition: { duration: 0.2 } }}
                    transition={{ duration: 0.45, ease: easeOut }}
                  >
                    <p className="mt-1 text-[clamp(1.75rem,2.6vw,2.25rem)] leading-none font-semibold text-ink [font-family:var(--font-display)]">
                      {s.status.title}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-line-strong pt-3 text-[13px]">
                      <span className="text-ink-2">{s.status.left}</span>
                      <span className="t-mono font-semibold text-success">{s.status.right}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4 sm:mt-5">
                <span className="text-[12.5px] text-[#71717a]">Tap the screen or swipe for the next step</span>
                <div className="flex gap-2" aria-hidden="true">
                  {services.map((sv, i) => (
                    <button
                      key={sv.id}
                      tabIndex={-1}
                      onClick={() => choose(i)}
                      className={`h-1.5 transition-all duration-500 ${i === active ? "w-6 bg-on-dark" : "w-1.5 bg-[#3f3f46] hover:bg-[#71717a]"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
