import { DemoNavbar } from "@/components/site/DemoNavbar";
import { Footer } from "@/components/site/Footer";

export default function DemoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DemoNavbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
