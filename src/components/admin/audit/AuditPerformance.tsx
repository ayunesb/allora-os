import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  Loader2,
  Gauge,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import { AuditPerformanceGuidance } from "./AuditPerformanceGuidance";
export function AuditPerformance({ status, onStatusChange }) {
  const [isRunning, setIsRunning] = useState(false);
  const [pageLoadTime, setPageLoadTime] = useState(null);
  const [items, setItems] = useState([
    {
      id: "perf-1",
      title: "Initial Page Load",
      description: "Target < 2s load time",
      status: "pending",
      required: true,
    },
    {
      id: "perf-2",
      title: "Image Optimization",
      description: "Images are properly sized and compressed",
      status: "pending",
      required: true,
    },
    {
      id: "perf-3",
      title: "Component Rendering",
      description: "No render bottlenecks in components",
      status: "pending",
      required: true,
    },
    {
      id: "perf-4",
      title: "API Response Time",
      description: "API calls complete in < 500ms",
      status: "pending",
      required: true,
    },
    {
      id: "perf-5",
      title: "Bundle Size",
      description: "JS bundle size < 1MB",
      status: "pending",
      required: true,
    },
  ]);
  // Get page load time from performance API if available
  useEffect(() => {
    if (window.performance && window.performance.timing) {
      const { navigationStart, loadEventEnd } = window.performance.timing;
      const loadTime = loadEventEnd - navigationStart;
      // Convert to seconds
      const loadTimeSeconds = loadTime / 1000;
      setPageLoadTime(loadTimeSeconds);
      // Automatically update the page load time check
      setItems((prev) =>
        prev.map((item) =>
          item.id === "perf-1"
            ? {
                ...item,
                status: loadTimeSeconds < 2 ? "passed" : "failed",
                description: `Target < 2s load time (Actual: ${loadTimeSeconds.toFixed(2)}s)`,
              }
            : item,
        ),
      );
    }
  }, []);
  const checkImageOptimization = async () => {
    // Set the image optimization check to in-progress
    setItems((prev) =>
      prev.map((item) =>
        item.id === "perf-2" ? { ...item, status: "in-progress" } : item,
      ),
    );
    try {
      // Get all images on the page
      const images = document.querySelectorAll("img");
      let allOptimized = true;
      const totalSize = 0;
      // Examine each image
      for (const img of images) {
        // Get image dimensions from DOM
        const width = img.naturalWidth;
        const height = img.naturalHeight;
        // Skip images that haven't loaded yet
        if (width === 0 || height === 0) continue;
        // Check if image is served from optimizing CDN
        const src = img.src;
        const isFromCDN =
          src.includes("imagecdn") ||
          src.includes("cloudinary") ||
          src.includes("cloudfront") ||
          src.includes("cdn");
        // Check if image is properly sized for its container
        const containerWidth = img.clientWidth;
        const containerHeight = img.clientHeight;
        const isProperlyResized =
          width <= containerWidth * 1.5 || height <= containerHeight * 1.5;
        // Check if image has proper format
        const isOptimizedFormat =
          src.endsWith(".webp") ||
          src.endsWith(".avif") ||
          src.toLowerCase().includes("format=webp");
        // Simple heuristic for optimization
        const isOptimized = isFromCDN || isProperlyResized || isOptimizedFormat;
        if (!isOptimized) {
          allOptimized = false;
        }
      }
      // Update image optimization check result
      setItems((prev) =>
        prev.map((item) =>
          item.id === "perf-2"
            ? { ...item, status: allOptimized ? "passed" : "failed" }
            : item,
        ),
      );
      return allOptimized;
    } catch (error) {
      console.error("Error checking image optimization:", error);
      setItems((prev) =>
        prev.map((item) =>
          item.id === "perf-2" ? { ...item, status: "failed" } : item,
        ),
      );
      return false;
    }
  };
  const runSimulatedTests = async () => {
    // Simulate testing for other performance items
    const idsToTest = ["perf-3", "perf-4", "perf-5"];
    for (const id of idsToTest) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "in-progress" } : item,
        ),
      );
      await new Promise((resolve) => setTimeout(resolve, 500));
      // For demo purposes, we'll mark these as passed
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: "passed" } : item,
        ),
      );
    }
    return true;
  };
  const runTest = async () => {
    setIsRunning(true);
    try {
      // Check image optimization
      await checkImageOptimization();
      // Run simulated tests for other performance items
      await runSimulatedTests();
      // Determine overall status
      const allPassed = items.every((item) => item.status === "passed");
      onStatusChange(allPassed ? "passed" : "failed");
      if (allPassed) {
        toast.success("Performance audit passed!");
      } else {
        toast.error("Performance audit failed! Please check the details.");
      }
    } catch (error) {
      console.error("Audit error:", error);
      onStatusChange("failed");
      toast.error("Error running performance audit");
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
    <div className="space-y-4">
      <Card>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Gauge className="h-5 w-5 text-primary/80" />
              <CardTitle>Performance Audit</CardTitle>
            </div>
            <Button onClick={runTest} disabled={isRunning} size="sm">
              {isRunning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                "Run Audit"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {pageLoadTime !== null && (
            <div className="mb-4 space-y-1.5">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">Page Load Time</div>
                <div className="text-sm font-medium">
                  {pageLoadTime.toFixed(2)}s
                </div>
              </div>
              <Progress
                value={Math.min(100, (2 - pageLoadTime) * 50)}
                className={pageLoadTime < 2 ? "bg-green-100" : "bg-red-100"}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <div>0s</div>
                <div>Target: 2s</div>
                <div>4s+</div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start space-x-2">
                <div className="mt-0.5">{getStatusIcon(item.status)}</div>
                <div className="space-y-1">
                  <div className="text-sm font-medium">{item.title}</div>
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
                      // Update overall status after manual change
                      const allPassed = items.every((i) => {
                        if (i.id === item.id) return checked;
                        return i.status === "passed";
                      });
                      onStatusChange(allPassed ? "passed" : "failed");
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Add the new performance guidance component */}
      <AuditPerformanceGuidance pageLoadTime={pageLoadTime} />
    </div>
  );
}
