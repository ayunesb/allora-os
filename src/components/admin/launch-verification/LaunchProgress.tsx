
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { LaunchProgressProps } from './types';

export function LaunchProgress({ value, label }: LaunchProgressProps) {
  return (
    <div className="space-y-1">
      {label && <p className="text-sm font-medium">{label}</p>}
      <Progress value={value} className="h-2" />
      <p className="text-xs text-muted-foreground text-right">{value}% Complete</p>
    </div>
  );
}
