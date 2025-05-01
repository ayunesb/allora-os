
import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from "lucide-react";
import { ValidationResultItemProps } from './types';

export function ValidationResultItem({ id, title, result }: ValidationResultItemProps) {
  return (
    <div className="flex items-start gap-3 p-2 border-b border-border/40 last:border-b-0">
      <div className="mt-1">
        {result.valid ? (
          <CheckCircle className="h-5 w-5 text-green-500" />
        ) : (
          <XCircle className="h-5 w-5 text-red-500" />
        )}
      </div>
      
      <div className="flex-1">
        <div className="font-medium text-sm">{title}</div>
        <div className="text-xs text-muted-foreground">{result.message}</div>
      </div>
    </div>
  );
}
