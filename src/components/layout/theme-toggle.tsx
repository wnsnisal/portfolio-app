"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

/**
 * Flips the theme via next-themes, which updates the `dark` class on <html> and
 * persists the choice. Both icons are always rendered and swapped with CSS (the
 * `dark` variant), so there is no hydration mismatch and no mount flicker.
 */
export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label="Toggle light and dark theme"
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), className)}
    >
      <Sun className="hidden dark:block" aria-hidden />
      <Moon className="dark:hidden" aria-hidden />
    </button>
  );
}
