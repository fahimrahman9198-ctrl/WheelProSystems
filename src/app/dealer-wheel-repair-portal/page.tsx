import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/site/SeoLandingPage";
import { seoLandingPages } from "@/lib/site";

const page = seoLandingPages["dealer-wheel-repair-portal"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/dealer-wheel-repair-portal" },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/dealer-wheel-repair-portal", siteName: "WheelPro Systems", type: "website" },
  twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <SeoLandingPage slug="dealer-wheel-repair-portal" />;
}
