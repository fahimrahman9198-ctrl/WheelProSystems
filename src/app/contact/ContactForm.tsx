"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/site";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        setSubmitted(true);
      }}
      className="rounded-lg border border-white/10 bg-white/[0.04] p-6"
    >
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" placeholder="Your name" />
        <Field label="Email" placeholder="you@example.com" type="email" />
        <Field label="Business type" placeholder="Wheel repair, detailing, dealer vendor" />
        <Field label="Main bottleneck" placeholder="Quotes, booking, deposits, follow-up" />
      </div>
      <label className="mt-4 block">
        <span className="text-sm font-medium text-white">Message</span>
        <textarea
          className="mt-2 min-h-32 w-full rounded-lg border border-white/10 bg-lab-950/70 px-3 py-3 text-sm text-white outline-none placeholder:text-steel-500 focus:border-cyan-300/60"
          placeholder={`Tell ${siteConfig.agencyName} what workflow you want to improve.`}
        />
      </label>
      {submitted && (
        <p className="mt-4 rounded-lg border border-success-400/25 bg-success-400/10 p-3 text-sm text-success-400">
          Demo form submitted locally. For real contact, email {siteConfig.email}.
        </p>
      )}
      <button className="mt-5 inline-flex items-center gap-2 rounded-lg border border-electric-400 bg-electric-500 px-5 py-3 text-sm font-semibold text-white">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Demo Message
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
