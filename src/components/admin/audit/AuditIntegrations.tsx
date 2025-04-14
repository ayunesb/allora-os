
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Settings } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditIntegrations({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'int-1',
      title: 'Stripe Billing',
      description: 'Create customer, handle payment, check webhook callbacks',
      status: 'pending',
      required: true
    },
    {
      id: 'int-2',
      title: 'Twilio WhatsApp',
      description: 'Send/Receive WhatsApp messages post onboarding',
      status: 'pending',
      required: true
    },
    {
      id: 'int-3',
      title: 'Postmark Emails',
      description: 'Trigger Welcome Emails and Campaign Emails',
      status: 'pending',
      required: true
    },
    {
      id: 'int-4',
      title: 'Heygen AI Videos',
      description: 'Generate intro video scripts based on company profile',
      status: 'pending',
      required: false
    },
    {
      id: 'int-5',
      title: 'Shopify API',
      description: 'Sync sample products/orders (if used)',
      status: 'pending',
      required: false
    },
    {
      id: 'int-6',
      title: 'Zapier Flows',
      description: 'Test each webhook automatically without user clicks',
      status: 'pending',
      required: true
    }
  ]);

  const runTest = async () => {
    setIsRunning(true);
    
    // Reset all items to pending
    setItems(prev => prev.map(item => ({ ...item, status: 'pending' })));
    
    // Simulate testing each item sequentially
    for (let i = 0; i < items.length; i++) {
      // Update current item to in-progress
      setItems(prev => prev.map((item, idx) => 
        idx === i ? { ...item, status: 'in-progress' } : item
      ));
      
      // Simulate test running
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Set random result (80% pass rate for demo - integrations can be finicky)
      const passed = Math.random() < 0.8;
      
      setItems(prev => prev.map((item, idx) => 
        idx === i ? { ...item, status: passed ? 'passed' : 'failed' } : item
      ));
    }
    
    setIsRunning(false);
    
    // Check results
    const allPassed = items.every(item => item.status === 'passed');
    const requiredPassed = items
      .filter(item => item.required)
      .every(item => item.status === 'passed');
    
    const overallStatus = allPassed ? 'passed' : requiredPassed ? 'passed' : 'failed';
    
    onStatusChange(overallStatus);
    
    if (allPassed) {
      toast.success('API Integrations Testing passed!');
    } else if (requiredPassed) {
      toast.success('Critical API Integrations Testing passed with minor issues!');
    } else {
      toast.error('API Integrations Testing failed. Please fix critical issues.');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'passed': return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case 'failed': return <XCircle className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5 text-primary/80" />
            <CardTitle>Critical API Integrations Testing</CardTitle>
          </div>
          <Button 
            onClick={runTest}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing...
              </>
            ) : (
              'Run Tests'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div 
              key={item.id} 
              className="flex items-start space-x-2"
            >
              <div className="mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.title}</span>
                  {!item.required && (
                    <span className="text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded">Optional</span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{item.description}</div>
              </div>
              <div className="ml-auto flex items-center">
                <Checkbox 
                  id={item.id}
                  checked={item.status === 'passed'}
                  disabled={isRunning}
                  onCheckedChange={(checked) => {
                    setItems(prev => prev.map(i => 
                      i.id === item.id ? { ...i, status: checked ? 'passed' : 'failed' } : i
                    ));
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
