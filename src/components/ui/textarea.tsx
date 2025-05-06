import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  children?: React.ReactNode;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <textarea ref={ref} className={cn("textarea", className)} {...props}>
        {children}
      </textarea>
    );
  },
);
Textarea.displayName = "Textarea";
