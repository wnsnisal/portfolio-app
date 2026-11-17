"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { useActiveSection } from "@/hooks/use-active-section";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

const sectionIds = navItems.map((item) => item.id);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const activeId = useActiveSection(sectionIds);

  useEffect(() => {
    if (!menuOpen) return;
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/85 backdrop-blur">
      <Container className="flex h-24 items-center justify-between lg:h-24">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  aria-current={activeId === item.id ? "true" : undefined}
                  className={cn(
                    "rounded-sm text-md transition-colors hover:text-foreground",
                    activeId === item.id
                      ? "text-link"
                      : "text-muted-foreground",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle className="size-12 [&_svg]:size-5" />
          <a
            href={profile.cvPath}
            download
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "hidden lg:inline-flex",
            )}
          >
            Download CV
            <Download aria-hidden />
          </a>
          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "size-12 [&_svg]:size-6 lg:hidden",
            )}
          >
            {menuOpen ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
      </Container>

      <div
        id="mobile-menu"
        hidden={!menuOpen}
        className="border-t border-border/60 lg:hidden"
      >
        <Container className="py-4">
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navItems.map((item) => (
                <li key={item.id}>
                  <Link
                    href={`#${item.id}`}
                    onClick={() => setMenuOpen(false)}
                    aria-current={activeId === item.id ? "true" : undefined}
                    className={cn(
                      "flex h-14 items-center rounded-md px-2 text-lg transition-colors hover:text-foreground",
                      activeId === item.id
                        ? "text-link"
                        : "text-muted-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <a
            href={profile.cvPath}
            download
            className={cn(buttonVariants({ variant: "outline" }), "mt-3 w-full")}
          >
            Download CV
            <Download aria-hidden />
          </a>
        </Container>
      </div>
    </header>
  );
}
