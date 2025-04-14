
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Plug } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditIntegrations({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'int-1',
      title: 'Supabase Connection',
      description: 'Database connection is active',
      status: 'pending',
      required: true
    },
    {
      id: 'int-2',
      title: 'Authentication Integration',
      description: 'Auth provider integration works',
      status: 'pending',
      required: true
    },
    {
      id: 'int-3',
      title: 'OpenAI Integration',
      description: 'AI service connection is active',
      status: 'pending',
      required: true
    },
    {
      id: 'int-4',
      title: 'Stripe Integration',
      description: 'Payment processing is functioning',
      status: 'pending',
      required: false
    },
    {
      id: 'int-5',
      title: 'Email Provider',
      description: 'Email notifications can be sent',
      status: 'pending',
      required: true
    }
  ]);

  const runTest = async () => {
    setIsRunning(true);
    
    try {
      // Check each integration
      for (let i = 0; i < items.length; i++) {
        setItems(prev => prev.map((item, idx) => 
          idx === i ? { ...item, status: 'in-progress' } : item
        ));
        
        await new Promise(resolve => setTimeout(resolve, 600));
        
        // For demo purposes, let's pass all but Stripe
        const passed = items[i].id !== 'int-4';
        
        setItems(prev => prev.map((item, idx) => 
          idx === i ? { ...item, status: passed ? 'passed' : 'failed' } : item
        ));
      }
      
      // Check if all required integrations pass
      const requiredItems = items.filter(item => item.required);
      const allRequiredPassed = requiredItems.every(item => {
        const updatedItem = items.find(i => i.id === item.id);
        return updatedItem?.status === 'passed';
      });
      
      onStatusChange(allRequiredPassed ? 'passed' : 'failed');
      
      if (allRequiredPassed) {
        toast.success('Integrations check passed!');
      } else {
        toast.error('Some integrations failed! Please review and fix.');
      }
    } catch (error) {
      console.error('Integrations check error:', error);
      onStatusChange('failed');
      toast.error('Error checking integrations');
    } finally {
      setIsRunning(false);
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
            <Plug className="h-5 w-5 text-primary/80" />
            <CardTitle>Integrations Check</CardTitle>
          </div>
          <Button 
            onClick={runTest}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Checking...
              </>
            ) : (
              'Test Integrations'
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
