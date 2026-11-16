import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { buttonVariants } from "@/components/ui/button";
import { about } from "@/data/about";

export function About() {
  return (
    <section id="about" aria-labelledby="about-heading">
      <SectionHeading id="about-heading">About me</SectionHeading>
      <div className="mt-4 space-y-4 leading-[26px] text-muted-foreground">
        {about.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <a href="#" className={buttonVariants({ variant: "outline", size: "sm", className: "mt-6" })}>
        More about me
        <ArrowRight aria-hidden />
      </a>
    </section>
  );
}
