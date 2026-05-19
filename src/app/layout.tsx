import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { StickyAuditCTA } from "@/components/site/StickyAuditCTA";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "AI Booking Systems for Wheel Repair & Rim Refinishing Shops | WheelPro Systems",
    template: "%s | WheelPro Systems",
  },
  description:
    "WheelPro Systems builds AI-powered quote forms, booking flows, deposit collection, dashboards, and follow-up automation for wheel repair and rim refinishing businesses.",
  keywords: [
    "WheelPro Systems",
    "AI booking systems for wheel repair shops",
    "wheel shop automation",
    "wheel repair booking system",
    "rim repair quote system",
    "rim repair website",
    "wheel refinishing automation",
    "dealer portal for wheel repair",
    "mobile service business dashboard",
    "quote-to-booking system",
    "service business automation",
  ],
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.agencyName,
  publisher: siteConfig.agencyName,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.agencyName,
    title: "AI Booking Systems for Wheel Repair & Rim Refinishing Shops",
    description:
      "AI-powered quote forms, booking flows, deposit collection, dashboards, dealer portals, and follow-up automation for wheel repair businesses.",
    images: [{ url: "/images/logo.PNG", width: 443, height: 400, alt: "WheelPro Systems logo" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Booking Systems for Wheel Repair Shops",
    description:
      "Photo quotes, booking, deposits, dashboards, dealer portals, and follow-up automation for wheel repair shops.",
    images: ["/images/logo.PNG"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.agencyName,
    url: siteConfig.url,
    email: siteConfig.email,
    description:
      "AI booking, quote, dashboard, and automation systems for wheel repair and refinishing businesses.",
    founder: {
      "@type": "Person",
      name: siteConfig.founder,
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.agencyName,
    url: siteConfig.url,
    description:
      "AI-powered booking systems, quote workflows, dashboards, and automation for wheel repair businesses.",
  },
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Booking Systems for Wheel Repair Shops",
    provider: {
      "@type": "Organization",
      name: siteConfig.agencyName,
      url: siteConfig.url,
    },
    areaServed: ["Canada", "United States"],
    serviceType: [
      "Website development",
      "Booking automation",
      "Quote workflow automation",
      "Dashboard systems",
      "AI business automation",
    ],
    description:
      "AI-powered quote forms, booking flows, deposit collection, dashboards, dealer portals, and follow-up automation for wheel repair and refinishing businesses.",
  },
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: siteConfig.agencyName,
    url: siteConfig.url,
    email: siteConfig.email,
    areaServed: ["Canada", "United States"],
    description:
      "Specialized AI systems agency for wheel repair, rim repair, mobile wheel repair, and wheel refinishing businesses.",
  },
];

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-[#05070D] text-[#F5F7FA] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <StickyAuditCTA />
        <Footer />
      </body>
    </html>
  );
}
