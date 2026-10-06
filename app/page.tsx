import { Book } from "@/components/book/book";
import { CaseStudy } from "@/components/case-study";
import { Faq } from "@/components/faq";
import { Hero } from "@/components/hero/hero";
import { Logo, Nav } from "@/components/nav";
import { Deck } from "@/components/deck";
import { Services } from "@/components/services/services";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Services />
        <Deck />
        <CaseStudy />
        <Faq />
        <Book />
      </main>
      <footer className="border-t border-line py-10">
        <div className="wrap flex flex-col gap-6 text-[14px] text-ink-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <Logo />
            <span>Built only for wheel refinishers.</span>
          </div>
          <p>© 2026 WheelPro Systems · Sample jobs, names and prices on this page are illustrative.</p>
        </div>
      </footer>
    </>
  );
}
