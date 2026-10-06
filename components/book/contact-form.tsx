"use client";

import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { useState, type FormEvent } from "react";
import { easeOut } from "../ui/motion";

const pains = [
  "Quoting from texts and photos",
  "Missing or slow replies to enquiries",
  "Chasing quotes that go quiet",
  "Invoices and payments",
  "No-shows",
];

const field =
  "h-[52px] w-full rounded-md border border-line-strong bg-white px-4 text-[16px] text-ink transition-[border-color,box-shadow] placeholder:text-ink-3 hover:border-ink-3 focus:border-ink focus:shadow-[0_0_0_3px_rgba(47,91,255,.15)] focus:outline-none aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [errors, setErrors] = useState<{ name?: boolean; email?: boolean }>({});
  const reduce = useReducedMotion();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next = { name: !data.name?.trim(), email: !/^\S+@\S+\.\S+$/.test(data.email ?? "") };
    setErrors(next);
    if (next.name || next.email) {
      form.querySelector<HTMLInputElement>(next.name ? "#cf-name" : "#cf-email")?.focus();
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      setStatus(res.ok ? "done" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "done") {
    return (
      <motion.div
        role="status"
        initial={reduce ? false : { opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: easeOut }}
        className="flex min-h-[460px] flex-col justify-center rounded-lg bg-subtle p-8"
      >
        <span className="mb-5 grid size-12 place-items-center rounded-md bg-success-soft text-success">
          <Check size={24} strokeWidth={2.2} />
        </span>
        <h3 className="t-h3">Got it, we’ll be in touch</h3>
        <p className="mt-2 text-[16px] text-ink-2">We’ll email you within one business day with a few times for your 20-minute walkthrough.</p>
      </motion.div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-5 rounded-lg bg-subtle p-6 md:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="cf-name" className="t-label text-ink-3">Your name</label>
          <input id="cf-name" name="name" autoComplete="name" aria-invalid={!!errors.name} aria-describedby="cf-name-err" className={field} />
          {errors.name && <p id="cf-name-err" className="text-[14px] text-danger">Add your name so we know who to ask for.</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="cf-shop" className="t-label text-ink-3">Shop name</label>
          <input id="cf-shop" name="shop" autoComplete="organization" className={field} />
        </div>
      </div>

      <fieldset className="grid gap-2">
        <legend className="t-label mb-2 text-ink-3">How you work</legend>
        <div className="grid grid-cols-3 rounded-md border border-line-strong bg-white p-1">
          {["Shop", "Mobile", "Both"].map((v, i) => (
            <label key={v} className="relative cursor-pointer">
              <input type="radio" name="type" value={v} defaultChecked={i === 0} className="peer sr-only" />
              <span className="block rounded-sm py-2.5 text-center text-[15px] font-medium text-ink-2 transition-colors peer-checked:bg-ink peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-accent">
                {v}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <label htmlFor="cf-email" className="t-label text-ink-3">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" placeholder="you@yourshop.ca" aria-invalid={!!errors.email} aria-describedby="cf-email-err" className={field} />
          {errors.email && <p id="cf-email-err" className="text-[14px] text-danger">Enter an email like you@yourshop.ca.</p>}
        </div>
        <div className="grid gap-2">
          <label htmlFor="cf-phone" className="t-label text-ink-3">Phone (optional)</label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" className={field} />
        </div>
      </div>

      <div className="grid gap-2">
        <label htmlFor="cf-pain" className="t-label text-ink-3">Biggest headache right now</label>
        <select id="cf-pain" name="pain" className={`${field} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 fill=%22none%22 stroke=%22%2371717a%22 stroke-width=%221.5%22><path d=%22M4 6l4 4 4-4%22/></svg>')] bg-[right_16px_center] bg-no-repeat`}>
          {pains.map((p) => (
            <option key={p}>{p}</option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="group mt-1 inline-flex h-[52px] items-center justify-center gap-2 rounded-md bg-ink text-[16px] font-medium text-white transition-[background,transform] hover:bg-[#27272a] active:scale-[0.98] disabled:cursor-progress disabled:opacity-60"
      >
        {status === "sending" ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" /> Sending…
          </>
        ) : (
          <>
            Book my meeting <ArrowRight size={18} strokeWidth={1.75} className="transition-transform group-hover:translate-x-[3px]" />
          </>
        )}
      </button>
      {status === "error" && (
        <p role="alert" className="text-center text-[14px] text-danger">That didn’t send. Check your connection and try again.</p>
      )}
      <p className="text-center text-[13px] text-ink-3">Free, 20 minutes, no pressure. We reply within one business day.</p>
    </form>
  );
}
