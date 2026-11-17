import { ArrowRight, Download, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { socialIcons } from "@/components/ui/icons";
import { HeroVisual } from "@/components/sections/hero-visual";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

export function Hero() {
  return (
    <section aria-labelledby="hero-heading" className="w-full overflow-hidden">
      <Container className="grid items-center gap-8 pt-4 pb-10 lg:grid-cols-[1fr_440px] lg:gap-12 lg:pt-4 lg:pb-4">
        <div className="order-last flex flex-col items-center text-center lg:order-first lg:items-start lg:text-left">
          <p className="inline-flex items-center gap-2.5 rounded-full border bg-card px-4 py-2 text-md text-muted-foreground">
            <span className="relative flex size-2" aria-hidden>
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75 motion-reduce:hidden" />
              <span className="relative inline-flex size-2 rounded-full bg-success" />
            </span>
            {profile.availability}
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-[2.5rem] leading-[1.15] font-bold tracking-tight lg:text-[4.5rem] lg:leading-[1.14]"
          >
            {profile.firstName}{" "}
            <span className="text-primary">{profile.lastName}</span>
          </h1>
          <p className="mt-5 text-lg font-medium sm:text-xl lg:text-[1.75rem]">
            {profile.role}{" "}
          </p>
          <p className="mt-5 max-w-135 text-lg leading-8 text-muted-foreground lg:text-xl">
            {profile.intro}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href="#contact"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Hire me
              <ArrowRight aria-hidden />
            </a>
            <a
              href="#projects"
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              Projects
              <LayoutGrid aria-hidden />
            </a>
          </div>

          <div className="mt-6 flex items-center gap-3 text-muted-foreground">
            <span className="text-md">Find me on</span>
            <ul className="flex gap-0">
              {socials.map((social) => {
                const Icon = socialIcons[social.name];
                return (
                  <li key={social.name}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${social.name} (opens in a new tab)`}
                      className={cn(
                        buttonVariants({ variant: "ghost", size: "icon" }),
                        "[&_svg]:size-6",
                      )}
                    >
                      <Icon />
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        <div className="order-first lg:order-last">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
