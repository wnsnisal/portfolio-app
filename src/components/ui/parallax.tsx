"use client";

import { useParallax } from "@/hooks/use-parallax";
import { cn } from "@/lib/utils";

interface ParallaxProps extends React.ComponentProps<"div"> {
  /** Strength of the parallax lag (~0.03–0.2). See {@link useParallax}. */
  speed?: number;
  axis?: "x" | "y";
}

/**
 * Wraps content in an element that translates on scroll. Safe to use inside
 * Server Components — it is a Client Component entry point and its children are
 * rendered on the server and passed through.
 */
export function Parallax({
  speed,
  axis,
  className,
  children,
  ...props
}: ParallaxProps) {
  const ref = useParallax<HTMLDivElement>({ speed, axis });
  return (
    <div ref={ref} className={cn("will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
