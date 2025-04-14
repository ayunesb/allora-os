
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Brain } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditAI({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'ai-1',
      title: 'AI Strategy Bot',
      description: 'Generates proper strategies based on onboarding inputs',
      status: 'pending',
      required: true
    },
    {
      id: 'ai-2',
      title: 'AI Campaign Bot',
      description: 'Suggests campaigns with platforms and budgets',
      status: 'pending',
      required: true
    },
    {
      id: 'ai-3',
      title: 'AI Calling Bot',
      description: 'Generates correct cold call scripts and follow-ups',
      status: 'pending',
      required: true
    },
    {
      id: 'ai-4',
      title: 'AI Debating Bots',
      description: 'Shows debate conversations properly',
      status: 'pending',
      required: true
    },
    {
      id: 'ai-5',
      title: 'Risk Level Handling',
      description: 'Adapts strategies based on Low/Medium/High risk setting',
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
      
      // Simulate test running (AI testing takes longer)
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
      toast.success('AI Bot Prompt Validation passed!');
    } else {
      toast.error('AI Bot Prompt Validation failed. Please review and fix issues.');
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
            <Brain className="h-5 w-5 text-primary/80" />
            <CardTitle>AI Bot Prompt Validation</CardTitle>
          </div>
          <Button 
            onClick={runTest}
            disabled={isRunning}
            size="sm"
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Testing Prompts...
              </>
            ) : (
              'Run Validation'
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
