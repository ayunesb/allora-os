
import { useState } from "react";
import StrategyBoard from "@/components/strategy-board/StrategyBoard";
import { useBreakpoint } from "@/hooks/use-mobile";
import { ErrorBoundary } from "@/components/ErrorBoundary";

export default function Strategies() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <div className={isMobileView ? "px-0 -mx-4" : ""}>
      <ErrorBoundary>
        <StrategyBoard />
      </ErrorBoundary>
    </div>
  );
}
