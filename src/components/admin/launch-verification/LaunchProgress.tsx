
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle } from "lucide-react";
import { LaunchProgressProps } from './types';

export function LaunchProgress({ isComplete, launchStep }: LaunchProgressProps) {
  return (
    <div className="animate-in fade-in space-y-4 bg-primary-foreground border border-border/70 rounded-lg p-4">
      {isComplete ? (
        <div className="flex items-center gap-2 text-green-600">
          <CheckCircle className="h-5 w-5" />
          <span className="font-medium">Launch completed successfully!</span>
        </div>
      ) : (
        <>
          <div className="text-sm font-medium">Launching Allora AI...</div>
          <Progress value={undefined} className="h-2" />
          {launchStep && (
            <div className="text-sm text-muted-foreground">{launchStep}</div>
          )}
        </>
      )}
    </div>
  );
}
