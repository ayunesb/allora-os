
import React, { useEffect, useState } from 'react';
import PreLaunchAudit from './PreLaunchAudit';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InfoIcon } from 'lucide-react';

export default function AuditDashboard() {
  const [lastAuditTimestamp, setLastAuditTimestamp] = useState<string | null>(null);
  
  useEffect(() => {
    // Try to get the last audit timestamp from localStorage
    const lastAuditResults = localStorage.getItem('lastAuditResults');
    if (lastAuditResults) {
      try {
        const auditData = JSON.parse(lastAuditResults);
        setLastAuditTimestamp(auditData.timestamp);
      } catch (error) {
        console.error('Error parsing audit results:', error);
      }
    }
  }, []);
  
  return (
    <div className="container py-6 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
      {lastAuditTimestamp && (
        <Alert variant="default" className="bg-muted/50">
          <InfoIcon className="h-4 w-4" />
          <AlertDescription>
            Last audit performed: {new Date(lastAuditTimestamp).toLocaleString()}
          </AlertDescription>
        </Alert>
      )}
      
      <PreLaunchAudit />
    </div>
  );
}
