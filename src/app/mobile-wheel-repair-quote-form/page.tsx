import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/site/SeoLandingPage";
import { seoLandingPages } from "@/lib/site";

const page = seoLandingPages["mobile-wheel-repair-quote-form"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/mobile-wheel-repair-quote-form" },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/mobile-wheel-repair-quote-form", siteName: "WheelPro Systems", type: "website" },
  twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <SeoLandingPage slug="mobile-wheel-repair-quote-form" />;
}
