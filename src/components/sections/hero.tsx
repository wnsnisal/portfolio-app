import { ArrowRight, LayoutGrid } from "lucide-react";
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
          <p className="inline-flex h-[38px] items-center gap-2.5 rounded-full border bg-card px-4 text-sm text-muted-foreground">
            <span className="size-2 rounded-full bg-success" aria-hidden />
            Hello, I&apos;m
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-[2.5rem] leading-[1.15] font-bold tracking-tight lg:text-[4.5rem] lg:leading-[1.14]"
          >
            {profile.firstName}{" "}
            <span className="text-primary">{profile.lastName}</span>
          </h1>
          <p className="mt-5 text-lg font-medium sm:text-xl lg:text-[1.75rem]">
            {profile.role}
          </p>
          <p className="mt-5 max-w-[500px] text-base leading-7 text-muted-foreground lg:text-lg">
            {profile.intro}
          </p>

          <div className="mt-7 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a href="#contact" className={buttonVariants({ variant: "primary" })}>
              Hire Me
              <ArrowRight aria-hidden />
            </a>
            <a
              href="#projects"
              className={buttonVariants({ variant: "outline" })}
            >
              View Projects
              <LayoutGrid aria-hidden />
            </a>
          </div>

          <div className="mt-6 flex items-center gap-4 text-muted-foreground">
            <span className="text-sm">Find me on</span>
            <ul className="flex gap-3">
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
