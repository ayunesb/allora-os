
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunAuditStatus } from '@/components/admin/audit/RunAuditStatus';
import { useNavigate } from 'react-router-dom';
import { logAuditEvent } from '@/utils/auditLogger';
import { validateProductionReadiness } from '@/utils/productionReadiness';
import { toast } from 'sonner';

export default function RunAudit() {
  const [isRunning, setIsRunning] = useState(true);
  const [progress, setProgress] = useState(0);
  const [auditComplete, setAuditComplete] = useState(false);
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
        
        // Store audit results in localStorage for retrieval on the audit page
        localStorage.setItem('lastAuditResults', JSON.stringify({
          timestamp: new Date().toISOString(),
          results: validationResults
        }));
        
        // Simulate progress updates
        const interval = setInterval(() => {
          setProgress(prev => {
            const newProgress = prev + Math.floor(Math.random() * 10);
            
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
                    criticalIssues: validationResults.issues.filter(i => i.severity === 'critical').length
                  }
                });

                // Show toast notification
                toast.success('System audit completed successfully', {
                  description: 'View detailed results on the audit page'
                });
                
                // Navigate back to audit page after a short delay
                setTimeout(() => navigate('/admin/audit'), 1500);
              }, 500);
              return 100;
            }
            
            return newProgress;
          });
        }, 800);
        
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
          />
        </CardContent>
      </Card>
    </div>
  );
}
