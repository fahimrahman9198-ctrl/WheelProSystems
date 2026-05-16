import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    default: "WheelPro Demo | Interactive Wheel Repair Business System Demo",
    template: "%s | WheelPro Demo",
  },
  description:
    "WheelPro Demo is a fictional interactive demo by WheelPro Systems showing quote, booking, payment, dashboard, dealer portal, and automation workflows for wheel repair and mobile service businesses.",
  keywords: [
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
    siteName: siteConfig.demoName,
    title: "WheelPro Demo | Interactive Wheel Repair Business System Demo",
    description:
      "A fictional demo environment showing quote, booking, payment, dashboard, dealer portal, and automation workflows for wheel repair businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelPro Demo | Interactive Wheel Repair Business System Demo",
    description:
      "Interactive fictional demo by WheelPro Systems for wheel repair and mobile service business workflows.",
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
  },
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
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
