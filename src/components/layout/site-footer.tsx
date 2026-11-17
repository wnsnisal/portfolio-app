import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { navItems } from "@/data/navigation";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

export async function SiteFooter() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-30 lg:bg-background/85 lg:backdrop-blur">
      <Container className="flex flex-col items-center gap-6 py-8 text-center lg:grid lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:py-[30px] lg:text-left">
        <div className="order-1 lg:order-none">
          <p className="font-semibold">
            {profile.firstName}{" "}
            <span className="text-primary">{profile.lastName}</span>
          </p>
          <p className="mt-1 hidden text-sm text-muted-foreground lg:block">
            © {year} {profile.fullName}. All rights reserved.
          </p>
        </div>

        <nav aria-label="Footer" className="order-2 lg:order-none">
          <ul className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {navItems.map((item) => (
              <li key={item.id}>
                <Link
                  href={`#${item.id}`}
                  className="rounded-sm transition-colors hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <p className="order-3 text-sm text-muted-foreground lg:hidden">
          © {year} {profile.fullName}. All rights reserved.
        </p>

        <Link
          href="#home"
          aria-label="Back to top"
          className={cn(
            buttonVariants({ variant: "outline", size: "icon" }),
            "hidden size-12 rounded-full lg:ml-auto lg:inline-flex",
          )}
        >
          <ArrowUp aria-hidden />
        </Link>
      </Container>
    </footer>
  );
}
