"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

const businessTypes = [
  "Wheel repair",
  "Wheel refinishing",
  "Rim repair",
  "Mobile wheel repair",
  "Dealership/fleet vendor",
  "Other",
];

const mainProblems = [
  "Missing leads",
  "Too much manual quoting",
  "Need online booking",
  "Need payment/deposit flow",
  "Need dashboard",
  "Need better website",
  "Need automation",
];

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" placeholder="Your name" />
        <Field label="Business name" placeholder="Your wheel shop" />
        <Field label="Website URL" placeholder="https://yourshop.com" type="url" />
        <Field label="Monthly lead volume" placeholder="Example: 40-80 leads/month" />
        <Select label="Business type" options={businessTypes} />
        <Select label="Main problem" options={mainProblems} />
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-white">Message</span>
        <textarea
          className="mt-2 min-h-36 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white outline-none placeholder:text-steel-500 focus:border-cyan-300/60"
          placeholder="Tell me where leads, quotes, booking, deposits, or follow-up currently break down."
        />
      </label>
      {submitted && (
        <p className="mt-4 rounded-lg border border-success-400/25 bg-success-400/10 p-3 text-sm text-success-400">
          Thanks. For direct contact, email {siteConfig.email}.
        </p>
      )}
      <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-electric-400 bg-electric-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-electric-400">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Audit Request
      </button>
    </form>
  );
}

function Field({ label, placeholder, type = "text" }: { label: string; placeholder: string; type?: string }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white outline-none placeholder:text-steel-500 focus:border-cyan-300/60"
      />
    </label>
  );
}

function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-sm font-medium text-white">{label}</span>
      <select className="mt-2 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white outline-none focus:border-cyan-300/60">
        {options.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>
    </label>
  );
}
