import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="t-label inline-flex items-center rounded-sm border border-line px-3 py-1.5 text-[11px] text-ink-2">
      {children}
    </span>
  );
}

export function SampleTag({ className = "" }: { className?: string }) {
  return (
    <span className={`t-mono rounded-xs border border-line bg-white px-1.5 py-0.5 text-[10px] tracking-wider text-ink-3 uppercase ${className}`}>
      Sample
    </span>
  );
}

const chip = {
  new: "bg-muted text-ink-2",
  quoted: "bg-accent-soft text-accent",
  sent: "bg-accent-soft text-accent",
  paid: "bg-success-soft text-success",
  booked: "bg-success-soft text-success",
  warn: "bg-warn-soft text-warn",
} as const;

export function StatusChip({ tone, children }: { tone: keyof typeof chip; children: ReactNode }) {
  return (
    <span className={`inline-flex shrink-0 items-center gap-1.5 rounded-sm px-2 py-0.5 text-[11px] font-medium whitespace-nowrap ${chip[tone]}`}>
      <span className="size-1.5 rounded-xs bg-current" />
      {children}
    </span>
  );
}

export function SectionIntro({ label, title, sub, dark = false }: { label: string; title: ReactNode; sub?: ReactNode; dark?: boolean }) {
  return (
    <div className="mx-auto max-w-[820px] text-center">
      <p className={`t-label mb-4 ${dark ? "text-on-dark-2" : "text-ink-3"}`}>{label}</p>
      <h2 className={`t-h1 ${dark ? "!text-on-dark" : ""}`}>{title}</h2>
      {sub && <p className={`t-body-lg mx-auto mt-5 max-w-[46ch] ${dark ? "text-on-dark-2" : "text-ink-2"}`}>{sub}</p>}
    </div>
  );
}

/** Renders "*word*" segments of a heading in the outlined style. */
export function Accent({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*(.+?)\*/).map((part, i) =>
        i % 2 ? (
          <span key={i} className="t-outline">
            <SolidHyphens text={part} />
          </span>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** Inside an outlined word, hyphens stay solid so they don't read as a strikethrough. */
export function SolidHyphens({ text }: { text: string }) {
  return (
    <>
      {text.split(/(-)/).map((t, i) =>
        t === "-" ? (
          <span key={i} className="t-solid">
            -
          </span>
        ) : (
          t
        ),
      )}
    </>
  );
}
