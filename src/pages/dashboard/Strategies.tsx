
import { useState } from "react";
import StrategyBoard from "@/components/strategy-board/StrategyBoard";
import { useBreakpoint } from "@/hooks/use-mobile";
import { PageErrorBoundary } from "@/components/errorHandling/PageErrorBoundary";
import { HelpButton } from "@/components/help/HelpButton";

export default function Strategies() {
  const breakpoint = useBreakpoint();
  const isMobileView = ['xs', 'mobile'].includes(breakpoint);
  
  return (
    <PageErrorBoundary pageName="Strategies">
      <div className={isMobileView ? "px-0 -mx-4" : ""}>
        <div className="flex justify-end mb-4">
          <HelpButton contextId="strategies" variant="text" />
        </div>
        <StrategyBoard />
      </div>
    </PageErrorBoundary>
  );
}
