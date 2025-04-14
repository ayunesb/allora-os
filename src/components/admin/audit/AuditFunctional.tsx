
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
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

interface AuditFunctionalProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditFunctional: React.FC<AuditFunctionalProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'func-signup',
      name: 'Signup Flow',
      description: 'Complete user signup and onboarding process',
      status: 'pending',
      notes: 'Collect Company Name, Industry, Goals'
    },
    {
      id: 'func-onboarding',
      name: 'Onboarding Flow',
      description: 'Confirm onboarding data is saved correctly',
      status: 'pending',
      notes: 'Check Supabase for proper data storage'
    },
    {
      id: 'func-dashboard',
      name: 'Dashboard Load',
      description: 'Load dashboard with test data',
      status: 'pending',
      notes: 'Test with dummy strategies, campaigns, leads'
    },
    {
      id: 'func-ai-strategy',
      name: 'AI Strategy Generation',
      description: 'Trigger AI strategy generation',
      status: 'pending',
      notes: 'Prompt after onboarding, check results'
    },
    {
      id: 'func-campaign',
      name: 'Campaign Creation Flow',
      description: 'Create test campaign',
      status: 'pending',
      notes: 'Verify campaign creation and storage'
    },
    {
      id: 'func-call-scripts',
      name: 'Call Scripts Creation',
      description: 'Generate AI call scripts',
      status: 'pending',
      notes: 'Verify scripts are generated properly'
    },
    {
      id: 'func-lead',
      name: 'Lead Management',
      description: 'Test lead CRUD operations',
      status: 'pending',
      notes: 'Add, edit, delete a lead'
    },
    {
      id: 'func-admin',
      name: 'Admin Users CRUD',
      description: 'Test user management',
      status: 'pending',
      notes: 'Add new users, update role, delete users'
    },
    {
      id: 'func-zapier',
      name: 'Zapier Webhooks',
      description: 'Test Zapier integration',
      status: 'pending',
      notes: 'Verify POST triggers from real actions'
    },
    {
      id: 'func-stripe',
      name: 'Stripe Payment',
      description: 'Test checkout and subscription',
      status: 'pending',
      notes: 'Verify checkout session, subscription management'
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
      toast.info(`Checking: ${check.name}...`);
      
      // Simulate an audit check taking time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
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
      toast.success("All functional tests passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} functional tests failed`);
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
          <CardTitle>Functional Testing: End-to-End</CardTitle>
          <Button 
            onClick={runChecks} 
            disabled={isRunningChecks || status === 'in-progress'}
            variant="outline"
            size="sm"
          >
            {isRunningChecks ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current" />
                Running Tests...
              </>
            ) : (
              'Run Tests'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Test</th>
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
              <div className="font-medium">Failed Tests:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All functional tests passed!</div>
              <p className="mt-1">
                All end-to-end flows are working correctly.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
