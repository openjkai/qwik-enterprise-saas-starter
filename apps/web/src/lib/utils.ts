/**
 * Merge class names (shadcn-style).
 * Use for conditional Tailwind classes.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(" ");
}
