"use client";

import { Plus } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useState } from "react";
import { easeOut, Reveal } from "./ui/motion";

// Each answer states only what the service already does; confirm any new claim before adding it.
const faqs = [
  {
    q: "What is the typical implementation timeline?",
    a: "Most businesses are fully operational within two to three weeks. Our team configures your services, service area, finish options and email templates, and walks your staff through the platform before launch.",
  },
  {
    q: "Will WheelPro require changes to our existing operations?",
    a: "No. WheelPro is designed to integrate with your current workflow. Your repair process remains unchanged, while the platform manages enquiries, quotations, follow-ups, deposits and invoicing.",
  },
  {
    q: "Is the platform suitable for mobile technicians as well as fixed-location shops?",
    a: "Yes. Jobs can be scheduled as in-shop appointments or mobile visits, with quotations, deposits and invoicing handled consistently across both.",
  },
  {
    q: "Can the platform be customised to our business?",
    a: "Yes. Every installation is configured around your business: your services, finishes, pricing, service area, branding and customer emails. If your workflow requires something beyond the standard setup, we scope it with you during the consultation and confirm it in your quotation.",
  },
  {
    q: "Can we retain our existing domain, email and phone number?",
    a: "Yes. We integrate your existing domain, display your current business phone number and connect your Gmail account, so enquiries continue to arrive through your established channels.",
  },
  {
    q: "How are customer payments processed?",
    a: "All payments are processed securely through Stripe. Customers pay deposits and balances by card or Apple Pay, and funds are paid out directly to your business bank account.",
  },
  {
    q: "How is pricing structured?",
    a: "Pricing is tailored to the modules your business requires, from lead capture and quoting through to the complete platform. You receive a clear, itemised quotation during your consultation.",
  },
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
            Frequently asked
            <br />
            <span className="t-outline">questions</span>
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
                    <span className="flex-1 text-[length:clamp(1.15rem,1.8vw,1.55rem)] font-normal tracking-[-0.025em] text-ink">{f.q}</span>
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
