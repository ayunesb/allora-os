
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Palette } from 'lucide-react';
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from 'sonner';
import { AuditComponentProps, AuditCheckItem } from './types';

export function AuditUX({ status, onStatusChange }: AuditComponentProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState<AuditCheckItem[]>([
    {
      id: 'ux-1',
      title: 'Mobile Responsiveness',
      description: 'Test on iOS Safari, Chrome Android',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-2',
      title: 'Tablet Responsiveness',
      description: 'iPad, Android tablet views clean',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-3',
      title: 'Desktop Responsiveness',
      description: 'Full-size desktop views clean',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-4',
      title: 'Accessibility (A11y)',
      description: 'Test contrast ratios, alt text for images, keyboard navigation',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-5',
      title: 'UX Flow',
      description: 'Smooth user journeys: onboarding → dashboard → actions',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-6',
      title: 'Consistent Branding',
      description: 'Allora AI logo, color scheme, typography consistent',
      status: 'pending',
      required: true
    },
    {
      id: 'ux-7',
      title: 'Empty States',
      description: 'Friendly messages when no strategies/leads/campaigns yet',
      status: 'pending',
      required: false
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
    const requiredPassed = items
      .filter(item => item.required)
      .every(item => item.status === 'passed');
    
    const overallStatus = allPassed ? 'passed' : requiredPassed ? 'passed' : 'failed';
    
    onStatusChange(overallStatus);
    
    if (allPassed) {
      toast.success('UI/UX Design Review passed!');
    } else if (requiredPassed) {
      toast.success('UI/UX Design Review passed with minor issues!');
    } else {
      toast.error('UI/UX Design Review failed. Please fix critical issues.');
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
            <Palette className="h-5 w-5 text-primary/80" />
            <CardTitle>UI/UX Design Review</CardTitle>
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
              'Run Review'
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
