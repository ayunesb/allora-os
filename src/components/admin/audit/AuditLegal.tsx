
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, FileText } from 'lucide-react';
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

interface AuditLegalProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditLegal: React.FC<AuditLegalProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'legal-terms',
      name: '/legal Terms Page',
      description: 'Check Terms of Service',
      status: 'pending',
      notes: 'Updated Terms of Service (support@all-or-a.com, 3-day cancellation)'
    },
    {
      id: 'legal-privacy',
      name: '/privacy Policy Page',
      description: 'Check Privacy Policy',
      status: 'pending',
      notes: 'GDPR/CCPA Compliant'
    },
    {
      id: 'legal-cookies',
      name: '/cookies Policy Page',
      description: 'Check Cookies Policy',
      status: 'pending',
      notes: 'Transparent cookies usage'
    },
    {
      id: 'legal-dpa',
      name: 'Data Processing Addendum (DPA)',
      description: 'Check DPA availability',
      status: 'pending',
      notes: 'Prepared if needed for EU customers'
    },
    {
      id: 'legal-stripe',
      name: 'Stripe Terms Acceptance',
      description: 'Check billing terms',
      status: 'pending',
      notes: 'Users must accept Billing Terms at checkout'
    },
    {
      id: 'legal-whatsapp',
      name: 'Email Opt-In for WhatsApp',
      description: 'Check messaging consent',
      status: 'pending',
      notes: 'Explicit opt-in checkbox added before WhatsApp messaging'
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
      toast.success("All legal compliance checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} legal compliance checks failed`);
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
            <FileText className="h-5 w-5" />
            Legal Compliance Check
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
                <th className="text-left py-2 font-medium">Item</th>
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
              <div className="font-medium">Legal Compliance Issues:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
              <p className="mt-2 font-medium">
                ⚠️ These legal compliance issues must be fixed before launch!
              </p>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All legal compliance checks passed!</div>
              <p className="mt-1">
                All required legal documents and compliance measures are in place.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
