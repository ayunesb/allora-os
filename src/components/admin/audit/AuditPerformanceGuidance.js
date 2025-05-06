"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuditPerformanceGuidance = AuditPerformanceGuidance;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
function AuditPerformanceGuidance(_a) {
  var pageLoadTime = _a.pageLoadTime;
  // Dynamic optimization guidance based on detected performance
  var getOptimizationGuidance = function () {
    var issues = [];
    // Page load time guidance
    if (pageLoadTime && pageLoadTime > 2) {
      issues.push({
        id: "slow-load",
        title: "Slow Page Load Time",
        description: "Your page load time is ".concat(
          pageLoadTime.toFixed(2),
          "s, which exceeds the recommended 2s target.",
        ),
        solution:
          "Consider using code-splitting, lazy-loading components, and optimizing assets to improve load times.",
        impact: pageLoadTime > 3 ? "high" : "medium",
      });
    }
    // Check for large bundle size (simulated)
    if (document.querySelectorAll("script").length > 10) {
      issues.push({
        id: "bundle-size",
        title: "Large JavaScript Bundle",
        description:
          "Your application may have a large JavaScript bundle size.",
        solution:
          "Use dynamic imports, tree shaking, and code splitting to reduce bundle size.",
        impact: "high",
      });
    }
    // Check for unoptimized images
    var images = document.querySelectorAll("img");
    var unoptimizedImagesCount = 0;
    images.forEach(function (img) {
      if (
        !img.getAttribute("loading") &&
        !(img.getAttribute("width") && img.getAttribute("height"))
      ) {
        unoptimizedImagesCount++;
      }
    });
    if (unoptimizedImagesCount > 0) {
      issues.push({
        id: "image-opt",
        title: "Unoptimized Images",
        description: "".concat(
          unoptimizedImagesCount,
          " images could be further optimized.",
        ),
        solution:
          'Add loading="lazy" attribute and specify width/height to prevent layout shifts. Consider using WebP format.',
        impact: unoptimizedImagesCount > 5 ? "high" : "medium",
      });
    }
    // Add general performance best practices
    if (issues.length === 0) {
      issues.push({
        id: "best-practices",
        title: "Performance Best Practices",
        description:
          "Your application is performing well, but here are some best practices to maintain optimal performance.",
        solution:
          "Regularly monitor Core Web Vitals, minimize third-party scripts, and implement proper caching strategies.",
        impact: "low",
      });
    }
    return issues;
  };
  var performanceIssues = getOptimizationGuidance();
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "flex items-center gap-2",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
              className: "h-5 w-5 text-amber-500",
            }),
            "Performance Optimization Guide",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          performanceIssues.map(function (issue) {
            return (0, jsx_runtime_1.jsxs)(
              alert_1.Alert,
              {
                className: "\n              ".concat(
                  issue.impact === "high"
                    ? "border-red-200 bg-red-50"
                    : issue.impact === "medium"
                      ? "border-amber-200 bg-amber-50"
                      : "border-blue-200 bg-blue-50",
                  "\n            ",
                ),
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
                    className:
                      "\n              h-4 w-4 \n              ".concat(
                        issue.impact === "high"
                          ? "text-red-500"
                          : issue.impact === "medium"
                            ? "text-amber-500"
                            : "text-blue-500",
                        "\n            ",
                      ),
                  }),
                  (0, jsx_runtime_1.jsxs)(alert_1.AlertTitle, {
                    className: "font-medium",
                    children: [
                      issue.title,
                      (0, jsx_runtime_1.jsxs)("span", {
                        className:
                          "\n                ml-2 text-xs px-2 py-0.5 rounded-full \n                ".concat(
                            issue.impact === "high"
                              ? "bg-red-100 text-red-800"
                              : issue.impact === "medium"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-blue-100 text-blue-800",
                            "\n              ",
                          ),
                        children: [
                          issue.impact.charAt(0).toUpperCase() +
                            issue.impact.slice(1),
                          " Impact",
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(alert_1.AlertDescription, {
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "mt-2 space-y-2",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          children: issue.description,
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "bg-white p-3 rounded border mt-2",
                          children: [
                            (0, jsx_runtime_1.jsxs)("p", {
                              className:
                                "font-medium text-sm flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Zap, {
                                  className: "h-3 w-3 mr-1 text-primary",
                                }),
                                "Recommended Solution:",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm mt-1",
                              children: issue.solution,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              },
              issue.id,
            );
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "bg-muted/30 p-4 rounded-md mt-4",
            children: [
              (0, jsx_runtime_1.jsxs)("h3", {
                className: "text-sm font-medium flex items-center mb-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                    className: "h-4 w-4 mr-2 text-primary",
                  }),
                  "Performance Benchmarks",
                ],
              }),
              (0, jsx_runtime_1.jsxs)("ul", {
                className: "space-y-1 text-sm",
                children: [
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 Page Load Time: < 2 seconds",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 First Contentful Paint: < 1.8 seconds",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 Largest Contentful Paint: < 2.5 seconds",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 First Input Delay: < 100ms",
                  }),
                  (0, jsx_runtime_1.jsx)("li", {
                    children: "\u2022 Cumulative Layout Shift: < 0.1",
                  }),
                ],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
