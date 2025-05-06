import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  variant?: "default" | "success" | "warning" | "danger";
  indicatorClassName?: string;
}
declare const Progress: React.ForwardRefExoticComponent<
  ProgressProps & React.RefAttributes<HTMLDivElement>
>;
export { Progress };
