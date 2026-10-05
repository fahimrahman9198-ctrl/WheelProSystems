import type { Metadata, Viewport } from "next";
import { Saira_Semi_Condensed } from "next/font/google";
import localFont from "next/font/local";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

const switzer = localFont({
  src: "./fonts/switzer-variable.woff2",
  variable: "--font-switzer",
  weight: "100 900",
  style: "normal",
  display: "swap",
  fallback: ["Arial", "sans-serif"],
});

// Trial display face for headings (free stand-in for Caudion).
const display = Saira_Semi_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WheelPro Systems — One-stop solution for wheel refinishing businesses",
  description:
    "Lead collection, quotes, email follow-ups, invoicing and payments in one system, built only for wheel refinishing shops and mobile techs.",
  openGraph: {
    title: "WheelPro Systems",
    description: "One-stop solution for wheel refinishing businesses.",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#ffffff" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "WheelPro Systems",
  description: "Websites and job systems built only for wheel refinishing businesses.",
  makesOffer: ["Lead collection", "Quotation system", "Email automation", "Invoicing", "Payment integration"].map(
    (name) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name } }),
  ),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${switzer.variable} ${display.variable} antialiased`}>
      <body>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
