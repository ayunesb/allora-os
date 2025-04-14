
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, CreditCard, MessageSquare, Mail, Video, ShoppingBag, Zap } from 'lucide-react';
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

interface AuditIntegrationsProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditIntegrations: React.FC<AuditIntegrationsProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'int-stripe',
      name: 'Stripe Billing',
      description: 'Test payment processing',
      status: 'pending',
      notes: 'Create customer, handle payment, check webhook callbacks',
      icon: <CreditCard className="h-4 w-4" />
    },
    {
      id: 'int-twilio',
      name: 'Twilio WhatsApp',
      description: 'Test messaging',
      status: 'pending',
      notes: 'Send/Receive WhatsApp messages post onboarding',
      icon: <MessageSquare className="h-4 w-4" />
    },
    {
      id: 'int-postmark',
      name: 'Postmark Emails',
      description: 'Test email sending',
      status: 'pending',
      notes: 'Trigger Welcome Emails and Campaign Emails',
      icon: <Mail className="h-4 w-4" />
    },
    {
      id: 'int-heygen',
      name: 'Heygen AI Videos',
      description: 'Test video generation',
      status: 'pending',
      notes: 'Generate intro video scripts based on company profile',
      icon: <Video className="h-4 w-4" />
    },
    {
      id: 'int-shopify',
      name: 'Shopify API (if used)',
      description: 'Test product sync',
      status: 'pending',
      notes: 'Sync sample products/orders',
      icon: <ShoppingBag className="h-4 w-4" />
    },
    {
      id: 'int-zapier',
      name: 'Zapier Flows',
      description: 'Test automation',
      status: 'pending',
      notes: 'Test each webhook automatically without user clicks',
      icon: <Zap className="h-4 w-4" />
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
      toast.info(`Testing ${check.name} integration...`);
      
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
      toast.success("All integration checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} integration checks failed`);
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
          <CardTitle>Critical API Integrations Testing</CardTitle>
          <Button 
            onClick={runChecks} 
            disabled={isRunningChecks || status === 'in-progress'}
            variant="outline"
            size="sm"
          >
            {isRunningChecks ? (
              <>
                <div className="h-4 w-4 mr-2 animate-spin rounded-full border-b-2 border-current" />
                Testing Integrations...
              </>
            ) : (
              'Run Integration Tests'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 font-medium">Integration</th>
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
              <div className="font-medium">Integration Issues:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>{check.name}</li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All integration tests passed!</div>
              <p className="mt-1">
                All third-party integrations are working correctly.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
