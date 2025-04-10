
import React from 'react';
import { Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { LaunchButtonProps } from './types';
import { useLaunchProcess } from './useLaunchProcess';
import { LaunchProgress } from './LaunchProgress';
import { LaunchInfoBox } from './LaunchInfoBox';

export function LaunchButton({ className }: LaunchButtonProps) {
  const { 
    isLaunching, 
    launchStep, 
    isComplete, 
    launchFirstCustomerFlow 
  } = useLaunchProcess();

  return (
    <div className={`space-y-3 ${className}`}>
      {!isLaunching ? (
        <Button 
          onClick={launchFirstCustomerFlow} 
          size="lg"
          className="bg-indigo-600 hover:bg-indigo-700 text-white py-6 px-8 text-lg font-medium rounded-xl w-full sm:w-auto transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
        >
          <Rocket className="h-5 w-5" />
          Launch Allora AI
        </Button>
      ) : (
        <LaunchProgress 
          isComplete={isComplete} 
          launchStep={launchStep} 
        />
      )}

      <LaunchInfoBox />
    </div>
  );
}
