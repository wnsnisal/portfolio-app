import { cn } from "@/lib/utils";

type SectionHeadingProps = React.ComponentProps<"h2">;

export function SectionHeading({ className, ...props }: SectionHeadingProps) {
  return (
    <h2
      className={cn(
        "text-3xl leading-tight font-bold tracking-tight md:text-4xl",
        className,
      )}
      {...props}
    />
  );
}
