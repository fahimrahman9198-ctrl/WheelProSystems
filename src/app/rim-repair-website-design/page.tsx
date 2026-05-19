import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/site/SeoLandingPage";
import { seoLandingPages } from "@/lib/site";

const page = seoLandingPages["rim-repair-website-design"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/rim-repair-website-design" },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/rim-repair-website-design", siteName: "WheelPro Systems", type: "website" },
  twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <SeoLandingPage slug="rim-repair-website-design" />;
}
