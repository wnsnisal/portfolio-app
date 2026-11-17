"use client";

import { ThemeProvider } from "next-themes";

/**
 * App-wide theme state via next-themes. `attribute="class"` puts `class="dark"`
 * on <html> (matched by the `dark` Tailwind variant in globals.css). next-themes
 * injects its own pre-paint script, so there is no flash and no separate
 * ThemeScript is needed. Dark is the default; the system preference is ignored.
 */
export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem={false}
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  );
}
