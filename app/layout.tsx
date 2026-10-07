import type { Metadata, Viewport } from "next";
import { Fragment_Mono, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/smooth-scroll";
import "./globals.css";

// Headlines and body use General Sans (Fontshare, free for commercial use),
// loaded from its CDN in <head> below. These two are the accents:
// Instrument Serif italic for one emphasised word per heading,
// Fragment Mono for small uppercase labels and figures.
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});
const mono = Fragment_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  weight: "400",
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

export const viewport: Viewport = { themeColor: "#fcfbf8" };

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
    <html lang="en" className={`${serif.variable} ${mono.variable} antialiased`}>
      <head>
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link rel="preconnect" href="https://cdn.fontshare.com" crossOrigin="" />
        <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=general-sans@300,400,500,600,700&display=swap" />
      </head>
      <body>
        <SmoothScroll />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </body>
    </html>
  );
}
