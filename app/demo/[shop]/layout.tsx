import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { DemoChrome } from "@/components/demo/demo-chrome";
import { getShop, shops } from "@/lib/shops";

// Only the shops in lib/shops.ts get a demo; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return shops.map((s) => ({ shop: s.slug }));
}

export async function generateMetadata({ params }: LayoutProps<"/demo/[shop]">): Promise<Metadata> {
  const shop = getShop((await params).shop);
  if (!shop) return {};
  const title = `${shop.name} · Demo by WheelPro Systems`;
  const description = `The website, quote system and admin panel WheelPro would build for ${shop.name}.`;
  return {
    title,
    description,
    // Never in search results: it's a private demo with their name on it.
    robots: { index: false, follow: false },
    openGraph: { title, description, type: "website" },
  };
}

export default async function DemoLayout({ children, params }: LayoutProps<"/demo/[shop]">) {
  const shop = getShop((await params).shop);
  if (!shop) notFound();
  const style = shop.accent ? ({ "--accent": shop.accent } as CSSProperties) : undefined;

  return (
    <div style={style} className="min-h-dvh pb-24">
      <DemoChrome slug={shop.slug} shopName={shop.name} />
      {children}
    </div>
  );
}
