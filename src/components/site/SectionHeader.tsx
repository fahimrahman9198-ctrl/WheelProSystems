import { cn } from "@/lib/utils";

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  copy?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeader({
  eyebrow,
  title,
  copy,
  align = "left",
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.18em] text-cyan-300">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-semibold leading-tight text-white md:text-5xl">{title}</h2>
      {copy && <p className="mt-4 text-base leading-7 text-steel-300 md:text-lg">{copy}</p>}
    </div>
  );
}
