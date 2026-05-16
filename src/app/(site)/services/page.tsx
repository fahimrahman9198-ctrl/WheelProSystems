import type { Metadata } from "next";
import Image from "next/image";
import { BookingCTA } from "@/components/site/BookingCTA";
import { ServicesIntro } from "./ServicesIntro";

export const metadata: Metadata = {
  title: "Services",
  description:
    "WheelPro Systems builds connected digital systems for mobile service businesses — quotes, booking, payments, dashboards, and follow-up in one workflow.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pt-32">
        <div className="absolute inset-0 -z-10">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1920&q=70"
            alt="Mobile mechanic working under the hood of a vehicle"
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[rgba(5,7,13,0.85)] via-[rgba(5,7,13,0.8)] to-[rgba(5,7,13,0.95)]" />
        <ServicesIntro />
      </section>
      <BookingCTA
        title="Want to see if our system fits your business?"
        copy="A focused 20-minute call to review your quote, booking, and follow-up process."
      />
    </>
  );
}
