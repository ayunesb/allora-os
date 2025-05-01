
import React from 'react';
import { CheckCircle2, AlertCircle, XCircle } from 'lucide-react';
import { SeverityCountsProps } from './types';

export function SeverityCounts({ completed, warnings, errors }: SeverityCountsProps) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
        <CheckCircle2 className="h-5 w-5 text-green-500" />
        <div>
          <div className="font-semibold text-xl">{completed}</div>
          <div className="text-muted-foreground text-xs">Complete</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
        <AlertCircle className="h-5 w-5 text-amber-500" />
        <div>
          <div className="font-semibold text-xl">{warnings}</div>
          <div className="text-muted-foreground text-xs">Warnings</div>
        </div>
      </div>
      
      <div className="flex items-center gap-2 bg-muted/50 px-3 py-2 rounded-md">
        <XCircle className="h-5 w-5 text-red-500" />
        <div>
          <div className="font-semibold text-xl">{errors}</div>
          <div className="text-muted-foreground text-xs">Errors</div>
        </div>
      </div>
    </div>
  );
}
