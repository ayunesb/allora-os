
import React from 'react';
import { CheckCircle, Loader } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { LaunchProgressProps } from './types';

export function LaunchProgress({ isComplete, launchStep }: LaunchProgressProps) {
  return (
    <div className="space-y-3 bg-primary/5 p-4 rounded-lg border border-primary/20">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-primary">
          {isComplete ? 'Launch Completed!' : 'Launching Allora AI...'}
        </h3>
        {isComplete ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <Loader className="h-5 w-5 text-primary animate-spin" />
        )}
      </div>
      
      <Progress value={isComplete ? 100 : 75} className="h-2" />
      
      <p className="text-sm text-muted-foreground">
        {launchStep || 'Initializing...'}
      </p>
    </div>
  );
}
