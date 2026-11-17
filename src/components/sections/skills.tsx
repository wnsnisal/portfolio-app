import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section aria-labelledby="skills-heading" className="pb-10 lg:pb-0">
      <SectionHeading id="skills-heading">Technical skills</SectionHeading>
      <p className="mt-1 max-w-2xl text-lg text-muted-foreground">
        The tools and technologies I use to design, build and ship reliable
        software.
      </p>
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:mt-5 lg:grid-cols-3">
        {skillCategories.map(({ title, icon: Icon, items }) => (
          <li key={title}>
            <Card className="h-full bg-primary/5 p-6 transition-colors hover:border-primary/50 dark:bg-card">
              <div className="flex items-center gap-4">
                <IconBox className="bg-primary/10 dark:bg-primary/5 size-11 rounded-lg [&_svg]:size-5">
                  <Icon aria-hidden />
                </IconBox>
                <h3 className="text-lg font-semibold">{title}</h3>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border bg-background px-3 py-1.5 text-md text-muted-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
