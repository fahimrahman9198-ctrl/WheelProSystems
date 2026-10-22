import { ArrowRight, Phone } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Chapters, type Chapter } from "@/components/demo/service-chapters";
import { SiteNav } from "@/components/demo/site-nav";
import { QuickQuote } from "@/components/demo/quick-quote";
import { ShopFooter } from "@/components/demo/shop-footer";
import { getShop, telHref } from "@/lib/shops";

// The shop's own website, as WheelPro would build it: the front page of their demo.
// Customer-facing: the shop is the brand, WheelPro only signs the footer.
// Fonts are the ones wheelprosystems.com already loads in the root layout.

// Search title and description lead with what people actually type ("wheel repair" plus the city);
// the headlines on the page are free to be hooks. Still noindex: it's a private demo.
export async function generateMetadata({ params }: PageProps<"/demo/[shop]">): Promise<Metadata> {
  const shop = getShop((await params).shop);
  if (!shop) return {};
  const mobile = shop.kind === "mobile";
  const title = `${mobile ? "Mobile Wheel Repair" : "Wheel Repair"} in ${shop.city}, ${shop.province} | Curb Rash Fixed | ${shop.name}`;
  const description = `Curb rash, scratches or a bent wheel in ${shop.city}? Don't buy new yet. Send ${shop.name} a photo and get a written repair price before you ${mobile ? "book" : "drive in"}.`;
  return { title, description, robots: { index: false, follow: false }, openGraph: { title, description, type: "website" } };
}

const photos = [
  { src: "/photos/demo/rash-lip.jpg", alt: "Curb rash along the lip of a silver wheel" },
  { src: "/photos/demo/rash-chips.jpg", alt: "Chips along the spoke of an alloy wheel" },
  { src: "/photos/demo/rash-dark.jpg", alt: "Scuffed edge of a dark alloy wheel" },
  { src: "/photos/demo/model-y.jpg", alt: "A refinished wheel back on the car" },
];

// Plain descriptors per service, matched on keywords so it works for any shop's list. No claims.
function serviceCopy(service: string): { body: string; chips: string[] } {
  const s = service.toLowerCase();
  if (s.includes("powder")) return { body: "A tougher finish than paint, in almost any colour.", chips: ["Durable", "Any colour"] };
  if (s.includes("bent") || s.includes("crack")) return { body: "Straightened and welded so the wheel runs true again.", chips: ["Straighten", "Weld"] };
  if (s.includes("mobile")) return { body: "Done at your home or work. No drop-off, no waiting room.", chips: ["We come to you"] };
  if (s.includes("tire")) return { body: "Mounting, balancing and swaps while the wheels are off.", chips: ["Mount", "Balance"] };
  if (s.includes("parts")) return { body: "Calipers, trim and small parts painted to match.", chips: ["Calipers", "Trim"] };
  if (s.includes("refinish") || s.includes("wheels and") || s === "wheels")
    return { body: "Stripped and refinished, colour-matched or in a new colour.", chips: ["Colour-matched", "New colour"] };
  return { body: "Curb rash and scratches filled, sanded and colour-matched.", chips: ["Curb rash", "Scratches"] };
}

export default async function ShopSite({ params }: PageProps<"/demo/[shop]">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const base = `/demo/${shop.slug}`;
  const home = base;
  const quote = `${base}/quote`;
  const mobile = shop.kind === "mobile";
  const tagline = `${mobile ? "Mobile wheel repair" : "Wheel repair"} · ${shop.city}`;

  const chapters: Chapter[] = shop.services.map((s, i) => ({
    title: s,
    ...serviceCopy(s),
    image: photos[i % photos.length].src,
    alt: photos[i % photos.length].alt,
  }));

  const facts = [
    ...shop.highlights.slice(0, 2).map((h) => ["Why us", h]),
    ["Quotes", "From a photo, on any phone"],
    ["Area", mobile ? `We come to you across ${shop.city}` : `${shop.city}, ${shop.province}`],
  ].slice(0, 3);

  const ticker = [...shop.services, "Photo quotes", `${shop.city}, ${shop.province}`];

  return (
    <div className="-mb-24 overflow-x-clip pb-24">
      <SiteNav home={home} shopName={shop.name} tagline={tagline} phone={shop.phone} phoneHref={shop.phone ? telHref(shop.phone) : undefined} quote={quote} />

      {/* Hero */}
      <section className="relative mx-auto max-w-[1280px] px-5 pt-12 pb-14 md:px-8 md:pt-16 lg:pb-20">
        <p aria-hidden="true" className="shop-label absolute top-0 left-1 hidden origin-top-left translate-y-[440px] -rotate-90 whitespace-nowrap xl:block">
          {shop.name} / {shop.city}
        </p>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <div>
            <p className="shop-chip !h-8 gap-2 !px-3.5">
              <span className="size-1.5 rounded-full bg-accent" />
              {mobile ? `Mobile across ${shop.city}` : `${shop.city}, ${shop.province}`}
            </p>
            <h1 className="mt-7 text-[clamp(3rem,7.4vw,6rem)] leading-[0.96] font-light tracking-[-0.045em] text-ink">
              Don&rsquo;t buy
              <br />
              new wheels
              <br />
              <span className="shop-smear shop-serif">yet.</span>
            </h1>
            <p className="mt-7 max-w-[44ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-ink-2">
              Most curb rash, scratches and bends can be repaired, not replaced. Send {shop.name} a photo and{" "}
              <em className="not-italic underline decoration-accent/50 decoration-2 underline-offset-[0.25em]">see the repair price</em> before you {mobile ? "book" : "drive in"}.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href={quote}
                className="group inline-flex h-[52px] items-center gap-2.5 rounded-[13px] bg-ink px-6 text-[12.5px] font-semibold tracking-[0.16em] text-[#f9f6ee] uppercase transition-transform active:scale-[0.98]"
              >
                Get a price
                <ArrowRight size={16} strokeWidth={2} className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              {shop.phone && (
                <a
                  href={telHref(shop.phone)}
                  className="inline-flex h-[52px] items-center gap-2 rounded-[13px] border border-line-strong bg-[var(--card)] px-6 text-[12.5px] font-semibold tracking-[0.16em] text-ink uppercase transition-colors hover:border-ink"
                >
                  <Phone size={15} strokeWidth={2} /> {shop.phone}
                </a>
              )}
            </div>
          </div>

          <div>
            <QuickQuote quote={quote} mobile={mobile} />
            <p className="shop-label mt-4 flex flex-wrap justify-between gap-2 px-1">
              <span>Photos · damage · size · finish</span>
              <span>Written price by text or email</span>
            </p>
          </div>
        </div>

        <dl className="mt-14 grid overflow-hidden rounded-[18px] border border-line bg-[var(--bg-subtle)] sm:max-w-[760px] sm:grid-cols-3">
          {facts.map(([k, v], i) => (
            <div key={k + v} className={`px-5 py-4 ${i ? "border-t border-line sm:border-t-0 sm:border-l" : ""}`}>
              <dt className="shop-label !text-[9.5px]">{k}</dt>
              <dd className="mt-1.5 text-[16px] leading-snug text-ink">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Ticker */}
      <div aria-hidden="true" className="-rotate-[0.6deg] overflow-hidden border-y border-line bg-[var(--bg-subtle)] py-3.5">
        <div className="shop-marquee flex w-max gap-10 whitespace-nowrap">
          {[0, 1].map((k) => (
            <span key={k} className="shop-label flex gap-10 !text-ink-2">
              {[...ticker, ...ticker].map((t, i) => (
                <span key={i} className="flex items-center gap-10">
                  {t}
                  <span className="text-accent">•</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* Services */}
      <section id="services" className="mx-auto max-w-[1280px] px-5 py-20 md:px-8 md:py-28">
        <div className="mb-12 max-w-[640px]">
          <h2 className="text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] font-light tracking-[-0.035em] text-ink">
            Think your wheel is ruined?
            <br />
            <span className="text-[var(--teal)]">
              Look what we <span className="shop-serif">fix</span>.
            </span>
          </h2>
          <p className="mt-5 max-w-[48ch] text-[17px] leading-relaxed text-ink-2">
            Wheel repair in {shop.city}, from a scuffed lip to a full refinish. Tap one to see it.
          </p>
        </div>
        <Chapters chapters={chapters} />
      </section>

      {/* How it works */}
      <section id="how" className="border-t border-line">
        <div className="mx-auto grid max-w-[1280px] gap-12 px-5 py-20 md:px-8 md:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-[clamp(2.2rem,4.4vw,3.6rem)] leading-[1.02] font-light tracking-[-0.035em] text-ink">
              Why drive across town
              <br />
              <span className="text-[var(--teal)]">
                for a <span className="shop-serif">quote</span>?
              </span>
            </h2>
            <p className="mt-5 max-w-[46ch] text-[17px] leading-relaxed text-ink-2">
              Show us the damage from your phone and get a written price back. No trip, no waiting room. Book only if you like the price.
            </p>
            <ul className="mt-8 grid gap-3 text-[15px] text-ink">
              {["Send two photos: the whole wheel, and a close-up", "Pick the damage, the size and the finish", "Get a written price by text or email", "Book a time and hold it with a deposit"].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-[2px] bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="shop-card p-5 sm:p-6">
            <div className="flex items-center justify-between">
              <p className="shop-label">What you get back</p>
              <span className="shop-chip">Example</span>
            </div>
            <div className="mt-4 rounded-[16px] bg-[#141413] p-5">
              <p className="shop-mono text-[10.5px] tracking-[0.14em] text-[#a8a395] uppercase">{shop.name} · text message</p>
              <p className="mt-3 text-[15px] leading-relaxed text-[#f3efe3]">
                Hi Jordan, thanks for the photos. Your price for 2 wheels is ready, with tax included.{" "}
                <span className="text-accent underline underline-offset-2">View your quote and book a time</span>
              </p>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {[
                ["Your quote", "In writing"],
                ["Booking", "When it suits you"],
              ].map(([k, v]) => (
                <div key={k} className="rounded-[13px] border border-line bg-[#fdfbf6] px-4 py-3">
                  <p className="shop-label !text-[9.5px]">{k}</p>
                  <p className="mt-1 text-[14px] text-ink">{v}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Close */}
      <section className="px-4 pb-20 sm:px-6 md:pb-28">
        <div className="relative mx-auto max-w-[1080px] overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#1c1714_0%,#141413_55%,#0f2a28_100%)] px-6 py-14 shadow-[0_40px_80px_-40px_rgb(20_15_10/0.6)] sm:px-12 md:py-16">
          <h2 className="max-w-[16ch] text-[clamp(2.2rem,4.6vw,3.8rem)] leading-[1.02] font-light tracking-[-0.035em] !text-[#f3efe3]">
            What will it cost? Find out from your <span className="shop-serif">couch</span>.
          </h2>
          <p className="mt-5 max-w-[44ch] text-[17px] leading-relaxed text-[#bdb7a8]">Two photos from your phone. A written price back. That&rsquo;s it.</p>
          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href={quote}
              className="inline-flex h-[52px] items-center gap-2.5 rounded-[13px] bg-accent px-6 text-[12.5px] font-semibold tracking-[0.16em] text-white uppercase transition-colors hover:bg-[#d8431f]"
            >
              Get a price <ArrowRight size={16} strokeWidth={2} />
            </Link>
            {shop.phone && (
              <a
                href={telHref(shop.phone)}
                className="inline-flex h-[52px] items-center gap-2 rounded-[13px] border border-white/20 px-6 text-[12.5px] font-semibold tracking-[0.16em] text-[#f3efe3] uppercase transition-colors hover:border-white/50"
              >
                <Phone size={15} strokeWidth={2} /> {shop.phone}
              </a>
            )}
          </div>
        </div>
      </section>

      <ShopFooter shop={shop} />
    </div>
  );
}
