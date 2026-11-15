import { cn } from "@/lib/utils";

type SectionHeadingProps = React.ComponentProps<"h2">;

export function SectionHeading({ className, ...props }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-[1.75rem] leading-tight font-bold tracking-tight md:text-3xl",
        className,
      )}
      {...props}
    />
  );
}
