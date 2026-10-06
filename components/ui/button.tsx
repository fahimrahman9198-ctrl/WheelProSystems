import { ArrowRight } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type LinkProps = ComponentProps<"a"> & { children: ReactNode };

/** Signature button: black block, bronze arrow square, then the label. */
export function ArrowButton({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`group inline-flex h-[52px] items-center gap-3.5 rounded-md bg-ink py-1.5 pr-7 pl-1.5 text-[16px] font-semibold text-white transition-colors duration-[240ms] hover:bg-[#1c1c1f] active:scale-[0.98] ${className}`}
    >
      {/* On hover the arrow slides out to the right and a second one slides in from the left. */}
      <span className="relative grid size-10 place-items-center overflow-hidden rounded-sm bg-accent text-white">
        <ArrowRight size={18} strokeWidth={1.75} className="transition-transform duration-[420ms] ease-out-expo group-hover:translate-x-[200%] motion-reduce:transition-none motion-reduce:group-hover:translate-x-0" />
        <ArrowRight
          size={18}
          strokeWidth={1.75}
          aria-hidden="true"
          className="absolute -translate-x-[200%] transition-transform duration-[420ms] ease-out-expo group-hover:translate-x-0 motion-reduce:hidden"
        />
      </span>
      {children}
    </a>
  );
}

export function SolidButton({ children, className = "", ...props }: LinkProps) {
  return (
    <a
      {...props}
      className={`inline-flex h-11 items-center justify-center rounded-md bg-ink px-6 text-[15px] font-medium text-white transition-[background,transform] duration-[240ms] hover:-translate-y-px hover:bg-[#27272a] active:scale-[0.98] ${className}`}
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
