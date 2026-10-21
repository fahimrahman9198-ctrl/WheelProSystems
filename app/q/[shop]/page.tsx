import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check, MapPin, Phone } from "lucide-react";
import type { CSSProperties } from "react";
import { QuoteForm } from "@/components/quote/quote-form";
import { Accent } from "@/components/ui/bits";
import { getShop, shops, telHref } from "@/lib/shops";

// Only the shops in lib/shops.ts get a page; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return shops.map((s) => ({ shop: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/q/[shop]">): Promise<Metadata> {
  const shop = getShop((await params).shop);
  if (!shop) return {};
  const title = `${shop.name} · Wheel repair quote`;
  const description = `Send ${shop.name} a photo of your wheel and get a price, without driving in first.`;
  return {
    title,
    description,
    // Unlisted until the shop says yes, so it never shows up in search under their name.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website" },
  };
}

const steps = [
  { n: "01", t: "Send photos", d: "One of the whole wheel, one close-up of the damage." },
  { n: "02", t: "Get your price", d: "Priced from your photos, by the people doing the work." },
  { n: "03", t: "Pick a time", d: "Book in when it suits you." },
];

export default async function QuotePage({ params }: PageProps<"/q/[shop]">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();

  const mobile = shop.kind === "mobile";
  const initials = shop.name
    .replace(/^The /, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");
  const style = shop.accent ? ({ "--accent": shop.accent } as CSSProperties) : undefined;

  return (
    <div style={style} className="min-h-dvh">
      {shop.status === "preview" && (
        <div className="bg-dark px-5 py-2.5 text-center text-[13px] text-on-dark-2">
          Preview built for {shop.name} by <span className="text-on-dark">WheelPro Systems</span> · not live yet
        </div>
      )}

      <header className="border-b border-line">
        <div className="wrap flex h-[72px] items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-[15px] font-semibold tracking-tight text-white">
              {initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-[16px] leading-tight font-semibold text-ink">{shop.name}</p>
              <p className="text-[13px] text-ink-3">
                {mobile ? "Mobile wheel repair" : "Wheel repair"} · {shop.city}, {shop.province}
              </p>
            </div>
          </div>
          {shop.phone && (
            <a
              href={telHref(shop.phone)}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-md border border-line-strong px-3.5 text-[15px] font-medium text-ink transition-colors hover:border-ink"
            >
              <Phone size={16} strokeWidth={1.75} />
              <span className="hidden sm:inline">{shop.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          )}
        </div>
      </header>

      <main className="wrap grid gap-10 py-10 md:py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <section className="lg:col-span-5">
          <div className="lg:sticky lg:top-10">
            <p className="t-label mb-4 text-ink-3">Photo quote · {shop.city}</p>
            <h1 className="t-h1">
              <Accent text="Send a photo. Get a *price*." />
            </h1>
            <p className="t-body-lg mt-5 max-w-[40ch] text-ink-2">
              Show {shop.name} the damage from your phone. No need to {mobile ? "book a visit" : "drive in"} just to find out what it
              costs.
            </p>

            {shop.highlights.length > 0 && (
              <ul className="mt-6 grid gap-2.5">
                {shop.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2.5 text-[15px] text-ink">
                    <span className="grid size-5 place-items-center rounded-sm bg-success-soft text-success">
                      <Check size={13} strokeWidth={2.4} />
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            )}

            <ol className="mt-10 hidden gap-5 border-t border-line pt-8 lg:grid">
              {steps.map((s) => (
                <li key={s.n} className="flex gap-4">
                  <span className="t-mono pt-0.5 text-[13px] text-accent">{s.n}</span>
                  <div>
                    <p className="text-[16px] font-medium text-ink">{s.t}</p>
                    <p className="text-[15px] text-ink-3">{s.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="lg:col-span-7">
          <QuoteForm slug={shop.slug} shopName={shop.name} mobile={mobile} preview={shop.status === "preview"} />
        </section>
      </main>

      <footer className="border-t border-line py-10">
        <div className="wrap grid gap-8 md:grid-cols-2">
          <div>
            <p className="t-label mb-3 text-ink-3">What we do</p>
            <ul className="flex flex-wrap gap-2">
              {shop.services.map((s) => (
                <li key={s} className="rounded-sm border border-line px-3 py-1.5 text-[14px] text-ink-2">
                  {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid gap-2 text-[15px] text-ink-2 md:justify-items-end md:text-right">
            <p className="font-medium text-ink">{shop.name}</p>
            {shop.address && (
              <p className="inline-flex items-center gap-1.5">
                <MapPin size={15} strokeWidth={1.75} className="shrink-0 text-ink-3" />
                {shop.address}
              </p>
            )}
            {shop.phone && (
              <a href={telHref(shop.phone)} className="underline decoration-line-strong underline-offset-[0.3em] hover:decoration-ink">
                {shop.phone}
              </a>
            )}
            <p className="mt-3 text-[13px] text-ink-3">Quote page by WheelPro Systems</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
