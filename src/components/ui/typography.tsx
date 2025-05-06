import React from "react";
import { cn } from "@/lib/utils";
export const PageTitle = ({ title, description, children, className }) => {
  return (
    <div className={cn("mb-6", className)}>
      <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
      {description && (
        <p className="text-muted-foreground mt-1">{description}</p>
      )}
      {children}
    </div>
  );
};
// Add the missing typography components
export const TypographyH1 = ({ children, className }) => {
  return (
    <h1
      className={cn(
        "scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl",
        className,
      )}
    >
      {children}
    </h1>
  );
};
export const TypographyP = ({ children, className }) => {
  return (
    <p className={cn("leading-7 [&:not(:first-child)]:mt-6", className)}>
      {children}
    </p>
  );
};
export const TypographySmall = ({ children, className }) => {
  return (
    <small className={cn("text-sm font-medium leading-none", className)}>
      {children}
    </small>
  );
};
