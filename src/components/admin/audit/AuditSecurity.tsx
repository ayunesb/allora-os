
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Shield } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditSecurity({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'sec-1',
      title: 'Row-Level Security (RLS) Policies',
      description: 'Only allow users to view their own data (users, leads, campaigns)',
      status: 'pending',
      required: true
    },
    {
      id: 'sec-2',
      title: 'Public Buckets/Storage',
      description: 'Only authorized users can access uploads (logo, docs)',
      status: 'pending',
      required: true
    },
    {
      id: 'sec-3',
      title: 'API Rate Limiting',
      description: 'Implement rate limits to prevent abuse',
      status: 'pending',
      required: true
    },
    {
      id: 'sec-4',
      title: 'Auth Flow',
      description: 'Test signup, login, password reset, and session expiration',
      status: 'pending',
      required: true
    },
    {
      id: 'sec-5',
      title: 'Database Schema',
      description: 'Validate all tables: users, companies, strategies, leads, campaigns, tasks',
      status: 'pending',
      required: true
    },
    {
      id: 'sec-6',
      title: 'Data Encryption',
      description: 'Data-at-rest and in-transit confirmed encrypted by Supabase',
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
      
      // Simulate test running (security tests take longer)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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
      toast.success('Security Audit passed!');
    } else {
      toast.error('Security Audit failed. Please review and fix issues.');
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
            <Shield className="h-5 w-5 text-primary/80" />
            <CardTitle>Supabase Backend & Security Audit</CardTitle>
          </div>
          <Button 
            onClick={runTest}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Auditing...
              </>
            ) : (
              'Run Audit'
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
