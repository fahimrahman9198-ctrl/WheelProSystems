import { Phone } from "lucide-react";
import Link from "next/link";
import { type Shop, telHref } from "@/lib/shops";

export const shopInitials = (name: string) =>
  name
    .replace(/^The /, "")
    .split(/\s+/)
    .slice(0, 2)
    .map((w) => w[0])
    .join("");

/** The shop's own header, shared by their demo website and quote page. */
export function ShopHeader({ shop, links = false }: { shop: Shop; links?: boolean }) {
  const base = `/demo/${shop.slug}`;
  return (
    <header className="border-b border-line">
      <div className="wrap flex h-[72px] items-center justify-between gap-4">
        <Link href={base} className="flex min-w-0 items-center gap-3">
          <span className="grid size-10 shrink-0 place-items-center rounded-md bg-ink text-[15px] font-semibold tracking-tight text-white">
            {shopInitials(shop.name)}
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[16px] leading-tight font-semibold text-ink">{shop.name}</span>
            <span className="block text-[13px] text-ink-3">
              {shop.kind === "mobile" ? "Mobile wheel repair" : "Wheel repair"} · {shop.city}, {shop.province}
            </span>
          </span>
        </Link>
        <div className="flex shrink-0 items-center gap-2">
          {links && (
            <nav className="mr-4 hidden items-center gap-6 text-[15px] text-ink-2 lg:flex">
              <a href="#services" className="hover:text-ink">Services</a>
              <a href="#how" className="hover:text-ink">How it works</a>
              <a href="#contact" className="hover:text-ink">Contact</a>
            </nav>
          )}
          {shop.phone && (
            <a
              href={telHref(shop.phone)}
              className="inline-flex h-10 items-center gap-2 rounded-md border border-line-strong px-3.5 text-[15px] font-medium text-ink transition-colors hover:border-ink"
            >
              <Phone size={16} strokeWidth={1.75} />
              <span className="hidden sm:inline">{shop.phone}</span>
              <span className="sm:hidden">Call</span>
            </a>
          )}
          {links && (
            <Link href={`${base}/quote`} className="hidden h-10 items-center rounded-md bg-ink px-4 text-[15px] font-medium text-white hover:bg-[#27272a] sm:inline-flex">
              Get a price
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
