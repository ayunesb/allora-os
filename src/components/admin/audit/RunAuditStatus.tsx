
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { AlertCircle, CheckCircle, Loader2 } from "lucide-react";

interface RunAuditStatusProps {
  isRunning: boolean;
  progress: number;
  auditComplete: boolean;
  criticalIssues: number;
}

export function RunAuditStatus({
  isRunning,
  progress,
  auditComplete,
  criticalIssues
}: RunAuditStatusProps) {
  return (
    <div className="space-y-6">
      {isRunning && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <div>
              <h3 className="text-lg font-medium">Running System Audit</h3>
              <p className="text-sm text-muted-foreground">
                Verifying all system components and configurations
              </p>
            </div>
          </div>
          <Progress value={progress} className="h-2" />
          <p className="text-sm text-center text-muted-foreground">
            {progress}% complete
          </p>
        </div>
      )}
      
      {auditComplete && (
        <div className="space-y-4">
          {criticalIssues === 0 ? (
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <CheckCircle className="h-8 w-8 text-green-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-green-700">Audit Complete - System Ready</h3>
                <p className="text-sm text-muted-foreground">
                  All systems are verified and ready for production
                </p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <AlertCircle className="h-8 w-8 text-amber-500" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-amber-700">Audit Complete - Issues Found</h3>
                <p className="text-sm text-muted-foreground">
                  {criticalIssues} critical {criticalIssues === 1 ? 'issue' : 'issues'} found
                </p>
              </div>
            </div>
          )}
          <Progress value={100} className="h-2" />
        </div>
      )}
    </div>
  );
}
