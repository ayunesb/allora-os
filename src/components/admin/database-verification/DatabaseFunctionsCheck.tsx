
import React from 'react';
import { FunctionStatus } from './types';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface DatabaseFunctionsCheckProps {
  functions: FunctionStatus[];
}

export function DatabaseFunctionsCheck({ functions }: DatabaseFunctionsCheckProps) {
  if (!functions || functions.length === 0) return null;
  
  return (
    <div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60">
        Database Functions
      </div>
      <div className="divide-y divide-border/60">
        {functions.map((func) => (
          <div key={func.name} className="px-4 py-3">
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-2">
                {func.exists ? (
                  <CheckCircle2 className="h-5 w-5 text-green-500" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-500" />
                )}
                <span className="font-medium">{func.name}</span>
              </div>
              <span className={`text-sm ${func.exists ? 'text-green-600' : 'text-red-600'}`}>
                {func.exists ? 'Exists' : 'Missing'}
              </span>
            </div>
            
            {func.exists && (
              <div className="flex items-center pl-7 mt-1">
                <div className="flex items-center gap-2">
                  {func.isSecure ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <AlertTriangle className="h-4 w-4 text-amber-500" />
                  )}
                  <span className="text-sm text-muted-foreground">
                    {func.isSecure ? 'SECURITY DEFINER' : 'Not using SECURITY DEFINER'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
