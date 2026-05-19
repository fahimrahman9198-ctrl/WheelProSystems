import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "WheelPro Systems | AI Booking & Automation Systems for Mobile Service Businesses",
    template: "%s | WheelPro Systems",
  },
  description:
    "WheelPro Systems builds AI-powered websites, quote flows, booking systems, payment integrations, dashboards, and automation workflows for mobile service businesses.",
  keywords: [
    "WheelPro Systems",
    "AI systems for mobile service businesses",
    "AI automation for service businesses",
    "wheel repair booking system",
    "rim repair quote system",
    "mobile wheel repair website",
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
    title: "WheelPro Systems | AI Booking & Automation Systems for Mobile Service Businesses",
    description:
      "AI-powered websites, quote tools, booking flows, payment integrations, dashboards, portals, and automation systems for mobile service businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelPro Systems | AI Booking & Automation Systems",
    description:
      "WheelPro Systems builds connected quote, booking, payment, dashboard, portal, and automation systems for mobile service businesses.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: siteConfig.agencyName,
  url: siteConfig.url,
  email: siteConfig.email,
  founder: {
    "@type": "Person",
    name: siteConfig.founder,
  },
  description:
    "AI-powered websites, quote flows, booking systems, payment integrations, dashboards, portals, and automation workflows for mobile service businesses.",
  areaServed: "North America",
  serviceType: [
    "AI-powered websites",
    "Booking systems",
    "Quote workflows",
    "Payment integrations",
    "Business dashboards",
    "Automation workflows",
    "Client and dealer portals",
  ],
};

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
        <Footer />
      </body>
    </html>
  );
}
