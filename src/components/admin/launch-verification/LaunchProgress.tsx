
import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';

interface LaunchProgressProps {
  isComplete: boolean;
  launchStep: string | null;
}

export function LaunchProgress({ isComplete, launchStep }: LaunchProgressProps) {
  return (
    <div className="bg-card border border-border/50 rounded-xl p-4 space-y-3">
      <div className="flex items-center gap-3">
        {isComplete ? (
          <CheckCircle2 className="h-5 w-5 text-green-500" />
        ) : (
          <Loader2 className="h-5 w-5 animate-spin text-indigo-500" />
        )}
        <span className="font-medium">{launchStep}</span>
      </div>
      
      {isComplete && (
        <p className="text-sm text-muted-foreground">
          Allora AI has been successfully launched as its own first customer. Redirecting to dashboard...
        </p>
      )}
    </div>
  );
}
