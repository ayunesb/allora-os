
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface LaunchStatusFooterProps {
  allItemsCompleted: boolean;
  criticalItemsCompleted: boolean;
}

export function LaunchStatusFooter({ allItemsCompleted, criticalItemsCompleted }: LaunchStatusFooterProps) {
  return (
    <div className="pt-4 border-t border-border">
      <div className="flex justify-between items-center">
        <div>
          <div className="text-lg font-medium">Launch Status</div>
          <div className="text-sm text-muted-foreground">
            {allItemsCompleted ? 
              "All items completed! You're ready to launch." : 
              criticalItemsCompleted ?
                "All critical items completed. Ready for launch, but consider completing remaining items." :
                "Complete all critical items before launching."
            }
          </div>
        </div>
        <Button className="gap-2" disabled={!criticalItemsCompleted}>
          <ExternalLink className="h-4 w-4" />
          {criticalItemsCompleted ? "Launch Project" : "Complete Critical Items"}
        </Button>
      </div>
    </div>
  );
}
