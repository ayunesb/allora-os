
import React from 'react';
import { PolicyStatus } from './types';
import { CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';

interface RlsPoliciesCheckProps {
  policies: PolicyStatus[];
}

export function RlsPoliciesCheck({ policies }: RlsPoliciesCheckProps) {
  if (!policies || policies.length === 0) return null;
  
  return (
    <div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60">
        Row Level Security Policies
      </div>
      <div className="divide-y divide-border/60">
        {policies.map((policy, index) => (
          <div key={index} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {policy.exists ? (
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <div>
                <span className="font-medium">{policy.table}</span>
                {policy.name && (
                  <span className="text-xs text-muted-foreground ml-2">
                    {policy.name}
                  </span>
                )}
              </div>
            </div>
            <span className={`text-sm ${policy.exists ? 'text-green-600' : 'text-red-600'}`}>
              {policy.exists ? 'Active' : 'Not Configured'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
