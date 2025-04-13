
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ChecklistCategory, EnhancedVerificationState } from './types';

interface ChecklistProgressProps {
  progress: EnhancedVerificationState['progress'];
  overallProgress: EnhancedVerificationState['overallProgress'];
  activeTab: ChecklistCategory;
}

export function ChecklistProgress({ 
  progress, 
  overallProgress, 
  activeTab 
}: ChecklistProgressProps) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>Overall Progress: {overallProgress.percentage}%</span>
          <span>{overallProgress.completed}/{overallProgress.total} Tasks</span>
        </div>
        <Progress value={overallProgress.percentage} className="h-2" />
      </div>
      
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span>{activeTab.replace(/_/g, ' ')} Progress: {progress[activeTab]?.percentage || 0}%</span>
          <span>{progress[activeTab]?.completed || 0}/{progress[activeTab]?.total || 0} Tasks</span>
        </div>
        <Progress 
          value={progress[activeTab]?.percentage || 0} 
          className="h-2" 
        />
      </div>
    </div>
  );
}
