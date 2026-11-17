import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { stats } from "@/data/stats";
import { cn } from "@/lib/utils";

export function Stats({ className }: { className?: string }) {
  return (
    <section
      aria-label="Highlights"
      className={cn("w-full py-12 lg:py-14", className)}
    >
      <Container>
        <Card className="bg-primary/5 dark:bg-card">
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 lg:grid-cols-4 lg:gap-x-6 lg:px-[29px] lg:py-[27px]">
            {stats.map(({ value, label, icon: Icon }) => (
              <li key={label} className="flex min-w-0 items-center gap-3 lg:gap-4">
                <IconBox className="lg:size-12 bg-primary/10 dark:bg-primary/5">
                  <Icon aria-hidden />
                </IconBox>
                <div className="min-w-0">
                  <p className="text-lg leading-7 font-semibold sm:text-xl lg:text-2xl lg:leading-8">
                    {value}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {label}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </Container>
    </section>
  );
}
