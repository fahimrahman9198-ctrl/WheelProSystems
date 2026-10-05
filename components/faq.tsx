"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { easeOut, Reveal } from "./ui/motion";

// Answers marked TODO need confirming before launch.
const faqs = [
  { q: "How long until I'm live?", a: "Most shops are live in two to three weeks. We set up your services, area, finishes and emails for you." },
  { q: "Do I own my website and customer data?", a: "Yes. Your domain, your website and your customer list belong to you." },
  { q: "Can I keep my domain and phone number?", a: "Yes. We connect your existing domain and keep your phone number on the site." },
  { q: "Which payment providers do you use?", a: "Card payments go through Stripe and land straight in your bank account." },
  { q: "What does it cost?", a: "It depends on what you need. Some shops start with quotes and booking, others want everything. We'll give you a clear price in the meeting." },
];

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();
  return (
    <section id="faq" className="section bg-subtle">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <Reveal className="lg:col-span-4">
          <p className="t-label mb-4 text-ink-3">FAQ</p>
          <h2 className="t-h1 [--outline-fill:var(--bg-subtle)]">
            <span className="t-outline">Questions</span>
            <br />
            owners ask
          </h2>
        </Reveal>
        <div className="lg:col-span-8">
          {faqs.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={i * 0.06} className="border-t border-line-strong last:border-b">
                <h3>
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center gap-6 py-7 text-left"
                  >
                    <span className="t-mono w-6 text-[13px] text-ink-3">0{i + 1}</span>
                    <span className="flex-1 text-[clamp(1.125rem,1.8vw,1.5rem)] font-semibold tracking-[-0.02em] text-ink">{f.q}</span>
                    <Plus size={22} strokeWidth={1.5} className={`shrink-0 text-ink transition-transform duration-[400ms] ease-out-expo ${isOpen ? "rotate-45" : ""}`} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-${i}`}
                      initial={reduce ? false : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={reduce ? undefined : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: easeOut }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-[60ch] pb-7 pl-12 text-[16px] leading-relaxed text-ink-2">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
