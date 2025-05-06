"use strict";
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
      };
    return __assign.apply(this, arguments);
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = DigitalTwin;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var page_title_1 = require("@/components/ui/page-title");
var DigitalTwinScene_1 = require("@/components/digital-twin/DigitalTwinScene");
var card_1 = require("@/components/ui/card");
var LanguageContext_1 = require("@/context/LanguageContext");
var i18n_1 = require("@/utils/i18n");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var tooltip_1 = require("@/components/ui/tooltip");
var lucide_react_1 = require("lucide-react");
var sonner_1 = require("sonner");
var performanceMonitor_1 = require("@/utils/performance/performanceMonitor");
function DigitalTwin() {
  var language = (0, LanguageContext_1.useLanguage)().language;
  var t = (0, i18n_1.getTranslation)(language);
  var _a = (0, react_1.useState)(false),
    isRefreshing = _a[0],
    setIsRefreshing = _a[1];
  var _b = (0, react_1.useState)(false),
    showPerformancePanel = _b[0],
    setShowPerformancePanel = _b[1];
  var _c = (0, react_1.useState)({
      fps: 0,
      loadTime: 0,
      lastUpdated: new Date(),
    }),
    performanceStats = _c[0],
    setPerformanceStats = _c[1];
  // Track performance on component load
  (0, react_1.useEffect)(function () {
    var measureId = performanceMonitor_1.performanceMonitor.startMeasure(
      "digital-twin-load",
      "render",
    );
    // Calculate FPS (simplified version)
    var frameCount = 0;
    var lastTime = performance.now();
    var measureFPS = function () {
      frameCount++;
      var currentTime = performance.now();
      if (currentTime - lastTime >= 1000) {
        setPerformanceStats(function (prev) {
          return __assign(__assign({}, prev), {
            fps: Math.round((frameCount * 1000) / (currentTime - lastTime)),
          });
        });
        frameCount = 0;
        lastTime = currentTime;
      }
      requestAnimationFrame(measureFPS);
    };
    var fpsTracker = requestAnimationFrame(measureFPS);
    return function () {
      performanceMonitor_1.performanceMonitor.endMeasure(measureId);
      cancelAnimationFrame(fpsTracker);
    };
  }, []);
  var handleRefresh = function () {
    setIsRefreshing(true);
    // Track refresh performance
    var refreshMeasureId = performanceMonitor_1.performanceMonitor.startMeasure(
      "digital-twin-refresh",
      "interaction",
    );
    // Simulate refresh - in a real app, this would fetch fresh data
    setTimeout(function () {
      setIsRefreshing(false);
      setPerformanceStats(function (prev) {
        return __assign(__assign({}, prev), { lastUpdated: new Date() });
      });
      var measure =
        performanceMonitor_1.performanceMonitor.endMeasure(refreshMeasureId);
      if (measure === null || measure === void 0 ? void 0 : measure.duration) {
        setPerformanceStats(function (prev) {
          return __assign(__assign({}, prev), {
            loadTime: Math.round(measure.duration),
          });
        });
      }
      sonner_1.toast.success(
        t.digitalTwin.refreshSuccess || "Data refreshed successfully",
        {
          description:
            t.digitalTwin.refreshDescription ||
            "Latest KPI data has been loaded",
        },
      );
    }, 1500);
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6 p-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(page_title_1.PageTitle, {
            title: t.digitalTwin.title,
            description: t.digitalTwin.description,
          }),
          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
            children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
              children: [
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                  asChild: true,
                  children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className: "px-3 py-1 flex items-center gap-1",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                        className: "h-3 w-3",
                      }),
                      (0, jsx_runtime_1.jsx)("span", {
                        children:
                          performanceStats.lastUpdated.toLocaleTimeString(),
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                  children: (0, jsx_runtime_1.jsx)("p", {
                    children: "Last data refresh",
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        className: "overflow-hidden border-primary/20 shadow-md",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            className: "pb-2 flex flex-row justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "text-lg flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart3, {
                    className: "h-5 w-5 text-primary",
                  }),
                  t.digitalTwin.visualizationTitle ||
                    "Real-time KPI Visualization",
                ],
              }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                    children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                      children: [
                        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                          asChild: true,
                          children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                            variant: "outline",
                            size: "icon",
                            className: "h-8 w-8 text-muted-foreground",
                            onClick: function () {
                              return setShowPerformancePanel(
                                !showPerformancePanel,
                              );
                            },
                            children: (0, jsx_runtime_1.jsx)(
                              lucide_react_1.Info,
                              { className: "h-4 w-4" },
                            ),
                          }),
                        }),
                        (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                          children: (0, jsx_runtime_1.jsx)("p", {
                            children: "Toggle performance information",
                          }),
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    onClick: handleRefresh,
                    disabled: isRefreshing,
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                        className: "h-4 w-4 mr-2 ".concat(
                          isRefreshing ? "animate-spin" : "",
                        ),
                      }),
                      isRefreshing
                        ? t.digitalTwin.refreshing || "Refreshing..."
                        : t.digitalTwin.refresh || "Refresh Data",
                    ],
                  }),
                ],
              }),
            ],
          }),
          showPerformancePanel &&
            (0, jsx_runtime_1.jsxs)("div", {
              className:
                "px-6 pt-2 pb-4 bg-muted/30 flex flex-wrap items-center justify-between gap-2 text-sm",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-6",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground mr-2",
                          children: "FPS:",
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className:
                            performanceStats.fps >= 50
                              ? "text-green-500"
                              : performanceStats.fps >= 30
                                ? "text-amber-500"
                                : "text-red-500",
                          children: performanceStats.fps,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-muted-foreground mr-2",
                          children: "Load Time:",
                        }),
                        (0, jsx_runtime_1.jsxs)("span", {
                          className:
                            performanceStats.loadTime < 300
                              ? "text-green-500"
                              : performanceStats.loadTime < 1000
                                ? "text-amber-500"
                                : "text-red-500",
                          children: [performanceStats.loadTime, "ms"],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center gap-1",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
                      className: "h-4 w-4 text-amber-500",
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-muted-foreground text-xs",
                      children:
                        t.digitalTwin.performanceTip ||
                        "Higher FPS means smoother visualization",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "ghost",
                  size: "sm",
                  className: "h-7 text-xs",
                  onClick: function () {
                    return setShowPerformancePanel(false);
                  },
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronDown, {
                    className: "h-4 w-4",
                  }),
                }),
              ],
            }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            className: "p-0",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "h-[70vh] w-full relative",
              children: [
                (0, jsx_runtime_1.jsx)(DigitalTwinScene_1.default, {}),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "absolute bottom-4 right-4 flex gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                      children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                        children: [
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                            asChild: true,
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "secondary",
                              size: "icon",
                              className:
                                "backdrop-blur-sm bg-background/80 h-10 w-10",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ZoomIn,
                                { className: "h-5 w-5" },
                              ),
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                            children: (0, jsx_runtime_1.jsx)("p", {
                              children: "Zoom in (or use scroll wheel)",
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                      children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                        children: [
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                            asChild: true,
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "secondary",
                              size: "icon",
                              className:
                                "backdrop-blur-sm bg-background/80 h-10 w-10",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ZoomOut,
                                { className: "h-5 w-5" },
                              ),
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                            children: (0, jsx_runtime_1.jsx)("p", {
                              children: "Zoom out (or use scroll wheel)",
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                      children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                        children: [
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                            asChild: true,
                            children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                              variant: "secondary",
                              size: "icon",
                              className:
                                "backdrop-blur-sm bg-background/80 h-10 w-10",
                              children: (0, jsx_runtime_1.jsx)(
                                lucide_react_1.RotateCw,
                                { className: "h-5 w-5" },
                              ),
                            }),
                          }),
                          (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                            children: (0, jsx_runtime_1.jsx)("p", {
                              children: "Reset camera position",
                            }),
                          }),
                        ],
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "secondary",
                      size: "sm",
                      className: "backdrop-blur-sm bg-background/80",
                      onClick: handleRefresh,
                      disabled: isRefreshing,
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                          className: "h-4 w-4 mr-2 ".concat(
                            isRefreshing ? "animate-spin" : "",
                          ),
                        }),
                        isRefreshing ? "Refreshing..." : "Refresh Data",
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "absolute top-4 left-4",
                  children: (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                    variant: "outline",
                    className: "px-2 py-1 backdrop-blur-sm ".concat(
                      performanceStats.fps >= 50
                        ? "bg-green-500/10 text-green-400 border-green-500/30"
                        : performanceStats.fps >= 30
                          ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                          : "bg-red-500/10 text-red-400 border-red-500/30",
                    ),
                    children: [performanceStats.fps, " FPS"],
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardFooter, {
            className: "text-xs text-muted-foreground pt-2 pb-4",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                  className: "h-4 w-4 text-primary",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  children:
                    t.digitalTwin.tooltip ||
                    "Hover over spheres to see detailed KPI information. Drag to rotate, scroll to zoom.",
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
