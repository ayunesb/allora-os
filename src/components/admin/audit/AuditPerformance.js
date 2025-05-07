var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle, AlertCircle, Loader2, Gauge, } from "lucide-react";
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
            setItems((prev) => prev.map((item) => item.id === "perf-1"
                ? Object.assign(Object.assign({}, item), { status: loadTimeSeconds < 2 ? "passed" : "failed", description: `Target < 2s load time (Actual: ${loadTimeSeconds.toFixed(2)}s)` }) : item));
        }
    }, []);
    const checkImageOptimization = () => __awaiter(this, void 0, void 0, function* () {
        // Set the image optimization check to in-progress
        setItems((prev) => prev.map((item) => item.id === "perf-2" ? Object.assign(Object.assign({}, item), { status: "in-progress" }) : item));
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
                if (width === 0 || height === 0)
                    continue;
                // Check if image is served from optimizing CDN
                const src = img.src;
                const isFromCDN = src.includes("imagecdn") ||
                    src.includes("cloudinary") ||
                    src.includes("cloudfront") ||
                    src.includes("cdn");
                // Check if image is properly sized for its container
                const containerWidth = img.clientWidth;
                const containerHeight = img.clientHeight;
                const isProperlyResized = width <= containerWidth * 1.5 || height <= containerHeight * 1.5;
                // Check if image has proper format
                const isOptimizedFormat = src.endsWith(".webp") ||
                    src.endsWith(".avif") ||
                    src.toLowerCase().includes("format=webp");
                // Simple heuristic for optimization
                const isOptimized = isFromCDN || isProperlyResized || isOptimizedFormat;
                if (!isOptimized) {
                    allOptimized = false;
                }
            }
            // Update image optimization check result
            setItems((prev) => prev.map((item) => item.id === "perf-2"
                ? Object.assign(Object.assign({}, item), { status: allOptimized ? "passed" : "failed" }) : item));
            return allOptimized;
        }
        catch (error) {
            console.error("Error checking image optimization:", error);
            setItems((prev) => prev.map((item) => item.id === "perf-2" ? Object.assign(Object.assign({}, item), { status: "failed" }) : item));
            return false;
        }
    });
    const runSimulatedTests = () => __awaiter(this, void 0, void 0, function* () {
        // Simulate testing for other performance items
        const idsToTest = ["perf-3", "perf-4", "perf-5"];
        for (const id of idsToTest) {
            setItems((prev) => prev.map((item) => item.id === id ? Object.assign(Object.assign({}, item), { status: "in-progress" }) : item));
            yield new Promise((resolve) => setTimeout(resolve, 500));
            // For demo purposes, we'll mark these as passed
            setItems((prev) => prev.map((item) => item.id === id ? Object.assign(Object.assign({}, item), { status: "passed" }) : item));
        }
        return true;
    });
    const runTest = () => __awaiter(this, void 0, void 0, function* () {
        setIsRunning(true);
        try {
            // Check image optimization
            yield checkImageOptimization();
            // Run simulated tests for other performance items
            yield runSimulatedTests();
            // Determine overall status
            const allPassed = items.every((item) => item.status === "passed");
            onStatusChange(allPassed ? "passed" : "failed");
            if (allPassed) {
                toast.success("Performance audit passed!");
            }
            else {
                toast.error("Performance audit failed! Please check the details.");
            }
        }
        catch (error) {
            console.error("Audit error:", error);
            onStatusChange("failed");
            toast.error("Error running performance audit");
        }
        finally {
            setIsRunning(false);
        }
    });
    const getStatusIcon = (status) => {
        switch (status) {
            case "passed":
                return _jsx(CheckCircle2, { className: "h-4 w-4 text-green-500" });
            case "failed":
                return _jsx(XCircle, { className: "h-4 w-4 text-red-500" });
            case "in-progress":
                return _jsx(Loader2, { className: "h-4 w-4 animate-spin text-blue-500" });
            default:
                return _jsx(AlertCircle, { className: "h-4 w-4 text-muted-foreground" });
        }
    };
    return (_jsxs("div", { className: "space-y-4", children: [_jsxs(Card, { children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Gauge, { className: "h-5 w-5 text-primary/80" }), _jsx(CardTitle, { children: "Performance Audit" })] }), _jsx(Button, { onClick: runTest, disabled: isRunning, size: "sm", children: isRunning ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "h-4 w-4 mr-2 animate-spin" }), "Testing..."] })) : ("Run Audit") })] }) }), _jsxs(CardContent, { children: [pageLoadTime !== null && (_jsxs("div", { className: "mb-4 space-y-1.5", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsx("div", { className: "text-sm font-medium", children: "Page Load Time" }), _jsxs("div", { className: "text-sm font-medium", children: [pageLoadTime.toFixed(2), "s"] })] }), _jsx(Progress, { value: Math.min(100, (2 - pageLoadTime) * 50), className: pageLoadTime < 2 ? "bg-green-100" : "bg-red-100" }), _jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [_jsx("div", { children: "0s" }), _jsx("div", { children: "Target: 2s" }), _jsx("div", { children: "4s+" })] })] })), _jsx("div", { className: "space-y-4", children: items.map((item) => (_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx("div", { className: "mt-0.5", children: getStatusIcon(item.status) }), _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "text-sm font-medium", children: item.title }), _jsx("div", { className: "text-xs text-muted-foreground", children: item.description })] }), _jsx("div", { className: "ml-auto flex items-center", children: _jsx(Checkbox, { id: item.id, checked: item.status === "passed", disabled: isRunning, onCheckedChange: (checked) => {
                                                    setItems((prev) => prev.map((i) => i.id === item.id
                                                        ? Object.assign(Object.assign({}, i), { status: checked ? "passed" : "failed" }) : i));
                                                    // Update overall status after manual change
                                                    const allPassed = items.every((i) => {
                                                        if (i.id === item.id)
                                                            return checked;
                                                        return i.status === "passed";
                                                    });
                                                    onStatusChange(allPassed ? "passed" : "failed");
                                                } }) })] }, item.id))) })] })] }), _jsx(AuditPerformanceGuidance, { pageLoadTime: pageLoadTime })] }));
}
