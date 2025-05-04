import React from 'react';
import { CheckCircle2, XCircle, Shield } from 'lucide-react';
export function RlsPoliciesCheck({ policies }) {
    if (!policies || policies.length === 0)
        return null;
    // Count disabled RLS policies
    const disabledPolicies = policies.filter(policy => !policy.exists).length;
    return (<div className="rounded-md border border-border/60 overflow-hidden">
      <div className="bg-muted/30 px-4 py-3 font-medium border-b border-border/60 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-blue-500"/>
          <span>Row Level Security Policies</span>
        </div>
        {disabledPolicies > 0 ? (<span className="text-xs px-2 py-1 bg-red-100 text-red-800 rounded-full">
            {disabledPolicies} disabled
          </span>) : (<span className="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
            All enabled
          </span>)}
      </div>
      <div className="divide-y divide-border/60">
        {policies.map((policy, index) => (<div key={`${policy.table}-${index}`} className="px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {policy.exists ? (<CheckCircle2 className="h-5 w-5 text-green-500"/>) : (<XCircle className="h-5 w-5 text-red-500"/>)}
              <span className="font-medium">{policy.table}</span>
            </div>
            <span className={`text-sm ${policy.exists ? 'text-green-600' : 'text-red-600'}`}>
              {policy.exists ? 'Enabled' : 'Disabled'}
            </span>
          </div>))}
      </div>
    </div>);
}
