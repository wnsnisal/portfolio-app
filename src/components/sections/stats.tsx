import { Container } from "@/components/ui/container";
import { Card } from "@/components/ui/card";
import { IconBox } from "@/components/ui/icon-box";
import { stats } from "@/data/stats";

export function Stats() {
  return (
    <section aria-label="Highlights" className="pb-12 lg:pb-14">
      <Container>
        <Card>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-5 p-5 lg:grid-cols-4 lg:gap-x-6 lg:px-[29px] lg:py-[27px]">
            {stats.map(({ value, label, icon: Icon }) => (
              <li key={label} className="flex min-w-0 items-center gap-3 lg:gap-4">
                <IconBox className="lg:size-12">
                  <Icon aria-hidden />
                </IconBox>
                <div className="min-w-0">
                  <p className="text-xl leading-[26px] font-semibold lg:text-2xl lg:leading-[30px]">
                    {value}
                  </p>
                  <p className="text-xs text-muted-foreground lg:text-sm">
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
