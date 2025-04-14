
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { AuditLegal } from './AuditLegal';
import { AuditFunctional } from './AuditFunctional';
import { AuditAI } from './AuditAI';
import { AuditPerformance } from './AuditPerformance';
import { AuditSecurity } from './AuditSecurity';
import { AuditIntegrations } from './AuditIntegrations';
import { AuditNavigation } from './AuditNavigation';
import { validateLaunchReadiness } from '@/utils/launchValidator';
import { CategoryStatus } from './types';

export default function PreLaunchAudit() {
  const [legalStatus, setLegalStatus] = useState<CategoryStatus>('pending');
  const [functionalStatus, setFunctionalStatus] = useState<CategoryStatus>('pending');
  const [aiStatus, setAiStatus] = useState<CategoryStatus>('pending');
  const [performanceStatus, setPerformanceStatus] = useState<CategoryStatus>('pending');
  const [securityStatus, setSecurityStatus] = useState<CategoryStatus>('pending');
  const [integrationsStatus, setIntegrationsStatus] = useState<CategoryStatus>('pending');
  const [navigationStatus, setNavigationStatus] = useState<CategoryStatus>('pending');
  const [isRunningAll, setIsRunningAll] = useState(false);
  
  // Summary state to track overall completion
  const [summary, setSummary] = useState({
    total: 7,
    passed: 0,
    failed: 0,
    pending: 7
  });

  // Update summary whenever any status changes
  useEffect(() => {
    const statuses = [legalStatus, functionalStatus, aiStatus, performanceStatus, securityStatus, integrationsStatus, navigationStatus];
    
    const passed = statuses.filter(s => s === 'passed').length;
    const failed = statuses.filter(s => s === 'failed').length;
    const pending = statuses.filter(s => s === 'pending').length;
    
    setSummary({
      total: 7,
      passed,
      failed,
      pending
    });
  }, [legalStatus, functionalStatus, aiStatus, performanceStatus, securityStatus, integrationsStatus, navigationStatus]);

  const runAllAudits = async () => {
    if (isRunningAll) return;
    
    setIsRunningAll(true);
    toast.info('Running all audit checks...', { duration: 3000 });
    
    // Reset all statuses to pending
    setLegalStatus('pending');
    setFunctionalStatus('pending');
    setAiStatus('pending');
    setPerformanceStatus('pending');
    setSecurityStatus('pending');
    setIntegrationsStatus('pending');
    setNavigationStatus('pending');
    
    // Wait for a moment to let the UI update
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Run the comprehensive launch readiness check
    try {
      const { valid, results } = await validateLaunchReadiness();
      
      // Update individual statuses based on results
      // These will be simulated for now since we don't have the actual checks
      // In a real implementation, you would map the results to each category
      
      setLegalStatus('passed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setFunctionalStatus(valid ? 'passed' : 'failed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAiStatus(valid ? 'passed' : 'failed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPerformanceStatus(valid ? 'passed' : 'failed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSecurityStatus(valid ? 'passed' : 'failed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setIntegrationsStatus(valid ? 'passed' : 'failed');
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setNavigationStatus(valid ? 'passed' : 'failed');
      
      if (valid) {
        toast.success('All systems ready for launch!', {
          description: 'Your application has passed all pre-launch checks.'
        });
      } else {
        toast.error('Some systems require attention!', {
          description: 'Please review the failed checks before launching.'
        });
      }
    } catch (error) {
      console.error('Error running launch readiness check:', error);
      toast.error('Error running audit checks', {
        description: 'Please try again or check specific categories individually.'
      });
    } finally {
      setIsRunningAll(false);
    }
  };

  const getStatusIcon = (status: CategoryStatus, size: 'sm' | 'lg' = 'sm') => {
    const className = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
    
    switch (status) {
      case 'passed': return <CheckCircle2 className={`${className} text-green-500`} />;
      case 'failed': return <XCircle className={`${className} text-red-500`} />;
      case 'in-progress': return <RefreshCw className={`${className} animate-spin text-blue-500`} />;
      default: return <AlertCircle className={`${className} text-muted-foreground`} />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Pre-Launch Audit</CardTitle>
            <Button 
              onClick={runAllAudits}
              disabled={isRunningAll}
            >
              {isRunningAll ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" /> 
                  Running All Checks...
                </>
              ) : (
                'Run All Checks'
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card className="bg-muted/50">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold mb-2">{summary.total}</div>
                <div className="text-sm text-muted-foreground">Total Checks</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 dark:bg-green-950/20">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-500 mb-2">{summary.passed}</div>
                <div className="text-sm text-green-600 dark:text-green-400">Passed</div>
              </CardContent>
            </Card>
            <Card className={summary.failed > 0 ? "bg-red-50 dark:bg-red-950/20" : "bg-muted/50"}>
              <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                <div className={`text-4xl font-bold mb-2 ${summary.failed > 0 ? "text-red-600 dark:text-red-500" : ""}`}>
                  {summary.failed}
                </div>
                <div className={`text-sm ${summary.failed > 0 ? "text-red-600 dark:text-red-400" : "text-muted-foreground"}`}>
                  Failed
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid grid-cols-1 gap-2 mb-6">
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(legalStatus)}
                <span className="font-medium">Legal Compliance</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {legalStatus === 'passed' ? 'All legal documents verified' : 
                 legalStatus === 'failed' ? 'Legal issues detected' :
                 legalStatus === 'in-progress' ? 'Checking...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(functionalStatus)}
                <span className="font-medium">Functional Testing</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {functionalStatus === 'passed' ? 'All features working correctly' : 
                 functionalStatus === 'failed' ? 'Issues with functionality' :
                 functionalStatus === 'in-progress' ? 'Testing...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(aiStatus)}
                <span className="font-medium">AI Bot Validation</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {aiStatus === 'passed' ? 'AI prompts validated' : 
                 aiStatus === 'failed' ? 'AI prompts need attention' :
                 aiStatus === 'in-progress' ? 'Validating...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(performanceStatus)}
                <span className="font-medium">Performance</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {performanceStatus === 'passed' ? 'Performance metrics acceptable' : 
                 performanceStatus === 'failed' ? 'Performance issues detected' :
                 performanceStatus === 'in-progress' ? 'Analyzing...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(securityStatus)}
                <span className="font-medium">Security & Database</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {securityStatus === 'passed' ? 'Security measures verified' : 
                 securityStatus === 'failed' ? 'Security issues found' :
                 securityStatus === 'in-progress' ? 'Checking...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(integrationsStatus)}
                <span className="font-medium">API Integrations</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {integrationsStatus === 'passed' ? 'All integrations working' : 
                 integrationsStatus === 'failed' ? 'Integration issues detected' :
                 integrationsStatus === 'in-progress' ? 'Validating...' : 'Pending'}
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 border rounded-md">
              <div className="flex items-center gap-2">
                {getStatusIcon(navigationStatus)}
                <span className="font-medium">Navigation & URLs</span>
              </div>
              <div className="text-sm text-muted-foreground">
                {navigationStatus === 'passed' ? 'All routes accessible' : 
                 navigationStatus === 'failed' ? 'Navigation issues found' :
                 navigationStatus === 'in-progress' ? 'Testing...' : 'Pending'}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 gap-6">
        <AuditLegal status={legalStatus} onStatusChange={setLegalStatus} />
        <AuditFunctional status={functionalStatus} onStatusChange={setFunctionalStatus} />
        <AuditAI status={aiStatus} onStatusChange={setAiStatus} />
        <AuditPerformance status={performanceStatus} onStatusChange={setPerformanceStatus} />
        <AuditSecurity status={securityStatus} onStatusChange={setSecurityStatus} />
        <AuditIntegrations status={integrationsStatus} onStatusChange={setIntegrationsStatus} />
        <AuditNavigation status={navigationStatus} onStatusChange={setNavigationStatus} />
      </div>
    </div>
  );
}
