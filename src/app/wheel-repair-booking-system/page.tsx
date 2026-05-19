import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/site/SeoLandingPage";
import { seoLandingPages } from "@/lib/site";

const page = seoLandingPages["wheel-repair-booking-system"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/wheel-repair-booking-system" },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/wheel-repair-booking-system", siteName: "WheelPro Systems", type: "website" },
  twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <SeoLandingPage slug="wheel-repair-booking-system" />;
}
