
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ChecklistProgressProps } from './types';

export function ChecklistProgress({ value }: ChecklistProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">Verification Progress</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-2" />
    </div>
  );
}
