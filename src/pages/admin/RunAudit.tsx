
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunAuditStatus } from '@/components/admin/audit/RunAuditStatus';
import { useNavigate } from 'react-router-dom';
import { logAuditEvent } from '@/utils/auditLogger';
import { validateProductionReadiness } from '@/utils/launchValidator';
import { toast } from 'sonner';

export default function RunAudit() {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);
  const [criticalIssues, setCriticalIssues] = useState(0);
  const navigate = useNavigate();
  
  // Simulate the audit running process
  useEffect(() => {
    const startAudit = async () => {
      try {
        // Log the audit start event
        await logAuditEvent({
          action: 'SYSTEM_CHANGE',
          resource: 'system_audit',
          details: { type: 'full_audit', status: 'started' }
        });
        
        // Run actual validation checks in the background
        const validationResults = await validateProductionReadiness();
        
        // Calculate found issues
        const criticalIssuesFound = validationResults.issues.filter(i => i.severity === 'critical').length;
        setCriticalIssues(criticalIssuesFound);
        
        // Store detailed audit results in localStorage for retrieval on the audit page
        localStorage.setItem('lastAuditResults', JSON.stringify({
          timestamp: new Date().toISOString(),
          results: validationResults
        }));
        
        // Simulate progress updates
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + Math.floor(Math.random() * 5) + 3;
            
            if (newProgress >= 100) {
              clearInterval(interval);
              setTimeout(() => {
                setIsRunning(false);
                setAuditComplete(true);
                
                // Log the audit completion
                logAuditEvent({
                  action: 'SYSTEM_CHANGE',
                  resource: 'system_audit',
                  details: { 
                    type: 'full_audit', 
                    status: 'completed',
                    ready: validationResults.ready,
                    criticalIssues: criticalIssuesFound,
                    totalIssues: validationResults.issues.length
                  }
                });

                // Show toast notification with more detailed information
                if (validationResults.ready) {
                  toast.success('System audit completed successfully', {
                    description: validationResults.issues.length > 0 
                      ? `Found ${validationResults.issues.length} issues to review` 
                      : 'All systems are functioning properly'
                  });
                } else {
                  toast.error('System audit identified critical issues', {
                    description: `Found ${criticalIssuesFound} critical issues that need attention`
                  });
                }
                
                // Navigate back to audit page after a short delay
                setTimeout(() => navigate('/admin/audit'), 1500);
              }, 500);
              return 100;
            }
            
            return newProgress;
          });
        }, 400);
        
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error running audit:', error);
        toast.error('Error running system audit');
        navigate('/admin/audit');
      }
    };
    
    startAudit();
  }, [navigate]);
  
  return (
    <div className="container py-8 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-center">System Audit</CardTitle>
        </CardHeader>
        <CardContent>
          <RunAuditStatus 
            isRunning={isRunning} 
            progress={progress}
            auditComplete={auditComplete}
            criticalIssues={criticalIssues}
          />
        </CardContent>
      </Card>
    </div>
  );
}
