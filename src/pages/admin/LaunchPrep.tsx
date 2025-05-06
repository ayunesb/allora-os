import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RunAuditButton } from "@/components/admin/RunAuditButton";
import { usePreLaunchValidation } from "@/hooks/usePreLaunchValidation";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, Rocket } from "lucide-react";
export default function LaunchPrep() {
  const { isValidating, validationResult, runValidation } =
    usePreLaunchValidation();
  const error = null; // Add an error placeholder to match the expected structure
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Launch Preparation
          </h1>
          <p className="text-muted-foreground mt-2">
            Ensure your system is ready for production deployment
          </p>
        </div>
        <RunAuditButton />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5 text-primary" />
            Pre-Launch Validation
          </CardTitle>
          <CardDescription>
            Run automated checks to validate production readiness
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Button
              onClick={runValidation}
              disabled={isValidating}
              className="w-full sm:w-auto"
            >
              {isValidating
                ? "Running Validation..."
                : "Run Production Readiness Check"}
            </Button>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 mt-0.5" />
                  <div>
                    <p className="font-semibold">Validation Error</p>
                    <p className="text-sm mt-1">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {validationResult && (
              <div className="mt-4 border rounded-md divide-y">
                <div className="p-4 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">
                      System Readiness:{" "}
                      {validationResult.ready ? "Ready" : "Not Ready"}
                    </h3>
                    {validationResult.ready ? (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <CheckCircle className="h-3 w-3" /> Ready
                      </span>
                    ) : (
                      <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1">
                        <AlertTriangle className="h-3 w-3" /> Issues Found
                      </span>
                    )}
                  </div>
                </div>

                {/* Issues section */}
                {validationResult.issues.length > 0 && (
                  <div className="p-4">
                    <h4 className="font-medium mb-2 text-destructive flex items-center gap-1">
                      <AlertTriangle className="h-4 w-4" /> Issues to Resolve
                    </h4>
                    <ul className="space-y-2">
                      {validationResult.issues.map((issue, index) => (
                        <li
                          key={index}
                          className="bg-destructive/10 border border-destructive/20 p-3 rounded-md text-sm"
                        >
                          <p className="font-medium">{issue.message}</p>
                          {issue.details && (
                            <div className="mt-1 text-muted-foreground">
                              <pre className="text-xs overflow-auto p-2 bg-background mt-1 rounded border">
                                {JSON.stringify(issue.details, null, 2)}
                              </pre>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Passed checks section */}
                {validationResult.passedChecks.length > 0 && (
                  <div className="p-4">
                    <h4 className="font-medium mb-2 text-green-600 flex items-center gap-1">
                      <CheckCircle className="h-4 w-4" /> Passed Checks
                    </h4>
                    <ul className="space-y-2">
                      {validationResult.passedChecks.map((check, index) => (
                        <li
                          key={index}
                          className="bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-800"
                        >
                          {check.message}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
