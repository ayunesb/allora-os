import React, { useEffect, useState } from "react";
import PreLaunchAudit from "./PreLaunchAudit";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  AlertTriangle,
  CheckCircle2,
  Database,
  Shield,
  FileText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
export default function AuditDashboard() {
  const [lastAuditTimestamp, setLastAuditTimestamp] = useState(null);
  const [auditResults, setAuditResults] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    // Try to get the last audit timestamp and results from localStorage
    const lastAuditResultsStr = localStorage.getItem("lastAuditResults");
    if (lastAuditResultsStr) {
      try {
        const parsedResults = JSON.parse(lastAuditResultsStr);
        setLastAuditTimestamp(parsedResults.timestamp);
        setAuditResults(parsedResults.results);
      } catch (error) {
        console.error("Error parsing audit results:", error);
      }
    }
  }, []);
  // Get critical issues from the audit results
  const criticalIssues =
    auditResults?.issues?.filter((issue) => issue.severity === "critical") ||
    [];
  const warningIssues =
    auditResults?.issues?.filter((issue) => issue.severity === "warning") || [];
  const runNewAudit = () => {
    navigate("/admin/run-audit");
  };
  return (
    <div className="container py-6 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6">
      {lastAuditTimestamp && (
        <Alert
          variant={criticalIssues.length > 0 ? "destructive" : "default"}
          className={
            criticalIssues.length > 0
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-muted/50"
          }
        >
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
            <div>
              Last audit performed:{" "}
              {new Date(lastAuditTimestamp).toLocaleString()}
            </div>

            {criticalIssues.length > 0 && (
              <div className="mt-2 space-y-1">
                <div className="font-medium">
                  Critical issues that need attention:
                </div>
                <ul className="list-disc list-inside">
                  {criticalIssues.map((issue, idx) => (
                    <li key={idx} className="text-sm">
                      {issue.name}: {issue.message}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mt-4">
              <Button onClick={runNewAudit} size="sm" variant="outline">
                Run New Audit
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}

      <PreLaunchAudit />

      {auditResults &&
        auditResults.issues &&
        auditResults.issues.length > 0 && (
          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                Detected Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {criticalIssues.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-red-600 dark:text-red-400">
                      Critical Issues
                    </h3>
                    {criticalIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                          <div className="font-medium">{issue.name}</div>
                          <div className="ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10">
                            {issue.severity}
                          </div>
                        </div>
                        <div className="mt-2 text-sm">{issue.message}</div>
                        {issue.details && (
                          <div className="mt-2 text-xs bg-red-100 dark:bg-red-800/30 p-2 rounded">
                            <div className="font-medium mb-1">Details:</div>
                            <div className="whitespace-pre-wrap font-mono">
                              {typeof issue.details === "object"
                                ? JSON.stringify(issue.details, null, 2)
                                : issue.details}
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {warningIssues.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-amber-600 dark:text-amber-400">
                      Warnings
                    </h3>
                    {warningIssues.map((issue, idx) => (
                      <div
                        key={idx}
                        className="p-4 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800"
                      >
                        <div className="flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-amber-500" />
                          <div className="font-medium">{issue.name}</div>
                          <div className="ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10">
                            {issue.severity}
                          </div>
                        </div>
                        <div className="mt-2 text-sm">{issue.message}</div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

      {auditResults && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Database className="h-4 w-4 text-primary/80" />
                Database Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {auditResults.checks?.performance?.valid ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Queries execute within recommended time
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-amber-600">
                    <AlertTriangle className="h-4 w-4" />
                    Some queries exceed recommended execution time
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Shield className="h-4 w-4 text-primary/80" />
                Security Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {auditResults.checks?.security?.valid ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    Authentication mechanisms are properly secured
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Security vulnerabilities detected
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary/80" />
                GDPR Compliance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm">
                {auditResults.checks?.gdpr?.valid ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle2 className="h-4 w-4" />
                    User data handling meets GDPR requirements
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-red-600">
                    <AlertTriangle className="h-4 w-4" />
                    Some user data handling doesn't meet GDPR requirements
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
