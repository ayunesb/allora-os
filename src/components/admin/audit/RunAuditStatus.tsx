
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface RunAuditStatusProps {
  isRunning: boolean;
  progress: number;
  auditComplete: boolean;
  criticalIssues?: number;
}

export function RunAuditStatus({ 
  isRunning, 
  progress, 
  auditComplete,
  criticalIssues = 0
}: RunAuditStatusProps) {
  return (
    <div className="space-y-6">
      {/* Progress indicator */}
      <div className="space-y-2">
        <Progress value={progress} className="h-2 w-full" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0%</span>
          <span>50%</span>
          <span>100%</span>
        </div>
      </div>
      
      {/* Status display */}
      <div className="flex flex-col items-center justify-center py-8 text-center">
        {isRunning && (
          <>
            <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
            <h3 className="text-xl font-medium mb-2">Running System Audit</h3>
            <p className="text-muted-foreground">
              Checking security, performance, and compliance...
            </p>
            <div className="mt-4 text-sm font-medium">
              {progress}% Complete
            </div>
          </>
        )}
        
        {auditComplete && criticalIssues === 0 && (
          <>
            <CheckCircle2 className="h-12 w-12 text-green-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Audit Complete</h3>
            <p className="text-green-600 dark:text-green-400">
              All systems are ready!
            </p>
          </>
        )}
        
        {auditComplete && criticalIssues > 0 && (
          <>
            <AlertTriangle className="h-12 w-12 text-amber-500 mb-4" />
            <h3 className="text-xl font-medium mb-2">Audit Complete</h3>
            <p className="text-amber-600 dark:text-amber-400">
              Found {criticalIssues} critical {criticalIssues === 1 ? 'issue' : 'issues'} that need attention
            </p>
          </>
        )}
      </div>
    </div>
  );
}
