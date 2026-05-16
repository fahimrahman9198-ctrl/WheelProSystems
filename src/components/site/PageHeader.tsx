import { CTAButton } from "@/components/site/CTAButton";

type PageHeaderProps = {
  eyebrow: string;
  title: string;
  copy: string;
  cta?: string;
};

export function PageHeader({ eyebrow, title, copy, cta }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-lab-950 px-4 py-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(47,140,255,0.18),transparent_34%)]" />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">{eyebrow}</p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold leading-tight text-white md:text-6xl">
          {title}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-steel-300">{copy}</p>
        {cta && (
          <div className="mt-8">
            <CTAButton href="/book">{cta}</CTAButton>
          </div>
        )}
      </div>
    </section>
  );
}
