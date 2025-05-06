import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Brain,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
export function AuditAI({ status, onStatusChange }) {
  const [isRunning, setIsRunning] = useState(false);
  const [items, setItems] = useState([
    {
      id: "ai-1",
      title: "AI Strategy Generation",
      description: "Strategy suggestions are properly generated",
      status: "pending",
      required: true,
    },
    {
      id: "ai-2",
      title: "Executive Board Simulation",
      description: "AI executive personas function correctly",
      status: "pending",
      required: true,
    },
    {
      id: "ai-3",
      title: "AI Response Time",
      description: "AI responses complete in < 5 seconds",
      status: "pending",
      required: true,
    },
    {
      id: "ai-4",
      title: "AI Fallback Mechanisms",
      description: "Graceful handling of AI service outages",
      status: "pending",
      required: true,
    },
    {
      id: "ai-5",
      title: "AI Content Moderation",
      description: "Content filtering for inappropriate outputs",
      status: "pending",
      required: false,
    },
  ]);
  const runTest = async () => {
    setIsRunning(true);
    try {
      // Test AI components
      for (let i = 0; i < items.length; i++) {
        // Set to in-progress
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i ? { ...item, status: "in-progress" } : item,
          ),
        );
        // Simulate AI test
        await new Promise((resolve) => setTimeout(resolve, 700));
        // For demo, mark all as passed
        const passed = true;
        setItems((prev) =>
          prev.map((item, idx) =>
            idx === i
              ? { ...item, status: passed ? "passed" : "failed" }
              : item,
          ),
        );
      }
      onStatusChange("passed");
      toast.success("AI systems check passed!");
    } catch (error) {
      console.error("AI test error:", error);
      onStatusChange("failed");
      toast.error("Error testing AI systems");
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
            <Brain className="h-5 w-5 text-primary/80" />
            <CardTitle>AI Systems Audit</CardTitle>
          </div>
          <Button onClick={runTest} disabled={isRunning} size="sm">
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Verifying AI...
              </>
            ) : (
              "Test AI Systems"
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
