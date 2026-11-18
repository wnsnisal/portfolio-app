"use client";

import { type ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { Parallax } from "@/components/ui/parallax";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

/**
 * Number of <Image> elements rendered below (desktop light+dark and mobile
 * light+dark). The composition is revealed once all of them have settled.
 * Off-breakpoint and hidden-theme images are `display:none` but still load and
 * fire their events, so counting all four is safe on any theme/viewport.
 */
const PORTRAIT_IMAGE_COUNT = 4;

/** Safety net: reveal anyway if an image event is somehow never delivered. */
const REVEAL_FALLBACK_MS = 4000;

/**
 * A labelled stat card. Reused in two places: as a floating overlay on the
 * photo (lg+) and as a static row beneath the photo on smaller screens, where
 * the floating overlays are hidden.
 */
function StatCard({
  value,
  label,
  valueClassName,
  className,
}: {
  value: ReactNode;
  label: string;
  valueClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-[19px] py-[15px]",
        className,
      )}
    >
      <p className={valueClassName}>{value}</p>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

const yearsCard = {
  value: profile.yearsExperience,
  label: "Years experience",
  valueClassName: "text-2xl leading-[29px] font-bold text-link",
};
const stackCard = {
  value: profile.coreStack,
  label: "Core stack",
  valueClassName: "text-lg leading-6 font-semibold",
};

/**
 * Hero portrait composition. The photo, dot pattern and floating stat cards
 * drift at different speeds on scroll to create depth. Client component: the
 * whole composition is held hidden until the portrait images have loaded, then
 * revealed with a gsap elastic "bump". The data is still static.
 */
export function HeroVisual() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [settledCount, setSettledCount] = useState(0);
  const onImageSettled = useCallback(
    () => setSettledCount((c) => c + 1),
    [],
  );

  // Fallback: don't stay invisible forever if an event never arrives.
  useEffect(() => {
    const timer = setTimeout(
      () => setSettledCount((c) => Math.max(c, PORTRAIT_IMAGE_COUNT)),
      REVEAL_FALLBACK_MS,
    );
    return () => clearTimeout(timer);
  }, []);

  // Reveal + bump once every image has settled.
  useEffect(() => {
    if (settledCount < PORTRAIT_IMAGE_COUNT) return;
    const el = rootRef.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduceMotion) {
      gsap.set(el, { opacity: 1, clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.9,
          ease: "elastic.out(1, 0.6)",
          clearProps: "transform",
        },
      );
    }, el);
    return () => ctx.revert();
  }, [settledCount]);

  return (
    <div ref={rootRef} style={{ opacity: 0 }}>
      {/* Desktop (lg+): the full composed portrait design. Hidden on mobile. */}
      <div className="relative mx-auto hidden h-[300px] w-[260px] lg:block lg:h-[480px] lg:w-[440px]">
        <Parallax
          axis="x"
          speed={-0.08}
          className="absolute top-25 left-2.5 size-60 rounded-full bg-gradient-to-b from-[#fff] to-[#b1a9ff] lg:left-[10px] lg:size-[430px] dark:from-[#7c6dfb] dark:to-[#4a3dc2]"
        >
          
        </Parallax>
        <Parallax
          axis="x"
          speed={-0.3}
        >
        {(["light", "dark"] as const).map((theme) => (
          <Image
            key={theme}
            src={profile.photo[theme]}
            width={profile.photo.width}
            height={profile.photo.height}
            alt={`Portrait of ${profile.fullName}`}
            priority
            onLoad={onImageSettled}
            onError={onImageSettled}
            className={cn(
              "absolute top-5 left-5 z-10 h-[341px] w-[225px] max-w-none rounded-b-[120px] object-cover object-top lg:top-0 lg:left-[15px] lg:h-[546px] lg:w-[420px] lg:rounded-none",
              theme === "light" ? "dark:hidden" : "hidden dark:block",
            )}
          />
        ))}
        </Parallax>
        <Parallax
          axis="x"
          speed={-0.2}
          aria-hidden
          className="absolute top-7 left-7 size-[90px] bg-[radial-gradient(circle,var(--muted-foreground)_1.5px,transparent_1.5px)] opacity-40 [background-size:15px_15px] lg:top-[9px] lg:left-[27px] lg:size-[111px]"
        />
        <Parallax
          axis="x"
          speed={-0.5}
          className="absolute top-[70px] left-0 z-15 hidden lg:block"
        >
          <StatCard {...yearsCard} className="bg-card/90 backdrop-blur" />
        </Parallax>
        <Parallax
          axis="x"
          speed={-0.6}
          className="absolute top-[362px] left-[264px] z-15 hidden lg:block"
        >
          <StatCard {...stackCard} className="bg-card/90 backdrop-blur" />
        </Parallax>
      </div>

      {/* Mobile (below lg): a standalone circular portrait sitting on the same
          gradient circle used on desktop — identical colors. */}
      <div className="relative mx-auto flex h-[300px] w-[260px] items-center justify-center lg:hidden">

        <div
          style={{ top: "50px" }}
          className="absolute top-60 left-2.5 size-60 rounded-full bg-gradient-to-b from-[#fff] to-[#b1a9ff] lg:left-[10px] lg:size-[430px] dark:from-[#7c6dfb] dark:to-[#4a3dc2]"
        >
          
        </div>
        {(["light", "dark"] as const).map((theme) => (
          <Image
            key={theme}
            src={profile.photoMobile[theme]}
            width={profile.photoMobile.width}
            height={profile.photoMobile.height}
            alt={`Portrait of ${profile.fullName}`}
            priority
            onLoad={onImageSettled}
            onError={onImageSettled}
            className={cn(
              "absolute rounded-full top-0 left-0 z-10 h-[361px] w-[300px] max-w-none object-cover object-top lg:top-0",
              theme === "light" ? "dark:hidden" : "hidden dark:block",
            )}
          />
        ))}
        
        <Parallax
          axis="x"
          speed={-0.2}
          aria-hidden
          className="absolute z-0 top-7 left-7 size-[90px] bg-[radial-gradient(circle,var(--muted-foreground)_1.5px,transparent_1.5px)] opacity-40 [background-size:15px_15px] lg:top-[9px] lg:left-[27px] lg:size-[111px]"
        />
      </div>

      {/* The floating cards are hidden below lg; show them under the photo. */}
      <div className="z-15 relative mt-6 grid grid-cols-2 gap-3 lg:hidden">
        <StatCard {...yearsCard} className="bg-card" />
        <StatCard {...stackCard} className="bg-card" />
      </div>
    </div>
  );
}
