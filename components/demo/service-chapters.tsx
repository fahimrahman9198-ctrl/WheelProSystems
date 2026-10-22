"use client";

import Image from "next/image";
import { useState } from "react";

export type Chapter = { title: string; body: string; chips: string[]; image: string; alt: string };

/** The shop's services as chapters. The active one carries the orange rule and swaps the photo beside it. */
export function Chapters({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(0);
  const c = chapters[active];

  return (
    <div className="grid gap-5 lg:grid-cols-[1.1fr_1fr]">
      <ol className="overflow-hidden rounded-[22px] border border-line bg-[var(--bg-subtle)] lg:self-start">
        {chapters.map((ch, i) => {
          const on = i === active;
          return (
            <li key={ch.title} className={i ? "border-t border-line" : ""}>
              <button
                type="button"
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                aria-pressed={on}
                className={`relative block w-full px-6 py-6 text-left transition-colors sm:px-7 ${on ? "bg-[var(--card)]" : "hover:bg-[var(--card)]/60"}`}
              >
                <span aria-hidden="true" className={`absolute top-0 bottom-0 left-0 w-[3px] bg-accent transition-transform duration-500 ${on ? "scale-y-100" : "scale-y-0"}`} />
                <span className="flex flex-wrap items-start justify-between gap-3">
                  <span className="text-[24px] leading-tight font-normal tracking-[-0.02em] text-ink">{ch.title}</span>
                  <span className="flex flex-wrap gap-1.5">
                    {ch.chips.map((t) => (
                      <span key={t} className="shop-chip !h-6 !text-[9.5px]">
                        {t}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="mt-2 block max-w-[52ch] text-[15px] leading-relaxed text-ink-3">{ch.body}</span>
              </button>
            </li>
          );
        })}
      </ol>

      <figure className="shop-card relative overflow-hidden p-3 lg:sticky lg:top-28 lg:self-start">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[14px] bg-[var(--bg-subtle)] sm:aspect-[4/3] lg:aspect-[4/5]">
          {chapters.map((ch, i) => (
            <Image
              key={ch.title}
              src={ch.image}
              alt={ch.alt}
              fill
              loading="eager"
              sizes="(min-width: 1024px) 40vw, 90vw"
              className={`object-cover transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>
        <figcaption className="flex items-center justify-between px-2 pt-3 pb-1">
          <span className="text-[15px] font-medium text-ink">{c.title}</span>
          <span className="shop-label">Sample photo</span>
        </figcaption>
      </figure>
    </div>
  );
}
