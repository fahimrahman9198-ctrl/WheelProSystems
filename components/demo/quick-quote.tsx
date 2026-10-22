"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const damages = ["Curb rash", "Scratches", "Bent", "Cracked"];
const sizes = ["Not sure", '16"', '17"', '18"', '19"', '20"', '21"+'];
const finishes = ["Match original", "Black", "Custom colour"];

/**
 * The hero panel: start a quote right here. The dark readout writes the request back as you pick,
 * then "Add photos" carries on to the full quote page.
 */
export function QuickQuote({ quote, mobile }: { quote: string; mobile: boolean }) {
  const [wheels, setWheels] = useState(2);
  const [size, setSize] = useState("Not sure");
  const [finish, setFinish] = useState("Match original");
  const [damage, setDamage] = useState<string[]>(["Curb rash"]);
  const toggle = (d: string) => setDamage((cur) => (cur.includes(d) ? cur.filter((x) => x !== d) : [...cur, d]));

  const select =
    "shop-mono mt-1 w-full cursor-pointer appearance-none bg-transparent text-[14px] text-ink focus:outline-none sm:text-[15px]";

  return (
    <div className="shop-card relative overflow-hidden p-5 sm:p-6">
      <div aria-hidden="true" className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="relative flex flex-wrap items-start justify-between gap-3">
        <p className="text-[22px] leading-tight font-normal tracking-[-0.02em] text-ink">What would yours cost?</p>
        <div className="flex gap-1.5">
          <span className="shop-chip">Photo quote</span>
          <span className="shop-chip">Reply by text</span>
        </div>
      </div>

      <div className="relative mt-5 grid gap-3 sm:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[16px] bg-[#141413] p-4 shadow-[0_18px_40px_-20px_rgb(0_0_0/0.6)]">
          <p className="shop-mono mb-3.5 flex items-center gap-2 text-[11px] tracking-[0.14em] text-[#5fd39a] uppercase">
            <span className="size-1.5 animate-pulse rounded-full bg-[#5fd39a]" /> Your request
          </p>
          <ul className="shop-mono grid gap-2.5 text-[13px] leading-snug text-[#d8d4c8]" aria-live="polite">
            <li className="flex gap-2">
              <span className="text-accent">→</span>
              <span>
                <span className="text-white">
                  {wheels} wheel{wheels > 1 ? "s" : ""}
                </span>
                , {size === "Not sure" ? "size not sure" : size}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">→</span>
              <span>
                <span className="text-white">Damage</span> {damage.length ? damage.join(", ").toLowerCase() : "not picked yet"}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-accent">→</span>
              <span>
                <span className="text-white">Finish</span> {finish.toLowerCase()}
              </span>
            </li>
            <li className="flex gap-2">
              <span className="text-[#5fd39a]">→</span>
              <span>
                <span className="text-white">Photos</span> add 2 on the next step
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-1">
          <div className="col-span-2 rounded-[13px] border border-line bg-[#fdfbf6] px-3.5 py-3 sm:col-span-1">
            <p className="shop-label !text-[9.5px]">Wheels</p>
            <div className="mt-1 flex gap-1" role="group" aria-label="How many wheels">
              {[1, 2, 3, 4].map((n) => (
                <button
                  key={n}
                  type="button"
                  aria-pressed={wheels === n}
                  onClick={() => setWheels(n)}
                  className={`shop-mono grid size-7 place-items-center rounded-[7px] text-[14px] transition-colors ${wheels === n ? "bg-ink text-[#f9f6ee]" : "text-ink-2 hover:bg-[var(--bg-muted)]"}`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <label className="rounded-[13px] border border-line bg-[#fdfbf6] px-3.5 py-3">
            <span className="shop-label block !text-[9.5px]">Size</span>
            <select value={size} onChange={(e) => setSize(e.target.value)} className={select}>
              {sizes.map((s) => (
                <option key={s}>{s}</option>
              ))}
            </select>
          </label>
          <label className="rounded-[13px] border border-line bg-[#fdfbf6] px-3.5 py-3">
            <span className="shop-label block !text-[9.5px]">Finish</span>
            <select value={finish} onChange={(e) => setFinish(e.target.value)} className={select}>
              {finishes.map((f) => (
                <option key={f}>{f}</option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div className="relative mt-3 rounded-[14px] border border-line bg-[var(--bg-subtle)] p-3">
        <p className="shop-label px-1 pb-2.5">What&rsquo;s wrong?</p>
        <div className="flex flex-wrap items-center gap-2">
          {damages.map((d) => {
            const on = damage.includes(d);
            return (
              <button
                key={d}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(d)}
                className={`h-9 rounded-[10px] border px-3 text-[14px] transition-colors ${on ? "border-ink bg-ink text-[#f9f6ee]" : "border-line-strong bg-[#fdfbf6] text-ink-2 hover:border-ink"}`}
              >
                {d}
              </button>
            );
          })}
          <Link
            href={`${quote}?${new URLSearchParams({ wheels: String(wheels), size, finish, damage: damage.join(",") })}`}
            className="group ml-auto inline-flex h-10 items-center gap-2 rounded-[11px] bg-accent px-4 text-[12px] font-semibold tracking-[0.14em] text-white uppercase transition-colors hover:bg-[#d8431f]"
          >
            Add photos <ArrowRight size={15} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
      <p className="relative mt-3 px-1 text-[12.5px] text-ink-3">
        {mobile ? "We come to you." : "No need to drive in first."} You get a written price before you book anything.
      </p>
    </div>
  );
}
