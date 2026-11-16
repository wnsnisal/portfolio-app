import { cn } from "@/lib/utils";

/** Rounded tinted square that holds an icon or a short text mark. */
export function IconBox({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex size-11 shrink-0 items-center justify-center rounded-lg bg-secondary text-link [&_svg]:size-5",
        className,
      )}
      {...props}
    />
  );
}
