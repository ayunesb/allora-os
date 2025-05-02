
import React from 'react';
import { Button } from '@/components/ui/button';
import { Check, AlertCircle } from 'lucide-react';
import { ZapierReadinessTestProps } from '@/types/fixed/Integrations';

/**
 * Component to test and display Zapier webhook readiness
 */
export default function ZapierReadinessTest({
  webhookUrl,
  isValid
}: ZapierReadinessTestProps) {
  return (
    <div className="flex flex-col space-y-2">
      <div className="bg-muted p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Webhook Status</h3>
        <div className="flex items-center space-x-2">
          {isValid ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <p className="text-sm">Zapier webhook is properly configured</p>
            </>
          ) : (
            <>
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <p className="text-sm">Zapier webhook needs configuration</p>
            </>
          )}
        </div>
      </div>
      
      <div className="bg-muted/50 p-4 rounded-md">
        <h3 className="text-sm font-medium mb-2">Webhook URL</h3>
        <p className="text-xs font-mono break-all">{webhookUrl || "Not configured"}</p>
      </div>
    </div>
  );
}
