import { notFound } from "next/navigation";
import { ShopFooter } from "@/components/demo/shop-footer";
import { SiteNav } from "@/components/demo/site-nav";
import { QuoteForm } from "@/components/quote/quote-form";
import { getShop, telHref } from "@/lib/shops";

const steps = ["Send two photos: the whole wheel, and a close-up", "Get a written price by text or email", "Book a time and hold it with a deposit"];
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

// ?wheels=&size=&finish=&damage= carries the picks from the website's hero panel into the form.
export default async function DemoQuote({ params, searchParams }: PageProps<"/demo/[shop]/quote">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const q = await searchParams;
  const mobile = shop.kind === "mobile";
  const base = `/demo/${shop.slug}`;
  const initial = {
    wheels: one(q.wheels),
    size: one(q.size),
    finish: one(q.finish),
    damage: one(q.damage)?.split(",").filter(Boolean),
  };

  return (
    <>
      <SiteNav
        home={base}
        shopName={shop.name}
        tagline={`${mobile ? "Mobile wheel repair" : "Wheel repair"} · ${shop.city}`}
        phone={shop.phone}
        phoneHref={shop.phone ? telHref(shop.phone) : undefined}
        quote={`${base}/quote`}
      />
      <main className="mx-auto grid max-w-[1280px] gap-10 px-5 py-10 md:px-8 md:py-14 lg:grid-cols-12 lg:gap-14 lg:py-20">
        <section className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <h1 className="text-[clamp(2.4rem,5vw,4.2rem)] leading-[1] font-light tracking-[-0.04em] text-ink">
              Send a photo.
              <br />
              Get a <span className="shop-serif">price</span>.
            </h1>
            <p className="mt-6 max-w-[40ch] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-relaxed text-ink-2">
              Show {shop.name} the damage from your phone. No need to {mobile ? "book a visit" : "drive in"} just to find out what it costs.
            </p>

            <ul className="mt-8 grid gap-3 border-t border-line pt-8 text-[15px] text-ink">
              {[...shop.highlights, ...steps].map((t) => (
                <li key={t} className="flex items-center gap-3">
                  <span className="size-2 shrink-0 rounded-[2px] bg-accent" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lg:col-span-7">
          <QuoteForm slug={shop.slug} shopName={shop.name} mobile={mobile} initial={initial} />
        </section>
      </main>
      <ShopFooter shop={shop} />
    </>
  );
}
