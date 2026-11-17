import { cacheLife } from "next/cache";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";

export async function SiteFooter() {
  "use cache";
  cacheLife("days");
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border lg:fixed lg:inset-x-0 lg:bottom-0 lg:z-30 lg:bg-background/85 lg:backdrop-blur">
      <Container className="flex flex-col items-center gap-3 py-5 text-center sm:flex-row sm:justify-between sm:gap-4 sm:py-3.5 sm:text-left">
        <p className="text-sm text-muted-foreground">
          © {year}{" "}
          <span className="font-medium text-foreground">
            {profile.fullName}
          </span>
          . All rights reserved.
        </p>

        <ul className="flex items-center gap-1">
          {socials.map((social) => {
            const Icon = socialIcons[social.name];
            return (
              <li key={social.name}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${social.name} (opens in a new tab)`}
                  className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-muted hover:text-foreground [&_svg]:size-[18px]"
                >
                  <Icon />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </footer>
  );
}
