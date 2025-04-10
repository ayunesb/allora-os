
import React from 'react';
import LaunchReadinessCheck from '@/components/admin/LaunchReadinessCheck';
import PreLaunchChecklist from '@/components/admin/PreLaunchChecklist';

export default function LaunchCheck() {
  return (
    <div className="animate-fadeIn space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold">Launch Readiness</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive analysis of system readiness for production
        </p>
      </div>
      
      <div className="space-y-6">
        <LaunchReadinessCheck />
        <PreLaunchChecklist />
      </div>
    </div>
  );
}
