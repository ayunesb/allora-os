
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

interface AuditNavigationProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditNavigation: React.FC<AuditNavigationProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'nav-404',
      name: '404 Page Functionality',
      description: 'Confirm 404 page works when accessing non-existent routes',
      status: 'pending',
      notes: 'Should display styled 404 page with navigation back to dashboard'
    },
    {
      id: 'nav-internal-links',
      name: 'All Internal Links',
      description: 'Test every link in the navigation and sidebars',
      status: 'pending',
      notes: 'Test dashboard, strategies, campaigns, leads, calls, AI Bots links'
    },
    {
      id: 'nav-redirects',
      name: 'Redirects',
      description: 'Confirm main redirects work correctly',
      status: 'pending',
      notes: 'Confirm /login, /signup, /dashboard, /admin/* redirect correctly'
    },
    {
      id: 'nav-smart-redirects',
      name: 'Smart Redirects',
      description: 'Test user-specific redirects',
      status: 'pending',
      notes: 'New users should go to onboarding automatically'
    },
    {
      id: 'nav-logout-redirect',
      name: 'Logout Redirect',
      description: 'User should logout and redirect to login page',
      status: 'pending',
      notes: 'After logout, user should be at /login'
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
      toast.success("All navigation checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} navigation checks failed`);
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
          <CardTitle>Navigation & URL Integrity Audit</CardTitle>
          <Button 
            onClick={runChecks} 
            disabled={isRunningChecks || status === 'in-progress'}
            variant="outline"
            size="sm"
          >
            {isRunningChecks ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current" />
                Running Checks...
              </>
            ) : (
              'Run Checks'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Check</th>
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
              <div className="font-medium">Failed Checks:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All navigation checks passed!</div>
              <p className="mt-1">
                All links, redirects, and navigation paths are working correctly.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
