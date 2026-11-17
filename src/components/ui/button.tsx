import { cva, type VariantProps } from "class-variance-authority";

/**
 * Button styles as a cva helper so the same look can be applied to <button>,
 * <a> and next/link without an extra dependency.
 */
export const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-colors disabled:pointer-events-none disabled:opacity-60 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline:
          "border border-border bg-transparent text-foreground hover:bg-muted",
        ghost: "text-muted-foreground hover:bg-muted hover:text-foreground",
      },
      size: {
        default: "h-12 px-6 text-sm [&_svg]:size-[18px]",
        sm: "h-11 px-5 text-sm [&_svg]:size-4",
        md: "h-12 px-6 text-md [&_svg]:size-[18px]",
        lg: "h-14 px-8 text-lg [&_svg]:size-5",
        icon: "size-11 [&_svg]:size-[18px]",
      },
    },
    defaultVariants: { variant: "primary", size: "default" },
  },
);

export type ButtonVariantProps = VariantProps<typeof buttonVariants>;
