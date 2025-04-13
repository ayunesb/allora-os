
import React from 'react';
import { Info } from "lucide-react";
import { LaunchInfoBoxProps } from './types';

export function LaunchInfoBox({ className = '' }: LaunchInfoBoxProps) {
  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-3 ${className}`}>
      <div className="flex gap-2">
        <Info className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div>
          <p className="text-sm text-blue-800">
            By launching Allora AI, you'll create a self-demo environment showing how the platform works with your own company as the first client.
          </p>
          <ul className="text-sm text-blue-700 mt-2 list-disc pl-5 space-y-1">
            <li>Creates an example company profile for "Allora AI"</li>
            <li>Generates AI business strategies tailored to your industry</li>
            <li>Sets up sample marketing campaigns for different platforms</li>
            <li>Creates sample leads with communication history</li>
            <li>Configures Zapier webhook integrations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
