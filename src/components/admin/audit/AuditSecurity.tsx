import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Shield,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
export function AuditSecurity({ status, onStatusChange }) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState([
    {
      id: "sec-1",
      title: "JWT Authentication",
      description: "Token-based authentication is secure",
      status: "pending",
      required: true,
    },
    {
      id: "sec-2",
      title: "API Route Protection",
      description: "All API routes require authentication",
      status: "pending",
      required: true,
    },
    {
      id: "sec-3",
      title: "Rate Limiting",
      description: "API rate limiting is implemented",
      status: "pending",
      required: true,
    },
    {
      id: "sec-4",
      title: "SQL Injection Protection",
      description: "Database queries are properly parameterized",
      status: "pending",
      required: true,
    },
    {
      id: "sec-5",
      title: "Data Encryption",
      description: "Sensitive data is encrypted",
      status: "pending",
      required: true,
    },
    {
      id: "sec-6",
      title: "XSS Protection",
      description: "Protection against cross-site scripting",
      status: "pending",
      required: true,
    },
    {
      id: "sec-7",
      title: "GDPR Compliance",
      description: "User data handling meets GDPR requirements",
      status: "pending",
      required: true,
    },
    {
      id: "sec-8",
      title: "Query Performance",
      description: "Database queries execute within recommended time",
      status: "pending",
      required: true,
    },
  ]);
  const runTest = async () => {
    setIsRunning(true);
    try {
      // Simulate security testing
      for (let i = 0; i < items.length; i++) {
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "in-progress" } : item,
          ),
        );
        await new Promise((resolve) => setTimeout(resolve, 700));
        // For demo, let's identify the specific security issues mentioned by the user
        let passed = true;
        if (items[i].id === "sec-7") {
          // GDPR compliance issue
          passed = false;
        }
        if (items[i].id === "sec-8") {
          // Query performance issue
          passed = false;
        }
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? { ...item, status: passed ? "passed" : "failed" }
              : item,
          ),
        );
      }
      // Check overall status
      const allPassed = items.every((item) => item.status === "passed");
      onStatusChange(allPassed ? "passed" : "failed");
      if (allPassed) {
        toast.success("Security audit passed!");
      } else {
        toast.error("Security issues found! Please review and fix.");
      }
    } catch (error) {
      console.error("Security audit error:", error);
      onStatusChange("failed");
      toast.error("Error running security audit");
    } finally {
      setIsRunning(false);
    }
  };
  const getStatusIcon = (status) => {
    switch (status) {
      case "passed":
        return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "failed":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "in-progress":
        return <Loader2 className="h-4 w-4 animate-spin text-blue-500" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary/80" />
            <CardTitle>Security Audit</CardTitle>
          </div>
          <Button onClick={runTest} disabled={isRunning} size="sm">
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Scanning...
              </>
            ) : (
              "Run Security Scan"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="flex items-start space-x-2">
              <div className="mt-0.5">{getStatusIcon(item.status)}</div>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.title}</span>
                  {!item.required && (
                    <span className="text-xs bg-primary/10 text-primary/90 px-1.5 py-0.5 rounded">
                      Optional
                    </span>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">
                  {item.description}
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <Checkbox
                  id={item.id}
                  checked={item.status === "passed"}
                  disabled={isRunning}
                  onCheckedChange={(checked) => {
                    setItems((prev) =>
                      prev.map((i) =>
                        i.id === item.id
                          ? { ...i, status: checked ? "passed" : "failed" }
                          : i,
                      ),
                    );
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
