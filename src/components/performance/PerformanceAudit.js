"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PerformanceAudit;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var progress_1 = require("@/components/ui/progress");
function PerformanceAudit() {
  var _a = (0, react_1.useState)(null),
    pageLoadTime = _a[0],
    setPageLoadTime = _a[1];
  var _b = (0, react_1.useState)(null),
    fcp = _b[0],
    setFcp = _b[1];
  var _c = (0, react_1.useState)(null),
    lcp = _c[0],
    setLcp = _c[1];
  var _d = (0, react_1.useState)(null),
    cls = _d[0],
    setCls = _d[1];
  (0, react_1.useEffect)(function () {
    // Measure page load time
    if (window.performance && window.performance.timing) {
      var _a = window.performance.timing,
        navigationStart = _a.navigationStart,
        loadEventEnd = _a.loadEventEnd;
      var loadTime = loadEventEnd - navigationStart;
      setPageLoadTime(loadTime / 1000); // Convert to seconds
    }
    // Set up performance observer to measure Core Web Vitals
    try {
      // Report First Contentful Paint
      var fcpObserver_1 = new PerformanceObserver(function (entryList) {
        var entries = entryList.getEntries();
        if (entries.length > 0) {
          var firstEntry = entries[0];
          setFcp(firstEntry.startTime / 1000);
        }
      });
      fcpObserver_1.observe({ type: "paint", buffered: true });
      // Report Largest Contentful Paint
      var lcpObserver_1 = new PerformanceObserver(function (entryList) {
        var entries = entryList.getEntries();
        if (entries.length > 0) {
          var largestEntry = entries[entries.length - 1];
          setLcp(largestEntry.startTime / 1000);
        }
      });
      lcpObserver_1.observe({
        type: "largest-contentful-paint",
        buffered: true,
      });
      // Report Cumulative Layout Shift
      var clsObserver_1 = new PerformanceObserver(function (entryList) {
        var clsValue = 0;
        for (var _i = 0, _a = entryList.getEntries(); _i < _a.length; _i++) {
          var entry = _a[_i];
          if (!entry.hadRecentInput) {
            clsValue += entry.value;
          }
        }
        setCls(clsValue);
      });
      clsObserver_1.observe({ type: "layout-shift", buffered: true });
      return function () {
        fcpObserver_1.disconnect();
        lcpObserver_1.disconnect();
        clsObserver_1.disconnect();
      };
    } catch (error) {
      console.error("Performance API not fully supported", error);
    }
  }, []);
  var getMetricStatus = function (value, thresholds) {
    if (value === null) return "unknown";
    if (value <= thresholds[0]) return "good";
    if (value <= thresholds[1]) return "needs-improvement";
    return "poor";
  };
  var getMetricColor = function (status) {
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
  var getProgressColor = function (status) {
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
  var pageLoadStatus = getMetricStatus(pageLoadTime, [2, 4]);
  var fcpStatus = getMetricStatus(fcp, [1.8, 3]);
  var lcpStatus = getMetricStatus(lcp, [2.5, 4]);
  var clsStatus = getMetricStatus(cls, [0.1, 0.25]);
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
          children: "Performance Metrics",
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-4",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Page Load Time",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm ".concat(
                          getMetricColor(pageLoadStatus),
                        ),
                        children:
                          pageLoadTime !== null
                            ? "".concat(pageLoadTime.toFixed(2), "s")
                            : "Measuring...",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value:
                      pageLoadTime !== null
                        ? Math.min(100, 100 - (pageLoadTime / 6) * 100)
                        : 0,
                    className: "h-2 ".concat(getProgressColor(pageLoadStatus)),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "First Contentful Paint (FCP)",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm ".concat(getMetricColor(fcpStatus)),
                        children:
                          fcp !== null
                            ? "".concat(fcp.toFixed(2), "s")
                            : "Measuring...",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value:
                      fcp !== null ? Math.min(100, 100 - (fcp / 5) * 100) : 0,
                    className: "h-2 ".concat(getProgressColor(fcpStatus)),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Largest Contentful Paint (LCP)",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm ".concat(getMetricColor(lcpStatus)),
                        children:
                          lcp !== null
                            ? "".concat(lcp.toFixed(2), "s")
                            : "Measuring...",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value:
                      lcp !== null ? Math.min(100, 100 - (lcp / 6) * 100) : 0,
                    className: "h-2 ".concat(getProgressColor(lcpStatus)),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "flex justify-between mb-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm font-medium",
                        children: "Cumulative Layout Shift (CLS)",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        className: "text-sm ".concat(getMetricColor(clsStatus)),
                        children:
                          cls !== null ? cls.toFixed(3) : "Measuring...",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                    value:
                      cls !== null ? Math.min(100, 100 - (cls / 0.5) * 100) : 0,
                    className: "h-2 ".concat(getProgressColor(clsStatus)),
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "text-xs text-muted-foreground mt-4",
            children: [
              (0, jsx_runtime_1.jsx)("p", {
                children:
                  "Good metrics are shown in green, needs improvement in yellow, and poor in red.",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                children:
                  "These metrics are measured in real-time on your current browser session.",
              }),
            ],
          }),
        ],
      }),
    ],
  });
}
