import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const headingVariants = cva("font-display font-bold tracking-tight text-foreground", {
  variants: {
    level: {
      1: "text-3xl md:text-4xl lg:text-5xl",
      2: "text-2xl md:text-3xl",
      3: "text-xl md:text-2xl",
      4: "text-lg md:text-xl font-semibold",
    },
  },
  defaultVariants: {
    level: 2,
  },
});

export type HeadingProps = {
  level?: 1 | 2 | 3 | 4;
  className?: string;
  children: React.ReactNode;
} & VariantProps<typeof headingVariants>;

export function Heading({ level = 2, className, children }: HeadingProps) {
  const cls = cn(headingVariants({ level }), className);
  switch (level) {
    case 1:
      return <h1 className={cls}>{children}</h1>;
    case 3:
      return <h3 className={cls}>{children}</h3>;
    case 4:
      return <h4 className={cls}>{children}</h4>;
    default:
      return <h2 className={cls}>{children}</h2>;
  }
}
