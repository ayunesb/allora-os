import React from "react";
import { useBreakpoint } from "@/hooks/use-mobile";
export function AdminHeader() {
  const breakpoint = useBreakpoint();
  const isMobileView = ["xs", "mobile"].includes(breakpoint);
  return (
    <div className="mb-4 sm:mb-6">
      <h1
        className={`${isMobileView ? "text-xl" : "text-2xl sm:text-3xl"} font-bold`}
      >
        Admin Dashboard
      </h1>
      <p className="text-muted-foreground mt-1 sm:mt-2 text-sm">
        Overview of platform metrics and management tools
      </p>
    </div>
  );
}
