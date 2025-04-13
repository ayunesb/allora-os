
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { ChecklistCategory, EnhancedVerificationState } from './types';

interface ChecklistProgressProps {
  completed: number;
  total: number;
  categories?: ChecklistCategory[];
}

export function ChecklistProgress({ completed, total, categories }: ChecklistProgressProps) {
  // Calculate percentage
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
  
  // Determine status color based on percentage
  const getStatusColor = () => {
    if (percentage >= 90) return 'text-green-600';
    if (percentage >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };
  
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Completion Status
        </div>
        <div className={`font-medium ${getStatusColor()}`}>
          {percentage}%
        </div>
      </div>
      
      <Progress 
        value={percentage} 
        className={`h-2 ${
          percentage >= 90 
            ? 'bg-green-100' 
            : percentage >= 60 
            ? 'bg-yellow-100' 
            : 'bg-red-100'
        }`}
      />
      
      <div className="flex justify-between text-sm">
        <span>
          <span className="font-medium">{completed}</span> of <span className="font-medium">{total}</span> checks completed
        </span>
        
        <span className={percentage === 100 ? 'text-green-600 font-medium' : 'text-muted-foreground'}>
          {percentage === 100 ? 'All checks passed' : 'Checks in progress'}
        </span>
      </div>
    </div>
  );
}
