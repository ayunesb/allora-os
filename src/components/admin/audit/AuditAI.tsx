
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Brain } from 'lucide-react';
import { toast } from 'sonner';

type CheckStatus = 'pending' | 'passed' | 'failed';
type CategoryStatus = 'pending' | 'in-progress' | 'passed' | 'failed';

interface CheckItem {
  id: string;
  name: string;
  description: string;
  status: CheckStatus;
  notes?: string;
}

interface AuditAIProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditAI: React.FC<AuditAIProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'ai-strategy',
      name: 'AI Strategy Bot',
      description: 'Test strategy generation',
      status: 'pending',
      notes: 'Generates proper strategies based on onboarding inputs'
    },
    {
      id: 'ai-campaign',
      name: 'AI Campaign Bot',
      description: 'Test campaign suggestions',
      status: 'pending',
      notes: 'Suggests campaigns with platforms and budgets'
    },
    {
      id: 'ai-calling',
      name: 'AI Calling Bot',
      description: 'Test call script generation',
      status: 'pending',
      notes: 'Generates correct cold call scripts and follow-ups'
    },
    {
      id: 'ai-debate',
      name: 'AI Debating Bots',
      description: 'Test executive debate',
      status: 'pending',
      notes: 'Shows debate conversations properly'
    },
    {
      id: 'ai-risk',
      name: 'Risk Level Handling',
      description: 'Test risk adaptation',
      status: 'pending',
      notes: 'Adapts strategies based on Low/Medium/High risk setting'
    }
  ]);
  
  const [isRunningChecks, setIsRunningChecks] = useState(false);
  
  const updateCheckStatus = (id: string, status: CheckStatus, notes?: string) => {
    setChecks(prevChecks => 
      prevChecks.map(check => 
        check.id === id 
          ? { ...check, status, notes: notes || check.notes } 
          : check
      )
    );
  };
  
  const runChecks = async () => {
    setIsRunningChecks(true);
    onStatusChange('in-progress');
    
    // Simulate running checks
    for (const check of checks) {
      // Update status to show we're checking this item
      toast.info(`Testing ${check.name}...`);
      
      // Simulate an audit check taking time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo purposes, randomly pass/fail with 90% success rate
      const passed = Math.random() < 0.9;
      updateCheckStatus(check.id, passed ? 'passed' : 'failed');
      
      if (passed) {
        toast.success(`Passed: ${check.name}`);
      } else {
        toast.error(`Failed: ${check.name}`);
      }
    }
    
    // Determine overall section status
    const failedChecks = checks.filter(check => check.status === 'failed');
    if (failedChecks.length === 0) {
      onStatusChange('passed');
      toast.success("All AI bot checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} AI bot checks failed`);
    }
    
    setIsRunningChecks(false);
  };
  
  const getStatusIcon = (status: CheckStatus) => {
    switch (status) {
      case 'passed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <AlertCircle className="h-5 w-5 text-muted-foreground" />;
    }
  };
  
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            AI Bot Prompt Validation
          </CardTitle>
          <Button 
            onClick={runChecks} 
            disabled={isRunningChecks || status === 'in-progress'}
            variant="outline"
            size="sm"
          >
            {isRunningChecks ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current" />
                Testing AI Bots...
              </>
            ) : (
              'Run AI Tests'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Area</th>
                <th className="text-left py-2 font-medium w-24">Status</th>
                <th className="text-left py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr key={check.id} className="border-b">
                  <td className="py-3">
                    <div className="font-medium">{check.name}</div>
                    <div className="text-sm text-muted-foreground">{check.description}</div>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center">
                      {getStatusIcon(check.status)}
                    </div>
                  </td>
                  <td className="py-3 text-sm">{check.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {status === 'failed' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              <div className="font-medium">AI Bot Issues:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All AI bot checks passed!</div>
              <p className="mt-1">
                AI bots are functioning properly and generating appropriate content.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
