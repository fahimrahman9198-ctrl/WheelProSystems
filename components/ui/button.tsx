import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = ComponentProps<"a"> & { children: ReactNode };

/** Signature button: black block with a cut corner, blue arrow square, then the label. */
export function ArrowButton({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`group inline-flex h-[52px] items-center gap-3.5 bg-ink py-1.5 pr-7 pl-1.5 text-[16px] font-semibold text-white transition-colors duration-[240ms] hover:bg-[#1c1c1f] active:scale-[0.98] ${className}`}
    >
      <span className="grid size-10 place-items-center bg-accent text-white transition-transform duration-[240ms] ease-out-expo group-hover:scale-[1.04]">
        <ArrowRight size={18} strokeWidth={1.75} className="transition-transform duration-[240ms] ease-out-expo group-hover:translate-x-[3px]" />
      </span>
      {children}
    </a>
  );
}

export function SolidButton({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex h-11 items-center justify-center bg-ink px-6 text-[15px] font-medium text-white transition-[background,transform] duration-[240ms] hover:-translate-y-px hover:bg-[#27272a] active:scale-[0.98] ${className}`}
    >
      {children}
    </a>
  );
}

export function GhostLink({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex items-center gap-1.5 text-[16px] font-medium text-ink underline decoration-line-strong decoration-1 underline-offset-[0.3em] transition-colors hover:decoration-ink ${className}`}
    >
      {children}
    </a>
  );
}
