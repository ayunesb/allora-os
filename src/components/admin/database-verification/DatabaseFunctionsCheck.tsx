
import React from 'react';
import { FunctionStatus } from './types';
import { CheckCircle2, XCircle, AlertTriangle, ShieldAlert } from 'lucide-react';

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
          <div key={func.name} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {func.exists && func.isSecure ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : !func.exists ? (
                <XCircle className="h-5 w-5 text-red-500" />
              ) : (
                <ShieldAlert className="h-5 w-5 text-amber-500" />
              )}
              <span className="font-medium">{func.name}</span>
            </div>
            <div className="flex items-center gap-2">
              {func.exists ? (
                <span className={`text-sm px-2 py-0.5 rounded-full ${func.isSecure ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'}`}>
                  {func.isSecure ? 'Secure' : 'Security Issues'}
                </span>
              ) : (
                <span className="text-sm px-2 py-0.5 rounded-full bg-red-100 text-red-800">
                  Missing
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
