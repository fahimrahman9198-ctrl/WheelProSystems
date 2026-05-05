import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Conditionally merges Tailwind CSS classes without style conflicts.
 * Uses clsx for conditional class joining, then tailwind-merge to
 * resolve conflicting utility classes.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}