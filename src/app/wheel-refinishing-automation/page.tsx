import type { Metadata } from "next";
import { SeoLandingPage } from "@/components/site/SeoLandingPage";
import { seoLandingPages } from "@/lib/site";

const page = seoLandingPages["wheel-refinishing-automation"];

export const metadata: Metadata = {
  title: page.metaTitle,
  description: page.metaDescription,
  alternates: { canonical: "/wheel-refinishing-automation" },
  openGraph: { title: page.metaTitle, description: page.metaDescription, url: "/wheel-refinishing-automation", siteName: "WheelPro Systems", type: "website" },
  twitter: { card: "summary_large_image", title: page.metaTitle, description: page.metaDescription },
};

export default function Page() {
  return <SeoLandingPage slug="wheel-refinishing-automation" />;
}
