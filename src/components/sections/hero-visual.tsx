import { type ReactNode } from "react";
import Image from "next/image";
import { Parallax } from "@/components/ui/parallax";
import { profile } from "@/data/profile";
import { cn } from "@/lib/utils";

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
        "rounded-xl border bg-card/90 px-[19px] py-[15px] backdrop-blur",
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
 * drift at different speeds on scroll to create depth. Rendered on the client
 * because of the parallax; the data is still static.
 */
export function HeroVisual() {
  return (
    <div>
      <div className="relative mx-auto h-[300px] w-[260px] lg:h-[480px] lg:w-[440px]">
        <Parallax
          axis="x"
          speed={-0.08}
          className="absolute top-10 left-2.5 size-60 rounded-full bg-gradient-to-b from-[#fff] to-[#b1a9ff] lg:left-[10px] lg:size-[430px] dark:from-[#7c6dfb] dark:to-[#4a3dc2]"
        >
          
        </Parallax>
        {(["light", "dark"] as const).map((theme) => (
          <Image
            key={theme}
            src={profile.photo[theme]}
            width={profile.photo.width}
            height={profile.photo.height}
            alt={`Portrait of ${profile.fullName}`}
            priority
            className={cn(
              "absolute top-5 left-5 z-10 h-[341px] w-[225px] max-w-none rounded-b-[120px] object-cover object-top lg:-top-[20px] lg:left-[15px] lg:h-[536px] lg:w-[400px] lg:rounded-none",
              theme === "light" ? "dark:hidden" : "hidden dark:block",
            )}
          />
        ))}
        <Parallax
          axis="x"
          speed={-0.12}
          aria-hidden
          className="absolute top-7 left-7 size-[90px] bg-[radial-gradient(circle,var(--muted-foreground)_1.5px,transparent_1.5px)] opacity-40 [background-size:15px_15px] lg:top-[9px] lg:left-[27px] lg:size-[111px]"
        />
        <Parallax
          axis="x"
          speed={-0.2}
          className="absolute top-[70px] left-0 z-20 hidden lg:block"
        >
          <StatCard {...yearsCard} />
        </Parallax>
        <Parallax
          axis="x"
          speed={-0.14}
          className="absolute top-[362px] left-[264px] z-20 hidden lg:block"
        >
          <StatCard {...stackCard} />
        </Parallax>
      </div>

      {/* The floating cards are hidden below lg; show them under the photo. */}
      <div className="mt-6 grid grid-cols-2 gap-3 lg:hidden">
        <StatCard {...yearsCard} />
        <StatCard {...stackCard} />
      </div>
    </div>
  );
}
