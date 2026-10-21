"use client";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CreditCard,
  Inbox,
  LayoutGrid,
  Mail,
  MessageSquareText,
  Phone,
  Send,
  Zap,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SampleTag, StatusChip } from "@/components/ui/bits";
import { automations, DEPOSIT_RATE, type Lead, money, quoteFor, sampleLeads, TAX, total } from "@/lib/demo-data";
import { useDemoLeads } from "@/lib/demo-store";
import { shopInitials } from "./shop-header";

export type AdminView = "dashboard" | "leads" | "quote" | "payments" | "automations";

type Props = {
  shop: { slug: string; name: string; province: string; city: string };
  initial: { view: AdminView; lead: string; sent: boolean; paid: boolean };
  stripeConnected: boolean;
};

const nav: { view: AdminView; label: string; icon: typeof Inbox }[] = [
  { view: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { view: "leads", label: "Leads", icon: Inbox },
  { view: "payments", label: "Invoices & payments", icon: CreditCard },
  { view: "automations", label: "Automations", icon: Zap },
];

const tone = { New: "new", Quoted: "quoted", "Deposit paid": "paid", Booked: "booked" } as const;
const first = (name: string) => name.split(/\s+/)[0];

export function Admin({ shop, initial, stripeConnected }: Props) {
  const [view, setView] = useState<AdminView>(initial.view);
  const [picked, setLeadId] = useState(initial.lead);
  const [sent, setSent] = useState<Record<string, boolean>>(() => (initial.lead && (initial.sent || initial.paid) ? { [initial.lead]: true } : {}));
  // Paid only ever comes back from Stripe (?paid=1 on the success URL).
  const [paid] = useState<Record<string, boolean>>(() => (initial.lead && initial.paid ? { [initial.lead]: true } : {}));
  const [toast, setToast] = useState(initial.paid ? "Deposit received through Stripe" : "");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [rules, setRules] = useState(() => automations.map((a) => a.on));

  // Requests sent from this demo's quote page (same browser), newest first, above the sample leads.
  const mine = useDemoLeads(shop.slug);
  const leads = useMemo(() => [...mine, ...sampleLeads], [mine]);
  const leadId = picked === "latest" ? (mine[0]?.id ?? "jordan") : picked;
  const lead = leads.find((l) => l.id === leadId);
  const statusOf = (l: Lead): Lead["status"] => (paid[l.id] ? "Deposit paid" : sent[l.id] ? "Quoted" : l.status);

  // Keep the URL in step so a refresh (or Stripe's return) lands on the same screen.
  useEffect(() => {
    const q = new URLSearchParams({ view });
    if (leadId && view !== "dashboard" && view !== "automations") q.set("lead", leadId);
    if (leadId && sent[leadId] && view === "quote") q.set("sent", "1");
    if (leadId && paid[leadId] && view === "payments") q.set("paid", "1");
    history.replaceState(null, "", `?${q}`);
  }, [view, leadId, sent, paid]);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(""), 4000);
    return () => clearTimeout(t);
  }, [toast]);

  function go(v: AdminView, id?: string) {
    setView(v);
    if (id !== undefined) setLeadId(id);
    setPayError("");
    window.scrollTo({ top: 0 });
  }

  const tax = TAX[shop.province] ?? TAX.ON;
  const priced = (l: Lead) => {
    const lines = quoteFor(l);
    const sub = total(lines);
    const taxes = Math.round(sub * tax.rate * 100) / 100;
    const all = sub + taxes;
    return { lines, sub, taxes, all, deposit: Math.round(all * DEPOSIT_RATE) };
  };

  async function requestDeposit(l: Lead) {
    const { deposit } = priced(l);
    setPaying(true);
    setPayError("");
    try {
      const res = await fetch("/api/demo/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: shop.slug, lead: l.id, amount: deposit * 100, customer: l.name, wheels: l.wheels }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (data.url) {
        location.href = data.url;
        return;
      }
      setPayError(data.error ?? "Couldn't open checkout.");
    } catch {
      setPayError("Couldn't open checkout. Check your connection.");
    }
    setPaying(false);
  }

  const newCount = leads.filter((l) => statusOf(l) === "New").length;

  return (
    <div className="min-h-[calc(100dvh-40px)] bg-subtle">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-line bg-white">
        <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-9 shrink-0 place-items-center rounded-md bg-ink text-[14px] font-semibold text-white">{shopInitials(shop.name)}</span>
            <p className="truncate text-[15px] font-semibold text-ink">
              {shop.name} <span className="font-normal text-ink-3">· Admin</span>
            </p>
          </div>
          <SampleTag />
        </div>
        <nav className="no-scrollbar flex gap-1 overflow-x-auto border-t border-line px-3 py-2 lg:hidden">
          {nav.map((n) => (
            <NavButton key={n.view} item={n} on={view === n.view || (n.view === "leads" && view === "quote")} count={n.view === "leads" ? newCount : 0} onClick={() => go(n.view)} />
          ))}
        </nav>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100dvh-64px)] w-60 shrink-0 border-r border-line bg-white p-3 lg:block">
          <nav className="grid gap-1">
            {nav.map((n) => (
              <NavButton key={n.view} item={n} on={view === n.view || (n.view === "leads" && view === "quote")} count={n.view === "leads" ? newCount : 0} onClick={() => go(n.view)} />
            ))}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-4 md:p-6 lg:p-8">
          {view === "dashboard" && <Dashboard shop={shop} leads={leads} statusOf={statusOf} newCount={newCount} open={(id) => go("leads", id)} />}

          {view === "leads" && (
            <div className="grid gap-5 xl:grid-cols-[minmax(320px,400px)_1fr]">
              <section className={`grid content-start gap-2 ${lead ? "hidden xl:grid" : ""}`}>
                <h1 className="mb-2 text-[22px] font-semibold text-ink">Leads</h1>
                {leads.map((l) => (
                  <button
                    key={l.id}
                    onClick={() => setLeadId(l.id)}
                    className={`rounded-lg border bg-white p-4 text-left transition-colors ${l.id === leadId ? "border-ink" : "border-line hover:border-line-strong"}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate text-[15px] font-semibold text-ink">{l.name}</p>
                        <p className="truncate text-[14px] text-ink-3">
                          {l.wheels} × {l.size} · {l.damage[0] ?? "No damage given"}
                        </p>
                      </div>
                      <StatusChip tone={tone[statusOf(l)]}>{statusOf(l)}</StatusChip>
                    </div>
                    <p className="mt-2 text-[12px] text-ink-3">
                      {l.source} · {l.received}
                    </p>
                  </button>
                ))}
              </section>
              {lead ? (
                <LeadDetail lead={lead} status={statusOf(lead)} back={() => setLeadId("")} quote={() => go("quote")} />
              ) : (
                <p className="hidden self-center text-center text-ink-3 xl:block">Pick a lead to see their photos and details.</p>
              )}
            </div>
          )}

          {view === "quote" && lead && (
            <QuoteBuilder
              lead={lead}
              shopName={shop.name}
              taxLabel={tax.label}
              priced={priced(lead)}
              sent={!!sent[lead.id]}
              back={() => go("leads")}
              send={() => {
                setSent((s) => ({ ...s, [lead.id]: true }));
                setToast(`Quote sent to ${first(lead.name)} by ${lead.reply.toLowerCase()}`);
              }}
              invoice={() => go("payments")}
            />
          )}

          {view === "payments" && (
            <Payments
              lead={lead ?? leads[0]}
              shop={shop}
              taxLabel={tax.label}
              priced={priced(lead ?? leads[0])}
              paid={!!paid[(lead ?? leads[0]).id]}
              paying={paying}
              error={payError}
              stripeConnected={stripeConnected}
              request={() => requestDeposit(lead ?? leads[0])}
            />
          )}

          {view === "automations" && <Automations shopName={shop.name} rules={rules} toggle={(i) => setRules((r) => r.map((v, j) => (j === i ? !v : v)))} />}
        </main>
      </div>

      {toast && (
        <div role="status" className="fixed top-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2.5 rounded-md bg-ink px-4 py-3 text-[14px] font-medium text-white shadow-lg">
          <span className="grid size-5 place-items-center rounded-sm bg-success text-white">
            <Check size={13} strokeWidth={2.6} />
          </span>
          {toast}
        </div>
      )}
    </div>
  );
}

function NavButton({ item, on, count, onClick }: { item: (typeof nav)[number]; on: boolean; count: number; onClick: () => void }) {
  const Icon = item.icon;
  return (
    <button
      onClick={onClick}
      aria-current={on ? "page" : undefined}
      className={`flex h-10 shrink-0 items-center gap-2.5 rounded-md px-3 text-[14px] font-medium whitespace-nowrap transition-colors ${on ? "bg-muted text-ink" : "text-ink-2 hover:bg-subtle"}`}
    >
      <Icon size={17} strokeWidth={1.75} />
      {item.label}
      {count > 0 && <span className="ml-auto rounded-sm bg-accent px-1.5 text-[11px] font-semibold text-white">{count}</span>}
    </button>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-line bg-white p-5 md:p-6 ${className}`}>{children}</section>;
}

function Dashboard({
  shop,
  leads,
  statusOf,
  newCount,
  open,
}: {
  shop: Props["shop"];
  leads: Lead[];
  statusOf: (l: Lead) => Lead["status"];
  newCount: number;
  open: (id: string) => void;
}) {
  const stats = [
    { k: "New requests", v: String(newCount), d: "Waiting for a price" },
    { k: "Quotes out", v: "5", d: "$4,120 · follow-ups on" },
    { k: "Deposits this week", v: "$1,060", d: "Paid by card" },
    { k: "Booked this week", v: "6", d: "2 mobile, 4 in-shop" },
  ];
  const week = [
    { day: "Tue", time: "9:00", who: "Marc D.", job: "1 × 19\" curb rash" },
    { day: "Wed", time: "8:30", who: "Dana K.", job: "4 × 20\" refinish" },
    { day: "Thu", time: "1:00", who: "Sam R.", job: "2 × 18\" repair" },
    { day: "Fri", time: "10:30", who: "Alex T.", job: "4 × 21\" powder coat" },
  ];
  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-[22px] font-semibold text-ink">Good morning</h1>
        <p className="text-[15px] text-ink-3">Here’s {shop.name} this week.</p>
      </div>
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {stats.map((s) => (
          <Card key={s.k} className="!p-5">
            <p className="t-label text-[11px] text-ink-3">{s.k}</p>
            <p className="t-mono mt-3 text-[30px] leading-none font-semibold text-ink">{s.v}</p>
            <p className="mt-2 text-[13px] text-ink-3">{s.d}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <h2 className="mb-4 text-[16px] font-semibold text-ink">Needs a price</h2>
          <ul className="grid gap-2">
            {leads
              .filter((l) => statusOf(l) === "New")
              .map((l) => (
                <li key={l.id}>
                  <button onClick={() => open(l.id)} className="flex w-full items-center justify-between gap-3 rounded-md border border-line p-3 text-left hover:border-ink">
                    <span className="min-w-0">
                      <span className="block truncate text-[15px] font-medium text-ink">{l.name}</span>
                      <span className="block truncate text-[13px] text-ink-3">
                        {l.vehicle} · {l.wheels} × {l.size}
                      </span>
                    </span>
                    <ArrowRight size={16} strokeWidth={1.75} className="shrink-0 text-ink-3" />
                  </button>
                </li>
              ))}
          </ul>
        </Card>
        <Card>
          <h2 className="mb-4 flex items-center gap-2 text-[16px] font-semibold text-ink">
            <CalendarDays size={17} strokeWidth={1.75} /> Booked this week
          </h2>
          <ul className="divide-y divide-line">
            {week.map((b) => (
              <li key={b.who} className="flex items-center gap-4 py-3">
                <span className="t-mono w-20 shrink-0 text-[13px] text-ink-3">
                  {b.day} {b.time}
                </span>
                <span className="min-w-0 flex-1 truncate text-[15px] text-ink">{b.who}</span>
                <span className="truncate text-[13px] text-ink-3">{b.job}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  );
}

function LeadDetail({ lead, status, back, quote }: { lead: Lead; status: Lead["status"]; back: () => void; quote: () => void }) {
  const ReplyIcon = { Text: MessageSquareText, Call: Phone, Email: Mail }[lead.reply];
  return (
    <Card>
      <button onClick={back} className="mb-4 inline-flex items-center gap-1.5 text-[14px] text-ink-3 hover:text-ink xl:hidden">
        <ArrowLeft size={15} strokeWidth={1.75} /> All leads
      </button>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-[22px] font-semibold text-ink">{lead.name}</h1>
          <p className="text-[14px] text-ink-3">
            {lead.source} · {lead.received}
          </p>
        </div>
        <StatusChip tone={tone[status]}>{status}</StatusChip>
      </div>

      {lead.photos.length > 0 && (
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {lead.photos.map((p) => (
            // eslint-disable-next-line @next/next/no-img-element -- sample photos and local data URLs
            <img key={p} src={p} alt="Customer photo of the wheel" className="aspect-square w-full rounded-md object-cover" />
          ))}
        </div>
      )}

      <dl className="mt-5 grid grid-cols-2 gap-x-6 gap-y-4 text-[15px] sm:grid-cols-3">
        {[
          ["Vehicle", lead.vehicle],
          ["Wheels", `${lead.wheels} × ${lead.size}`],
          ["Finish", lead.finish],
          ["Damage", lead.damage.join(", ") || "Not given"],
        ].map(([k, v]) => (
          <div key={k}>
            <dt className="t-label text-[11px] text-ink-3">{k}</dt>
            <dd className="mt-1 text-ink">{v}</dd>
          </div>
        ))}
        <div>
          <dt className="t-label text-[11px] text-ink-3">Reply by</dt>
          <dd className="mt-1 inline-flex items-center gap-1.5 text-ink">
            <ReplyIcon size={15} strokeWidth={1.75} /> {lead.reply}
          </dd>
        </div>
      </dl>
      {lead.notes && <p className="mt-5 rounded-md bg-subtle p-4 text-[15px] text-ink-2">“{lead.notes}”</p>}

      <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-line pt-5">
        <button onClick={quote} className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-[#27272a]">
          Build quote <ArrowRight size={16} strokeWidth={1.75} />
        </button>
        <p className="text-[13px] text-ink-3">An instant reply already went out when this came in.</p>
      </div>
    </Card>
  );
}

type Priced = { lines: ReturnType<typeof quoteFor>; sub: number; taxes: number; all: number; deposit: number };

function Lines({ priced, taxLabel }: { priced: Priced; taxLabel: string }) {
  return (
    <div className="text-[15px]">
      <ul className="divide-y divide-line border-y border-line">
        {priced.lines.map((l) => (
          <li key={l.label} className="flex justify-between gap-4 py-3">
            <span className="text-ink">
              {l.label} <span className="text-ink-3">× {l.qty}</span>
            </span>
            <span className="t-mono text-ink">{money(l.qty * l.each)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-3 grid gap-1.5">
        <div className="flex justify-between text-ink-3">
          <dt>Subtotal</dt>
          <dd className="t-mono">{money(priced.sub)}</dd>
        </div>
        <div className="flex justify-between text-ink-3">
          <dt>{taxLabel}</dt>
          <dd className="t-mono">{money(priced.taxes)}</dd>
        </div>
        <div className="flex justify-between pt-1 text-[17px] font-semibold text-ink">
          <dt>Total</dt>
          <dd className="t-mono">{money(priced.all)}</dd>
        </div>
        <div className="flex justify-between text-accent">
          <dt>Deposit to book ({Math.round(DEPOSIT_RATE * 100)}%)</dt>
          <dd className="t-mono">{money(priced.deposit)}</dd>
        </div>
      </dl>
    </div>
  );
}

function QuoteBuilder({
  lead,
  shopName,
  taxLabel,
  priced,
  sent,
  back,
  send,
  invoice,
}: {
  lead: Lead;
  shopName: string;
  taxLabel: string;
  priced: Priced;
  sent: boolean;
  back: () => void;
  send: () => void;
  invoice: () => void;
}) {
  const followUps = automations.filter((a) => a.group === "Quotes" && a.title.startsWith("Quote follow-up"));
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <Card>
        <button onClick={back} className="mb-4 inline-flex items-center gap-1.5 text-[14px] text-ink-3 hover:text-ink">
          <ArrowLeft size={15} strokeWidth={1.75} /> {lead.name}
        </button>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-[22px] font-semibold text-ink">Quote for {lead.name}</h1>
          <p className="text-[13px] text-ink-3">Priced from your price list · {lead.vehicle}</p>
        </div>
        <div className="mt-5">
          <Lines priced={priced} taxLabel={taxLabel} />
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          {sent ? (
            <>
              <StatusChip tone="sent">Sent by {lead.reply.toLowerCase()}</StatusChip>
              <button onClick={invoice} className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-[#27272a]">
                Request deposit <ArrowRight size={16} strokeWidth={1.75} />
              </button>
            </>
          ) : (
            <button onClick={send} className="inline-flex h-11 items-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-[#27272a]">
              <Send size={16} strokeWidth={1.75} /> Send quote
            </button>
          )}
        </div>
      </Card>

      <Card>
        <h2 className="text-[16px] font-semibold text-ink">What {first(lead.name)} gets</h2>
        <div className="mt-4 rounded-md bg-subtle p-4 text-[14px] leading-relaxed text-ink-2">
          Hi {first(lead.name)}, thanks for the photos. Your quote from {shopName} is {money(priced.all)} including tax. A {money(priced.deposit)} deposit
          holds your spot. View and book: <span className="text-accent underline">your quote link</span>
        </div>
        <h3 className="t-label mt-6 mb-3 text-[11px] text-ink-3">If they go quiet</h3>
        <ol className="grid gap-3">
          {followUps.map((f) => (
            <li key={f.title} className="flex items-start gap-3 text-[14px]">
              <span className={`mt-0.5 grid size-5 shrink-0 place-items-center rounded-sm ${sent ? "bg-accent-soft text-accent" : "bg-muted text-ink-3"}`}>
                <Zap size={12} strokeWidth={2} />
              </span>
              <span>
                <span className="block font-medium text-ink">{f.title}</span>
                <span className="text-ink-3">{sent ? `Scheduled · ${f.when.split(",")[0]}` : f.when}</span>
              </span>
            </li>
          ))}
        </ol>
      </Card>
    </div>
  );
}

function Payments({
  lead,
  shop,
  taxLabel,
  priced,
  paid,
  paying,
  error,
  stripeConnected,
  request,
}: {
  lead: Lead;
  shop: Props["shop"];
  taxLabel: string;
  priced: Priced;
  paid: boolean;
  paying: boolean;
  error: string;
  stripeConnected: boolean;
  request: () => void;
}) {
  const history = [
    { who: "Marc D.", what: "Deposit", amount: 49, when: "Mon", how: "Visa ···· 4242" },
    { who: "Dana K.", what: "Paid in full", amount: 912.8, when: "Sun", how: "Mastercard ···· 5454" },
    { who: "Chris L.", what: "Paid in full", amount: 431.2, when: "Last Thu", how: "Apple Pay" },
  ];
  return (
    <div className="grid gap-5 xl:grid-cols-[1fr_380px]">
      <Card>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="t-label text-[11px] text-ink-3">Invoice INV-1042</p>
            <h1 className="mt-1 text-[22px] font-semibold text-ink">{lead.name}</h1>
            <p className="text-[14px] text-ink-3">
              {lead.vehicle} · {shop.name}, {shop.city}
            </p>
          </div>
          {paid ? <StatusChip tone="paid">Deposit paid</StatusChip> : <StatusChip tone="warn">Deposit due</StatusChip>}
        </div>
        <div className="mt-5">
          <Lines priced={priced} taxLabel={taxLabel} />
        </div>
        {paid ? (
          <div className="mt-6 flex items-center gap-3 rounded-md bg-success-soft p-4 text-[15px] text-success">
            <Check size={18} strokeWidth={2.4} />
            <span>
              <strong className="font-semibold">{money(priced.deposit)} deposit received</strong> by card through Stripe. Balance of {money(priced.all - priced.deposit)} due at pickup.
            </span>
          </div>
        ) : (
          <div className="mt-6 grid gap-3">
            <button
              onClick={request}
              disabled={paying || !stripeConnected}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-ink px-5 text-[15px] font-medium text-white hover:bg-[#27272a] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <CreditCard size={17} strokeWidth={1.75} />
              {paying ? "Opening Stripe…" : `Pay ${money(priced.deposit)} deposit as ${first(lead.name)}`}
            </button>
            <p className="text-[13px] text-ink-3">
              {stripeConnected
                ? "Opens a real Stripe checkout in test mode. Use card 4242 4242 4242 4242, any future date and any CVC. No money moves."
                : "Card checkout isn’t connected in this demo yet."}
            </p>
            {error && <p className="text-[14px] text-danger">{error}</p>}
          </div>
        )}
      </Card>

      <Card>
        <h2 className="mb-4 text-[16px] font-semibold text-ink">Recent payments</h2>
        <ul className="divide-y divide-line">
          {paid && (
            <li className="flex justify-between gap-3 py-3 text-[14px]">
              <span>
                <span className="block font-medium text-ink">{lead.name}</span>
                <span className="text-ink-3">Deposit · just now · Stripe</span>
              </span>
              <span className="t-mono text-success">+{money(priced.deposit)}</span>
            </li>
          )}
          {history.map((h) => (
            <li key={h.who} className="flex justify-between gap-3 py-3 text-[14px]">
              <span>
                <span className="block font-medium text-ink">{h.who}</span>
                <span className="text-ink-3">
                  {h.what} · {h.when} · {h.how}
                </span>
              </span>
              <span className="t-mono text-ink">{money(h.amount)}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}

function Automations({ shopName, rules, toggle }: { shopName: string; rules: boolean[]; toggle: (i: number) => void }) {
  const groups = [...new Set(automations.map((a) => a.group))];
  return (
    <div className="grid gap-5">
      <div>
        <h1 className="text-[22px] font-semibold text-ink">Automations</h1>
        <p className="text-[15px] text-ink-3">Texts and emails that go out for {shopName} on their own, in your words.</p>
      </div>
      <div className="grid gap-5 xl:grid-cols-3">
        {groups.map((g) => (
          <Card key={g}>
            <h2 className="t-label mb-3 text-[11px] text-ink-3">{g}</h2>
            <ul className="divide-y divide-line">
              {automations.map((a, i) =>
                a.group === g ? (
                  <li key={a.title} className="flex items-center justify-between gap-4 py-3">
                    <span className="min-w-0">
                      <span className="block text-[15px] font-medium text-ink">{a.title}</span>
                      <span className="block text-[13px] text-ink-3">{a.when}</span>
                    </span>
                    <button
                      role="switch"
                      aria-checked={rules[i]}
                      aria-label={a.title}
                      onClick={() => toggle(i)}
                      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${rules[i] ? "bg-success" : "bg-line-strong"}`}
                    >
                      <span className={`absolute top-0.5 size-5 rounded-full bg-white shadow-sm transition-[left] ${rules[i] ? "left-[22px]" : "left-0.5"}`} />
                    </button>
                  </li>
                ) : null,
              )}
            </ul>
          </Card>
        ))}
      </div>
    </div>
  );
}
