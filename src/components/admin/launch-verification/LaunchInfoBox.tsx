
import React from 'react';
import { AlertCircle } from 'lucide-react';

export function LaunchInfoBox() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
      <div className="flex items-start">
        <AlertCircle className="h-5 w-5 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
        <div>
          <p className="font-medium mb-1">What this does:</p>
          <ul className="space-y-1 list-disc list-inside ml-1">
            <li>Creates Allora AI as its own first customer</li>
            <li>Sets up demo data including strategies, campaigns, and leads</li>
            <li>Enables you to showcase the platform's capabilities</li>
            <li>Provides a real working example of the platform</li>
          </ul>
          <p className="mt-2 text-xs">This process is safe and can be done in a testing environment.</p>
        </div>
      </div>
    </div>
  );
}
