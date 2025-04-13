
import React from 'react';
import { Info } from 'lucide-react';
import { LaunchInfoBoxProps } from './types';

export function LaunchInfoBox({ className }: LaunchInfoBoxProps) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 text-blue-700 text-sm ${className}`}>
      <div className="flex gap-2">
        <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">What happens when you launch?</p>
          <ul className="list-disc list-inside space-y-1 text-blue-600">
            <li>Allora AI is set up as its first customer</li>
            <li>Initial strategies, campaigns, and scripts are generated</li>
            <li>Executive debate is simulated for your business</li>
            <li>Zapier webhooks are initialized</li>
            <li>Data is preloaded to showcase the platform</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
