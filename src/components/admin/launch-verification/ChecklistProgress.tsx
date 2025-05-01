
import React from 'react';
import { Progress } from "@/components/ui/progress";

interface ChecklistProgressProps {
  completed: number;
  total: number;
}

export function ChecklistProgress({ completed, total }: ChecklistProgressProps) {
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span>Launch Readiness</span>
        <span className="font-medium">{percentage}% ({completed}/{total})</span>
      </div>
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>Not Ready</span>
        {percentage === 100 ? (
          <span className="text-green-600 font-medium">Ready for Launch</span>
        ) : percentage >= 80 ? (
          <span className="text-amber-600 font-medium">Almost Ready</span>
        ) : (
          <span>Ready for Launch</span>
        )}
      </div>
    </div>
  );
}
