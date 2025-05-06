import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
export default function PerformanceAudit() {
    const [pageLoadTime, setPageLoadTime] = useState(null);
    const [fcp, setFcp] = useState(null);
    const [lcp, setLcp] = useState(null);
    const [cls, setCls] = useState(null);
    useEffect(() => {
        // Measure page load time
        if (window.performance && window.performance.timing) {
            const { navigationStart, loadEventEnd } = window.performance.timing;
            const loadTime = loadEventEnd - navigationStart;
            setPageLoadTime(loadTime / 1000); // Convert to seconds
        }
        // Set up performance observer to measure Core Web Vitals
        try {
            // Report First Contentful Paint
            const fcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    const firstEntry = entries[0];
                    setFcp(firstEntry.startTime / 1000);
                }
            });
            fcpObserver.observe({ type: "paint", buffered: true });
            // Report Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((entryList) => {
                const entries = entryList.getEntries();
                if (entries.length > 0) {
                    const largestEntry = entries[entries.length - 1];
                    setLcp(largestEntry.startTime / 1000);
                }
            });
            lcpObserver.observe({ type: "largest-contentful-paint", buffered: true });
            // Report Cumulative Layout Shift
            const clsObserver = new PerformanceObserver((entryList) => {
                let clsValue = 0;
                for (const entry of entryList.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                setCls(clsValue);
            });
            clsObserver.observe({ type: "layout-shift", buffered: true });
            return () => {
                fcpObserver.disconnect();
                lcpObserver.disconnect();
                clsObserver.disconnect();
            };
        }
        catch (error) {
            console.error("Performance API not fully supported", error);
        }
    }, []);
    const getMetricStatus = (value, thresholds) => {
        if (value === null)
            return "unknown";
        if (value <= thresholds[0])
            return "good";
        if (value <= thresholds[1])
            return "needs-improvement";
        return "poor";
    };
    const getMetricColor = (status) => {
        switch (status) {
            case "good":
                return "text-green-500";
            case "needs-improvement":
                return "text-yellow-500";
            case "poor":
                return "text-red-500";
            default:
                return "text-gray-500";
        }
    };
    const getProgressColor = (status) => {
        switch (status) {
            case "good":
                return "bg-green-500";
            case "needs-improvement":
                return "bg-yellow-500";
            case "poor":
                return "bg-red-500";
            default:
                return "bg-gray-500";
        }
    };
    const pageLoadStatus = getMetricStatus(pageLoadTime, [2, 4]);
    const fcpStatus = getMetricStatus(fcp, [1.8, 3]);
    const lcpStatus = getMetricStatus(lcp, [2.5, 4]);
    const clsStatus = getMetricStatus(cls, [0.1, 0.25]);
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsx(CardTitle, { children: "Performance Metrics" }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium", children: "Page Load Time" }), _jsx("span", { className: `text-sm ${getMetricColor(pageLoadStatus)}`, children: pageLoadTime !== null
                                                    ? `${pageLoadTime.toFixed(2)}s`
                                                    : "Measuring..." })] }), _jsx(Progress, { value: pageLoadTime !== null
                                            ? Math.min(100, 100 - (pageLoadTime / 6) * 100)
                                            : 0, className: `h-2 ${getProgressColor(pageLoadStatus)}` })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium", children: "First Contentful Paint (FCP)" }), _jsx("span", { className: `text-sm ${getMetricColor(fcpStatus)}`, children: fcp !== null ? `${fcp.toFixed(2)}s` : "Measuring..." })] }), _jsx(Progress, { value: fcp !== null ? Math.min(100, 100 - (fcp / 5) * 100) : 0, className: `h-2 ${getProgressColor(fcpStatus)}` })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium", children: "Largest Contentful Paint (LCP)" }), _jsx("span", { className: `text-sm ${getMetricColor(lcpStatus)}`, children: lcp !== null ? `${lcp.toFixed(2)}s` : "Measuring..." })] }), _jsx(Progress, { value: lcp !== null ? Math.min(100, 100 - (lcp / 6) * 100) : 0, className: `h-2 ${getProgressColor(lcpStatus)}` })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between mb-1", children: [_jsx("span", { className: "text-sm font-medium", children: "Cumulative Layout Shift (CLS)" }), _jsx("span", { className: `text-sm ${getMetricColor(clsStatus)}`, children: cls !== null ? cls.toFixed(3) : "Measuring..." })] }), _jsx(Progress, { value: cls !== null ? Math.min(100, 100 - (cls / 0.5) * 100) : 0, className: `h-2 ${getProgressColor(clsStatus)}` })] })] }), _jsxs("div", { className: "text-xs text-muted-foreground mt-4", children: [_jsx("p", { children: "Good metrics are shown in green, needs improvement in yellow, and poor in red." }), _jsx("p", { children: "These metrics are measured in real-time on your current browser session." })] })] })] }));
}
