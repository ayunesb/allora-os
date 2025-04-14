
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2 } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditFunctional({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'func-1',
      title: 'Signup Flow',
      description: 'Complete user signup and onboarding, collect Company Name, Industry, Goals',
      status: 'pending',
      required: true
    },
    {
      id: 'func-2',
      title: 'Onboarding Flow',
      description: 'Confirm saves to Supabase properly',
      status: 'pending',
      required: true
    },
    {
      id: 'func-3',
      title: 'Dashboard Load',
      description: 'Test with dummy data (strategies, campaigns, leads)',
      status: 'pending',
      required: true
    },
    {
      id: 'func-4',
      title: 'AI Strategy Generation',
      description: 'Trigger prompt after onboarding, check result',
      status: 'pending',
      required: true
    },
    {
      id: 'func-5',
      title: 'Campaign Creation Flow',
      description: 'Create dummy campaign and verify',
      status: 'pending',
      required: true
    },
    {
      id: 'func-6',
      title: 'Call Scripts Creation',
      description: 'Verify AI-generated call scripts',
      status: 'pending',
      required: true
    },
    {
      id: 'func-7',
      title: 'Lead Management',
      description: 'Add, edit, delete a lead',
      status: 'pending',
      required: true
    },
    {
      id: 'func-8',
      title: 'Admin Users CRUD',
      description: 'Add new users, update role, delete users',
      status: 'pending',
      required: true
    },
    {
      id: 'func-9',
      title: 'Zapier Webhooks',
      description: 'Test automatic POST triggers from real actions',
      status: 'pending',
      required: true
    },
    {
      id: 'func-10',
      title: 'Stripe Payment',
      description: 'Test checkout session, subscriptions management',
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
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set random result (90% pass rate for demo)
      const passed = Math.random() < 0.9;
      
      setItems(prev => prev.map((item, idx) => 
        idx === i ? { ...item, status: passed ? 'passed' : 'failed' } : item
      ));
    }
    
    setIsRunning(false);
    
    // Check results
    const allPassed = items.every(item => item.status === 'passed');
    const overallStatus = allPassed ? 'passed' : 'failed';
    
    onStatusChange(overallStatus);
    
    if (allPassed) {
      toast.success('Functional Testing passed!');
    } else {
      toast.error('Functional Testing failed. Please review and fix issues.');
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
          <CardTitle>Functional Testing: End-to-End</CardTitle>
          <Button 
            onClick={runTest}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Running...
              </>
            ) : (
              'Run Test'
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-2">
              <div className="mt-0.5">
                {getStatusIcon(item.status)}
              </div>
              <div className="space-y-1">
                <div className="text-sm font-medium">{item.title}</div>
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
