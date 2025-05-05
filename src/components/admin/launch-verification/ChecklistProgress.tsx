import React from 'react';
import { Progress } from "@/components/ui/progress";
export function ChecklistProgress({ completed, total, categories }) {
    // Calculate percentage
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    // Determine status color based on percentage
    const getStatusColor = () => {
        if (percentage >= 90)
            return 'text-green-500';
        if (percentage >= 60)
            return 'text-yellow-400';
        return 'text-red-400';
    };
    // Determine progress bar color based on percentage
    const getProgressColor = () => {
        if (percentage >= 90)
            return 'bg-green-500';
        if (percentage >= 60)
            return 'bg-yellow-400';
        return 'bg-red-400';
    };
    return (<div className="space-y-2">
      <div className="flex justify-between items-center">
        <div className="text-sm text-gray-300">
          Completion Status
        </div>
        <div className={`font-medium ${getStatusColor()}`}>
          {percentage}%
        </div>
      </div>
      
      <Progress value={percentage} className="h-2 bg-secondary/20" indicatorClassName={getProgressColor()}/>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">
          <span className="font-medium text-white">{completed}</span> of <span className="font-medium text-white">{total}</span> checks completed
        </span>
        
        <span className={percentage === 100 ? 'text-green-500 font-medium' : 'text-gray-300'}>
          {percentage === 100 ? 'All checks passed' : 'Checks in progress'}
        </span>
      </div>
    </div>);
}
