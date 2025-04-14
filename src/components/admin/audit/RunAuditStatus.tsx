
import React from 'react';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface RunAuditStatusProps {
  isRunning: boolean;
  progress: number;
  auditComplete: boolean;
}

export function RunAuditStatus({ isRunning, progress, auditComplete }: RunAuditStatusProps) {
  const navigate = useNavigate();
  
  return (
    <div className="text-center">
      {isRunning ? (
        <div className="space-y-4">
          <div className="flex justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-medium">Running Full Audit</h3>
            <p className="text-muted-foreground">
              Checking all systems and components...
            </p>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full mt-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300 ease-in-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-sm text-muted-foreground">{progress}% Complete</p>
        </div>
      ) : (
        <div className="space-y-4">
          {auditComplete ? (
            <div className="flex justify-center">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
            </div>
          ) : (
            <div className="flex justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}
          <h3 className="text-lg font-medium">Audit Complete</h3>
          <p className="text-muted-foreground mb-4">
            All systems have been checked and results are ready to view.
          </p>
          <Button 
            className="w-full" 
            onClick={() => navigate('/admin/audit')}
          >
            View Detailed Results
          </Button>
        </div>
      )}
    </div>
  );
}
