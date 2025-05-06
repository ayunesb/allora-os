import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Lightbulb, Zap, BarChart3 } from "lucide-react";
export function AuditPerformanceGuidance({ pageLoadTime }) {
    // Dynamic optimization guidance based on detected performance
    const getOptimizationGuidance = () => {
        const issues = [];
        // Page load time guidance
        if (pageLoadTime && pageLoadTime > 2) {
            issues.push({
                id: "slow-load",
                title: "Slow Page Load Time",
                description: `Your page load time is ${pageLoadTime.toFixed(2)}s, which exceeds the recommended 2s target.`,
                solution: "Consider using code-splitting, lazy-loading components, and optimizing assets to improve load times.",
                impact: pageLoadTime > 3 ? "high" : "medium",
            });
        }
        // Check for large bundle size (simulated)
        if (document.querySelectorAll("script").length > 10) {
            issues.push({
                id: "bundle-size",
                title: "Large JavaScript Bundle",
                description: "Your application may have a large JavaScript bundle size.",
                solution: "Use dynamic imports, tree shaking, and code splitting to reduce bundle size.",
                impact: "high",
            });
        }
        // Check for unoptimized images
        const images = document.querySelectorAll("img");
        let unoptimizedImagesCount = 0;
        images.forEach((img) => {
            if (!img.getAttribute("loading") &&
                !(img.getAttribute("width") && img.getAttribute("height"))) {
                unoptimizedImagesCount++;
            }
        });
        if (unoptimizedImagesCount > 0) {
            issues.push({
                id: "image-opt",
                title: "Unoptimized Images",
                description: `${unoptimizedImagesCount} images could be further optimized.`,
                solution: 'Add loading="lazy" attribute and specify width/height to prevent layout shifts. Consider using WebP format.',
                impact: unoptimizedImagesCount > 5 ? "high" : "medium",
            });
        }
        // Add general performance best practices
        if (issues.length === 0) {
            issues.push({
                id: "best-practices",
                title: "Performance Best Practices",
                description: "Your application is performing well, but here are some best practices to maintain optimal performance.",
                solution: "Regularly monitor Core Web Vitals, minimize third-party scripts, and implement proper caching strategies.",
                impact: "low",
            });
        }
        return issues;
    };
    const performanceIssues = getOptimizationGuidance();
    return (_jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center gap-2", children: [_jsx(Zap, { className: "h-5 w-5 text-amber-500" }), "Performance Optimization Guide"] }) }), _jsxs(CardContent, { className: "space-y-4", children: [performanceIssues.map((issue) => (_jsxs(Alert, { className: `
              ${issue.impact === "high"
                            ? "border-red-200 bg-red-50"
                            : issue.impact === "medium"
                                ? "border-amber-200 bg-amber-50"
                                : "border-blue-200 bg-blue-50"}
            `, children: [_jsx(Lightbulb, { className: `
              h-4 w-4 
              ${issue.impact === "high"
                                    ? "text-red-500"
                                    : issue.impact === "medium"
                                        ? "text-amber-500"
                                        : "text-blue-500"}
            ` }), _jsxs(AlertTitle, { className: "font-medium", children: [issue.title, _jsxs("span", { className: `
                ml-2 text-xs px-2 py-0.5 rounded-full 
                ${issue.impact === "high"
                                            ? "bg-red-100 text-red-800"
                                            : issue.impact === "medium"
                                                ? "bg-amber-100 text-amber-800"
                                                : "bg-blue-100 text-blue-800"}
              `, children: [issue.impact.charAt(0).toUpperCase() + issue.impact.slice(1), " ", "Impact"] })] }), _jsx(AlertDescription, { children: _jsxs("div", { className: "mt-2 space-y-2", children: [_jsx("p", { children: issue.description }), _jsxs("div", { className: "bg-white p-3 rounded border mt-2", children: [_jsxs("p", { className: "font-medium text-sm flex items-center", children: [_jsx(Zap, { className: "h-3 w-3 mr-1 text-primary" }), "Recommended Solution:"] }), _jsx("p", { className: "text-sm mt-1", children: issue.solution })] })] }) })] }, issue.id))), _jsxs("div", { className: "bg-muted/30 p-4 rounded-md mt-4", children: [_jsxs("h3", { className: "text-sm font-medium flex items-center mb-2", children: [_jsx(BarChart3, { className: "h-4 w-4 mr-2 text-primary" }), "Performance Benchmarks"] }), _jsxs("ul", { className: "space-y-1 text-sm", children: [_jsx("li", { children: "\u2022 Page Load Time: < 2 seconds" }), _jsx("li", { children: "\u2022 First Contentful Paint: < 1.8 seconds" }), _jsx("li", { children: "\u2022 Largest Contentful Paint: < 2.5 seconds" }), _jsx("li", { children: "\u2022 First Input Delay: < 100ms" }), _jsx("li", { children: "\u2022 Cumulative Layout Shift: < 0.1" })] })] })] })] }));
}
