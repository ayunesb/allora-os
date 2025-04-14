
import React, { useEffect, useState } from 'react';
import PreLaunchAudit from './PreLaunchAudit';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function AuditDashboard() {
  const [lastAuditTimestamp, setLastAuditTimestamp] = useState<string | null>(null);
  const [auditResults, setAuditResults] = useState<any | null>(null);
  
  useEffect(() => {
    // Try to get the last audit timestamp and results from localStorage
    const lastAuditResultsStr = localStorage.getItem('lastAuditResults');
    if (lastAuditResultsStr) {
      try {
        const parsedResults = JSON.parse(lastAuditResultsStr);
        setLastAuditTimestamp(parsedResults.timestamp);
        setAuditResults(parsedResults.results);
      } catch (error) {
        console.error('Error parsing audit results:', error);
      }
    }
  }, []);
  
  // Get critical issues from the audit results
  const criticalIssues = auditResults?.issues?.filter((issue: any) => issue.severity === 'critical') || [];
  
  return (
    <div className="container py-6 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
      {lastAuditTimestamp && (
        <Alert variant={criticalIssues.length > 0 ? "destructive" : "default"} 
               className={criticalIssues.length > 0 ? "bg-red-50 dark:bg-red-900/20" : "bg-muted/50"}>
          <div className="flex items-center gap-2">
            {criticalIssues.length > 0 ? (
              <AlertTriangle className="h-4 w-4" />
            ) : (
              <CheckCircle2 className="h-4 w-4 text-green-500" />
            )}
            <AlertTitle>
              {criticalIssues.length > 0 
                ? `${criticalIssues.length} Critical Issues Found` 
                : "System Status: Ready"}
            </AlertTitle>
          </div>
          <AlertDescription className="mt-2">
            <div>Last audit performed: {new Date(lastAuditTimestamp).toLocaleString()}</div>
            
            {criticalIssues.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="font-medium">Critical issues that need attention:</div>
                <ul className="list-disc list-inside">
                  {criticalIssues.map((issue: any, idx: number) => (
                    <li key={idx} className="text-sm">
                      {issue.name}: {issue.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </AlertDescription>
        </Alert>
      )}
      
      <PreLaunchAudit />
      
      {auditResults && auditResults.issues && auditResults.issues.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Detected Issues</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {auditResults.issues.map((issue: any, idx: number) => (
                <div key={idx} className={`p-4 rounded-md ${issue.severity === 'critical' ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' : 'bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800'}`}>
                  <div className="flex items-center gap-2">
                    <AlertTriangle className={`h-5 w-5 ${issue.severity === 'critical' ? 'text-red-500' : 'text-amber-500'}`} />
                    <div className="font-medium">{issue.name}</div>
                    <div className="ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10">
                      {issue.severity}
                    </div>
                  </div>
                  <div className="mt-2 text-sm">{issue.message}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
