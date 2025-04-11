
import React from "react";
import UserPreferencesDialog from "@/components/UserPreferencesDialog";
import { useBreakpoint } from "@/hooks/use-mobile";

interface AiBotsHeaderProps {
  isMobileView: boolean;
}

export const AiBotsHeader: React.FC<AiBotsHeaderProps> = ({ isMobileView }) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
      <div>
        <h1 className={`${isMobileView ? 'text-xl' : 'text-3xl'} font-bold tracking-tight`}>AI Executive Boardroom</h1>
        <p className="text-muted-foreground mt-2">
          Your virtual boardroom with world-class AI executives for strategic business guidance.
        </p>
      </div>
      <UserPreferencesDialog triggerLabel={isMobileView ? "Settings" : "Response Settings"} />
    </div>
  );
};
