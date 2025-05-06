import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
export default function RunAudit() {
  const [isRunning, setIsRunning] = useState(false);
  const [auditResults, setAuditResults] = useState([]);
  const handleRunAudit = async () => {
    setIsRunning(true);
    try {
      // Wait for a simulated audit process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      // Simulate some audit results
      const mockResults = [
        {
          type: "security",
          message: "Two-factor authentication is not enabled",
          valid: false,
          severity: "warning",
        },
        {
          type: "performance",
          message:
            "All API endpoints are responding within acceptable time limits",
          valid: true,
        },
        {
          type: "compliance",
          message: "Privacy policy is up to date",
          valid: true,
        },
      ];
      setAuditResults(mockResults);
      toast.success("Audit Complete", {
        description: "System audit has been completed successfully.",
      });
    } catch (error) {
      console.error("Audit error:", error);
      toast.error("Audit Failed", {
        description:
          error instanceof Error ? error.message : "An unknown error occurred",
      });
    } finally {
      setIsRunning(false);
    }
  };
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">System Audit</h1>
      <p className="text-muted-foreground mb-4">
        Run a comprehensive audit to identify potential issues and ensure system
        health.
      </p>

      <Button onClick={handleRunAudit} disabled={isRunning}>
        {isRunning ? "Running Audit..." : "Run System Audit"}
      </Button>

      {auditResults.length > 0 && (
        <div className="mt-8 space-y-4">
          <h2 className="text-2xl font-semibold">Audit Results</h2>
          {auditResults.map((result, index) => (
            <Card key={index} className="border">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {result.type} Check
                </CardTitle>
                {result.valid ? (
                  <CheckCircle className="text-green-500 h-4 w-4" />
                ) : (
                  <AlertTriangle className="text-red-500 h-4 w-4" />
                )}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {result.message}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
