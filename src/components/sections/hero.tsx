import Image from "next/image";
import { ArrowRight, LayoutGrid } from "lucide-react";
import { Container } from "@/components/ui/container";
import { buttonVariants } from "@/components/ui/button";
import { socialIcons } from "@/components/ui/icons";
import { profile } from "@/data/profile";
import { socials } from "@/data/socials";
import { cn } from "@/lib/utils";

function HeroVisual() {
  return (
    <div className="relative mx-auto h-[300px] w-[260px] lg:h-[440px] lg:w-[440px]">
      <div className="absolute top-0 left-2.5 size-60 rounded-full bg-gradient-to-b from-[#7c6dfb] to-[#4a3dc2] lg:left-[50px] lg:size-[380px]">
        {(["light", "dark"] as const).map((theme) => (
          <Image
            key={theme}
            src={profile.photo[theme]}
            width={profile.photo.width}
            height={profile.photo.height}
            alt={`Portrait of ${profile.fullName}`}
            priority
            className={cn(
              "absolute top-[13px] left-2 z-10 h-[341px] w-[225px] max-w-none rounded-b-[120px] object-cover object-top lg:-top-[33px] lg:-left-[31px] lg:h-[536px] lg:w-[400px] lg:rounded-none",
              theme === "light" ? "dark:hidden" : "hidden dark:block",
            )}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="absolute top-7 left-7 size-[90px] bg-[radial-gradient(circle,var(--muted-foreground)_1.5px,transparent_1.5px)] [background-size:15px_15px] opacity-40 lg:top-[9px] lg:left-[27px] lg:size-[111px]"
      />
      <div className="absolute top-[70px] left-0 z-20 hidden rounded-xl border bg-card/90 px-[19px] py-[15px] backdrop-blur lg:block">
        <p className="text-2xl leading-[29px] font-bold text-link">
          {profile.yearsExperience}
        </p>
        <p className="text-sm text-muted-foreground">Years experience</p>
      </div>
      <div className="absolute top-[362px] left-[264px] z-20 hidden rounded-xl border bg-card/90 px-[19px] py-[15px] backdrop-blur lg:block">
        <p className="text-lg leading-6 font-semibold">{profile.coreStack}</p>
        <p className="text-sm text-muted-foreground">Core stack</p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className="overflow-hidden"
    >
      <Container className="grid items-center gap-8 pt-4 pb-10 lg:grid-cols-[1fr_440px] lg:gap-12 lg:pt-10 lg:pb-12">
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
