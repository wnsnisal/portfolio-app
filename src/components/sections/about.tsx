import { Download, GraduationCap } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { buttonVariants } from "@/components/ui/button";
import { about } from "@/data/about";
import { education } from "@/data/education";
import { profile } from "@/data/profile";

export function About() {
  return (
    <section aria-labelledby="about-heading" className="pb-10 lg:pb-0">
      <SectionHeading id="about-heading">About me</SectionHeading>
      <div className="mt-6 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-12 text-lg">
        <div>
          <div className="space-y-4 leading-[26px] text-muted-foreground">
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <a
            href={profile.cvPath}
            download
            className={buttonVariants({
              variant: "outline",
              size: "lg",
              className: "mt-6",
            })}
          >
            Download CV
            <Download aria-hidden />
          </a>
        </div>

        <aside aria-label="Education">
          <Card className="h-full bg-primary/5 p-6 dark:bg-card lg:p-8">
            <div className="flex items-center gap-4">
              <IconBox className="size-11 rounded-lg [&_svg]:size-5 bg-primary/10 dark:bg-primary/5">
                <GraduationCap aria-hidden />
              </IconBox>
              <h3 className="text-lg font-semibold">Education</h3>
            </div>
            <ul className="mt-7 space-y-7">
              {education.map((item) => (
                <li
                  key={item.qualification}
                  className="border-l-2 border-border pl-5"
                >
                  <p className="text-lg font-medium">{item.qualification}</p>
                  <p className="mt-1 text-md text-muted-foreground">
                    {item.institution}
                  </p>
                  {item.detail && (
                    <p className="mt-2.5 inline-flex rounded-md bg-secondary px-2.5 py-1 text-sm font-medium text-link">
                      {item.detail}
                    </p>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </aside>
      </div>
    </section>
  );
}
