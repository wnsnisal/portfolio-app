import { SectionHeading } from "@/components/ui/section-heading";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { skills } from "@/data/skills";

export function Skills() {
  return (
    <section aria-labelledby="skills-heading">
      <SectionHeading id="skills-heading">Skills</SectionHeading>
      <ul className="mt-4 grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((skill) => (
          <li key={skill.name}>
            <Card className="flex items-center gap-3.5 p-[15px] transition-colors hover:border-primary/50">
              <IconBox className="text-sm font-semibold">{skill.mark}</IconBox>
              <div>
                <p className="leading-[22px] font-medium">{skill.name}</p>
                <p className="text-sm text-muted-foreground">
                  {skill.description}
                </p>
              </div>
            </Card>
          </li>
        ))}
      </ul>
    </section>
  );
}
