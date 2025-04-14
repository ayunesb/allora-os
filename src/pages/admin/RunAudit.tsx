
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RunAuditStatus } from '@/components/admin/audit/RunAuditStatus';
import { useNavigate } from 'react-router-dom';
import { logAuditEvent } from '@/utils/auditLogger';

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
                  details: { type: 'full_audit', status: 'completed' }
                });
              }, 500);
              return 100;
            }
            
            return newProgress;
          });
        }, 800);
        
        return () => clearInterval(interval);
      } catch (error) {
        console.error('Error running audit:', error);
      }
    };
    
    startAudit();
  }, []);
  
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
