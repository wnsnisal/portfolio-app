import { Briefcase } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section aria-labelledby="experience-heading">
      <SectionHeading id="experience-heading">
        Professional experience
      </SectionHeading>

      <ol className="mt-5 space-y-3.5 lg:mt-6 lg:space-y-4">
        {experience.map((job) => (
          <li key={`${job.company}-${job.role}`}>
            <Card className="bg-primary/5 p-4 transition-colors hover:border-primary/50 dark:bg-card lg:p-5">
              {/* Header: role + company on the left, timeframe on the right */}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-center gap-3">
                  <IconBox className="size-10 bg-primary/10 dark:bg-primary/5 [&_svg]:size-[18px]">
                    <Briefcase aria-hidden />
                  </IconBox>
                  <div>
                    <h3 className="text-lg leading-tight font-semibold">
                      {job.role}
                    </h3>
                    <p className="mt-0.5 text-sm font-medium text-link">
                      {job.company}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pl-13 sm:flex-col sm:items-end sm:pl-0">
                  {job.current && (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-link">
                      <span
                        className="size-1.5 rounded-full bg-success"
                        aria-hidden
                      />
                      Current
                    </span>
                  )}
                  <span className="text-sm whitespace-nowrap text-muted-foreground">
                    {job.period}
                  </span>
                </div>
              </div>

              {job.progression && (
                <ul className="mt-3.5 flex flex-wrap items-center gap-x-1.5 gap-y-1.5">
                  {job.progression.map((step, index) => (
                    <li key={step} className="flex items-center gap-1.5">
                      <span
                        className={
                          index === job.progression!.length - 1
                            ? "rounded-md bg-secondary px-2 py-0.5 text-xs font-medium text-link"
                            : "rounded-md border px-2 py-0.5 text-xs text-muted-foreground"
                        }
                      >
                        {step}
                      </span>
                      {index < job.progression!.length - 1 && (
                        <span className="text-muted-foreground" aria-hidden>
                          →
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {job.summary && (
                <p className="mt-3.5 text-sm text-muted-foreground">
                  {job.summary}
                </p>
              )}

              <ul
                className={
                  job.points.length > 3
                    ? "mt-3.5 grid gap-x-6 gap-y-1.5 border-t border-border pt-3.5 sm:grid-cols-2"
                    : "mt-3.5 space-y-1.5 border-t border-border pt-3.5"
                }
              >
                {job.points.map((point) => (
                  <li
                    key={point}
                    className="relative pl-4 text-sm leading-6 text-muted-foreground before:absolute before:top-[9px] before:left-0 before:size-1.5 before:rounded-full before:bg-primary/60"
                  >
                    {point}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ol>
    </section>
  );
}
