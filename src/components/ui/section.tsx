import * as React from "react";
import { cn } from "@/lib/utils";

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {}

export const Section = React.forwardRef<HTMLElement, SectionProps>(({ className, ...props }, ref) => (
  <section ref={ref} className={cn("py-12 md:py-16", className)} {...props} />
));
Section.displayName = "Section";
