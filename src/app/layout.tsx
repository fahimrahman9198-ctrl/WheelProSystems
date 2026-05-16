import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "WheelPro Systems | AI Systems for Service Businesses",
    template: "%s | WheelPro Systems",
  },
  description:
    "AI-powered booking, quote, payment, and automation systems for service businesses. Stop losing leads to slow follow-up and manual workflows.",
  keywords: [
    "AI booking system for service businesses",
    "wheel refinishing automation",
    "mobile service business software",
    "quote to booking system",
    "service business dashboard",
    "mobile detailing booking system",
    "fleet service management",
  ],
  authors: [{ name: "Fahim Rahman" }],
  creator: "WheelPro Systems",
  publisher: "WheelPro Systems",
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "WheelPro Systems",
    title: "WheelPro Systems | AI Systems for Service Businesses",
    description:
      "AI-powered booking, quote, payment, and automation systems for service businesses. Stop losing leads to slow follow-up and manual workflows.",
  },
  twitter: {
    card: "summary_large_image",
    title: "WheelPro Systems | AI Systems for Service Businesses",
    description:
      "AI-powered systems for service businesses. Quote, booking, payment, dashboards, and automation.",
  },
  robots: { index: true, follow: true },
  icons: { icon: [{ url: "/favicon.ico", sizes: "any" }] },
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
        {children}
      </body>
    </html>
  );
}
