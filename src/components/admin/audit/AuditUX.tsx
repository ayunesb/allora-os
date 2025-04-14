
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Smartphone, Tablet, Monitor } from 'lucide-react';
import { toast } from 'sonner';

type CheckStatus = 'pending' | 'passed' | 'failed';
type CategoryStatus = 'pending' | 'in-progress' | 'passed' | 'failed';

interface CheckItem {
  id: string;
  name: string;
  description: string;
  status: CheckStatus;
  notes?: string;
  icon?: React.ReactNode;
}

interface AuditUXProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditUX: React.FC<AuditUXProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'ux-mobile',
      name: 'Mobile Responsiveness',
      description: 'Test on iOS Safari, Chrome Android',
      status: 'pending',
      notes: 'All pages should be fully responsive on mobile',
      icon: <Smartphone className="h-4 w-4" />
    },
    {
      id: 'ux-tablet',
      name: 'Tablet Responsiveness',
      description: 'iPad, Android tablet views',
      status: 'pending',
      notes: 'All pages should work well on tablets',
      icon: <Tablet className="h-4 w-4" />
    },
    {
      id: 'ux-desktop',
      name: 'Desktop Responsiveness',
      description: 'Full-size desktop views',
      status: 'pending',
      notes: 'Optimized for large screens',
      icon: <Monitor className="h-4 w-4" />
    },
    {
      id: 'ux-a11y',
      name: 'Accessibility (A11y)',
      description: 'Test accessibility features',
      status: 'pending',
      notes: 'Test contrast ratios, alt text for images, keyboard navigation'
    },
    {
      id: 'ux-flow',
      name: 'UX Flow',
      description: 'Verify smooth user journeys',
      status: 'pending',
      notes: 'Smooth flows: onboarding → dashboard → actions'
    },
    {
      id: 'ux-branding',
      name: 'Consistent Branding',
      description: 'Check branding elements',
      status: 'pending',
      notes: 'Allora AI logo, color scheme, typography consistent'
    },
    {
      id: 'ux-empty',
      name: 'Empty States',
      description: 'Check empty state displays',
      status: 'pending',
      notes: 'Friendly messages when no strategies/leads/campaigns yet'
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
      toast.success("All UX checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} UX checks failed`);
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
          <CardTitle>UI/UX Design Review</CardTitle>
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
                <th className="text-left py-2 font-medium">Area</th>
                <th className="text-left py-2 font-medium w-24">Status</th>
                <th className="text-left py-2 font-medium">Notes</th>
              </tr>
            </thead>
            <tbody>
              {checks.map((check) => (
                <tr key={check.id} className="border-b">
                  <td className="py-3">
                    <div className="font-medium flex items-center gap-2">
                      {check.icon}
                      {check.name}
                    </div>
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
              <div className="font-medium">UX Issues:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All UI/UX checks passed!</div>
              <p className="mt-1">
                The application provides a good user experience across all devices.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
