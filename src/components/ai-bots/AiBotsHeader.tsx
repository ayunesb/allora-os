
import React from "react";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import { useBreakpoint } from "@/hooks/use-mobile";
import { HelpButton } from "@/components/help/HelpButton";

interface AiBotsHeaderProps {
  isMobileView: boolean;
}

export function AiBotsHeader({ isMobileView }: { isMobileView: boolean }) {
  return (
    <div className="w-full space-y-2">
      <div className="flex items-center justify-between w-full">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Executive Team</h1>
          <p className="text-muted-foreground mt-1">
            Engage with your AI executive advisors for strategic guidance
          </p>
        </div>
        
        <HelpButton contextId="ai-bots" variant="text" />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 w-full">
        <div>
          <h1 className={`${isMobileView ? 'text-xl' : 'text-3xl'} font-bold tracking-tight`}>AI Executive Boardroom</h1>
          <p className="text-muted-foreground mt-2">
            Your virtual boardroom with world-class AI executives for strategic business guidance.
          </p>
        </div>
        <UserPreferencesDialog triggerLabel={isMobileView ? "Settings" : "Response Settings"} />
      </div>
    </div>
  );
}
