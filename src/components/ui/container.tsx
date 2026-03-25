import * as React from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Default matches marketing sections — use `narrow` for long-form reading */
  size?: "default" | "narrow";
}

const maxWidth: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-7xl",
  narrow: "max-w-3xl",
};

export const Container = React.forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", ...props }, ref) => (
    <div
      ref={ref}
      className={cn("mx-auto w-full px-4 sm:px-6", maxWidth[size], className)}
      {...props}
    />
  ),
);
Container.displayName = "Container";
