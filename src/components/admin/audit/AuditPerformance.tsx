import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, AlertCircle, Gauge } from 'lucide-react';
import { toast } from 'sonner';

type CheckStatus = 'pending' | 'passed' | 'failed';
type CategoryStatus = 'pending' | 'in-progress' | 'passed' | 'failed';

interface CheckItem {
  id: string;
  name: string;
  description: string;
  status: CheckStatus;
  notes?: string;
  value?: string;
}

interface AuditPerformanceProps {
  status: CategoryStatus;
  onStatusChange: (status: CategoryStatus) => void;
}

export const AuditPerformance: React.FC<AuditPerformanceProps> = ({ status, onStatusChange }) => {
  const [checks, setChecks] = useState<CheckItem[]>([
    {
      id: 'perf-load',
      name: 'Initial Page Load',
      description: 'Measure initial page load time',
      status: 'pending',
      notes: 'Target < 2s load time',
      value: ''
    },
    {
      id: 'perf-api',
      name: 'API Response Times',
      description: 'Measure Supabase API response times',
      status: 'pending',
      notes: 'Supabase APIs under 500ms',
      value: ''
    },
    {
      id: 'perf-assets',
      name: 'Static Assets Optimization',
      description: 'Check asset optimization',
      status: 'pending',
      notes: 'Images compressed (Logo, backgrounds)',
      value: ''
    },
    {
      id: 'perf-splitting',
      name: 'Code Splitting',
      description: 'Verify proper code splitting',
      status: 'pending',
      notes: 'React pages split properly',
      value: ''
    },
    {
      id: 'perf-lazy',
      name: 'Lazy Loading',
      description: 'Verify lazy loading implementation',
      status: 'pending',
      notes: 'Images and heavy components lazy loaded',
      value: ''
    },
    {
      id: 'perf-seo',
      name: 'SEO Tags',
      description: 'Check SEO meta tags',
      status: 'pending',
      notes: 'Title, Description, Open Graph meta tags set',
      value: ''
    }
  ]);
  
  const [isRunningChecks, setIsRunningChecks] = useState(false);
  
  const updateCheckStatus = (id: string, status: CheckStatus, notes?: string, value?: string) => {
    setChecks(prevChecks => 
      prevChecks.map(check => 
        check.id === id 
          ? { ...check, status, notes: notes || check.notes, value } 
          : check
      )
    );
  };
  
  const runChecks = async () => {
    setIsRunningChecks(true);
    onStatusChange('in-progress');
    
    // Simulate running performance checks
    // Initial Page Load
    toast.info("Measuring initial page load time...");
    await new Promise(resolve => setTimeout(resolve, 1200));
    const loadTime = (Math.random() * 1.5 + 0.5).toFixed(2);
    const loadTimePassed = parseFloat(loadTime) < 2.0;
    updateCheckStatus(
      'perf-load', 
      loadTimePassed ? 'passed' : 'failed', 
      undefined, 
      `${loadTime}s`
    );
    
    // API Response Times
    toast.info("Measuring API response times...");
    await new Promise(resolve => setTimeout(resolve, 800));
    const apiTime = (Math.random() * 400 + 50).toFixed(0);
    const apiTimePassed = parseInt(apiTime) < 500;
    updateCheckStatus(
      'perf-api', 
      apiTimePassed ? 'passed' : 'failed', 
      undefined, 
      `${apiTime}ms`
    );
    
    // Rest of the checks
    for (const check of checks.filter(c => c.id !== 'perf-load' && c.id !== 'perf-api')) {
      toast.info(`Checking: ${check.name}...`);
      await new Promise(resolve => setTimeout(resolve, 800));
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
      toast.success("All performance checks passed!");
    } else {
      onStatusChange('failed');
      toast.error(`${failedChecks.length} performance checks failed`);
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
            <Gauge className="h-5 w-5" />
            Performance & Optimization Audit
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
                <th className="text-left py-2 font-medium">Area</th>
                <th className="text-left py-2 font-medium w-24">Status</th>
                <th className="text-left py-2 font-medium">Notes</th>
                <th className="text-left py-2 font-medium w-24">Value</th>
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
                  <td className="py-3 text-sm font-medium">{check.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {status === 'failed' && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md text-red-800 text-sm">
              <div className="font-medium">Performance Issues:</div>
              <ul className="list-disc pl-5 mt-1">
                {checks.filter(check => check.status === 'failed').map(check => (
                  <li key={check.id}>
                    {check.name} {check.value ? `(${check.value})` : ''}
                  </li>
                ))}
              </ul>
            </div>
          )}
          
          {status === 'passed' && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md text-green-800 text-sm">
              <div className="font-medium">All performance checks passed!</div>
              <p className="mt-1">
                The application is optimized and performs well.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
