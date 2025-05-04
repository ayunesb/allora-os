import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
const Progress = React.forwardRef(({ className, value, variant = "default", indicatorClassName, ...props }, ref) => {
    const getVariantClass = (variant) => {
        switch (variant) {
            case "success":
                return "bg-green-600";
            case "warning":
                return "bg-yellow-600";
            case "danger":
                return "bg-red-600";
            default:
                return "bg-primary";
        }
    };
    return (<ProgressPrimitive.Root ref={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
      <ProgressPrimitive.Indicator className={cn("h-full w-full flex-1 transition-all", getVariantClass(variant), indicatorClassName)} style={{ transform: `translateX(-${100 - (value || 0)}%)` }}/>
    </ProgressPrimitive.Root>);
});
Progress.displayName = ProgressPrimitive.Root.displayName;
export { Progress };
