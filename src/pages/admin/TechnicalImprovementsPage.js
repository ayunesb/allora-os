"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g = Object.create(
        (typeof Iterator === "function" ? Iterator : Object).prototype,
      );
    return (
      (g.next = verb(0)),
      (g["throw"] = verb(1)),
      (g["return"] = verb(2)),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while ((g && ((g = 0), op[0] && (_ = 0)), _))
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                    ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                    : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = TechnicalImprovementsPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
// Mock implementation for PerformanceMonitor
var mockPerformanceMonitor = {
  getAllMeasurements: function () {
    return Promise.resolve([
      {
        id: 1,
        name: "API Response Time",
        value: 145,
        unit: "ms",
        trend: "improving",
      },
      {
        id: 2,
        name: "Database Query Time",
        value: 72,
        unit: "ms",
        trend: "stable",
      },
      {
        id: 3,
        name: "Frontend Rendering",
        value: 230,
        unit: "ms",
        trend: "worsening",
      },
      {
        id: 4,
        name: "AI Processing Time",
        value: 450,
        unit: "ms",
        trend: "improving",
      },
    ]);
  },
};
function TechnicalImprovementsPage() {
  var _this = this;
  var _a = (0, react_1.useState)([]),
    measurements = _a[0],
    setMeasurements = _a[1];
  var _b = (0, react_1.useState)(true),
    loading = _b[0],
    setLoading = _b[1];
  (0, react_1.useEffect)(function () {
    var fetchData = function () {
      return __awaiter(_this, void 0, void 0, function () {
        var data, error_1;
        return __generator(this, function (_a) {
          switch (_a.label) {
            case 0:
              _a.trys.push([0, 2, 3, 4]);
              setLoading(true);
              return [4 /*yield*/, mockPerformanceMonitor.getAllMeasurements()];
            case 1:
              data = _a.sent();
              setMeasurements(data);
              return [3 /*break*/, 4];
            case 2:
              error_1 = _a.sent();
              console.error("Error fetching performance data:", error_1);
              return [3 /*break*/, 4];
            case 3:
              setLoading(false);
              return [7 /*endfinally*/];
            case 4:
              return [2 /*return*/];
          }
        });
      });
    };
    fetchData();
  }, []);
  var renderTrendBadge = function (trend) {
    switch (trend) {
      case "improving":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          className:
            "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30",
          children: "Improving",
        });
      case "worsening":
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className:
            "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30",
          children: "Degrading",
        });
      case "stable":
      default:
        return (0, jsx_runtime_1.jsx)(badge_1.Badge, {
          variant: "outline",
          className:
            "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30",
          children: "Stable",
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Technical Improvements",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Filter, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Filter",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Download, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Export",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Refresh",
                ],
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "performance",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "w-full max-w-md mb-4",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "performance",
                children: "Performance",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "optimization",
                children: "Optimization",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "recommendations",
                children: "Recommendations",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsContent, {
            value: "performance",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 lg:grid-cols-3 gap-6",
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    className: "lg:col-span-2",
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Performance Trends",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children: "System performance over time",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "h-[300px] flex items-center justify-center border border-dashed rounded-lg",
                          children: (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.LineChart, {
                                className: "h-5 w-5 text-muted-foreground",
                              }),
                              (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                                children:
                                  "Performance trend chart will display here",
                              }),
                            ],
                          }),
                        }),
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.Card, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                        children: [
                          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                            children: "Key Metrics",
                          }),
                          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                            children: "Current performance indicators",
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                        children: loading
                          ? (0, jsx_runtime_1.jsxs)("div", {
                              className: "space-y-3",
                              children: [
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-6 bg-muted/50 rounded animate-pulse",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-6 bg-muted/50 rounded animate-pulse",
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-6 bg-muted/50 rounded animate-pulse",
                                }),
                              ],
                            })
                          : (0, jsx_runtime_1.jsx)("div", {
                              className: "space-y-4",
                              children: measurements.map(function (metric) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "div",
                                  {
                                    className:
                                      "flex justify-between items-center",
                                    children: [
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        children: [
                                          (0, jsx_runtime_1.jsx)("p", {
                                            className: "font-medium",
                                            children: metric.name,
                                          }),
                                          (0, jsx_runtime_1.jsxs)("p", {
                                            className:
                                              "text-sm text-muted-foreground",
                                            children: [
                                              metric.value,
                                              " ",
                                              metric.unit,
                                            ],
                                          }),
                                        ],
                                      }),
                                      renderTrendBadge(metric.trend),
                                    ],
                                  },
                                  metric.id,
                                );
                              }),
                            }),
                      }),
                    ],
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "mt-6",
                children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                          children: "Performance Issues",
                        }),
                        (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                          children: "Identified issues that need attention",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                      children: (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-start gap-4 p-4 bg-red-50 dark:bg-red-900/10 border border-red-100 dark:border-red-900/20 rounded-lg",
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "bg-red-100 dark:bg-red-900/30 p-2 rounded-full",
                                children: (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-2 w-2 rounded-full bg-red-600 dark:bg-red-400",
                                }),
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "font-medium",
                                    children: "High Memory Usage",
                                  }),
                                  (0, jsx_runtime_1.jsx)(
                                    typography_1.TypographyP,
                                    {
                                      children:
                                        "Memory consumption spikes during peak user activity. Consider optimizing memory-intensive operations.",
                                    },
                                  ),
                                ],
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className:
                              "flex items-start gap-4 p-4 bg-yellow-50 dark:bg-yellow-900/10 border border-yellow-100 dark:border-yellow-900/20 rounded-lg",
                            children: [
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "bg-yellow-100 dark:bg-yellow-900/30 p-2 rounded-full",
                                children: (0, jsx_runtime_1.jsx)("div", {
                                  className:
                                    "h-2 w-2 rounded-full bg-yellow-600 dark:bg-yellow-400",
                                }),
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                children: [
                                  (0, jsx_runtime_1.jsx)("p", {
                                    className: "font-medium",
                                    children: "Database Query Optimization",
                                  }),
                                  (0, jsx_runtime_1.jsx)(
                                    typography_1.TypographyP,
                                    {
                                      children:
                                        "Some database queries are taking longer than expected. Review queries and consider adding indexes.",
                                    },
                                  ),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "optimization",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "Optimization Opportunities",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children: "Areas for potential performance improvement",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: "Frontend Asset Optimization",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                children: "High Impact",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Compress and optimize image assets to reduce load times by up to 35%.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2 mt-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                size: "sm",
                                children: "Apply Optimization",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                children: "Learn More",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: "API Response Caching",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                children: "Medium Impact",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Implement caching for frequently requested API endpoints to reduce backend load.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2 mt-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                size: "sm",
                                children: "Apply Optimization",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                children: "Learn More",
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-medium",
                                children: "Database Indexing",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                children: "High Impact",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Add strategic indexes to improve query performance on high-traffic tables.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center gap-2 mt-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                size: "sm",
                                children: "Apply Optimization",
                              }),
                              (0, jsx_runtime_1.jsx)(button_1.Button, {
                                variant: "outline",
                                size: "sm",
                                children: "Learn More",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "recommendations",
            children: (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                  children: [
                    (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                      children: "AI-Generated Recommendations",
                    }),
                    (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                      children:
                        "Intelligent suggestions based on system analysis",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsxs)("div", {
                    className: "space-y-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "border rounded-lg p-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-semibold",
                                children: "Code Splitting Implementation",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                className:
                                  "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
                                children: "Architecture",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Implement code splitting to reduce initial bundle size and improve load times for your React application.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "mt-4 flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "text-sm",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "font-medium",
                                    children: "Estimated Impact:",
                                  }),
                                  " High",
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    size: "sm",
                                    children: "View Details",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Dismiss",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "border rounded-lg p-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-semibold",
                                children: "Implement Component Lazy Loading",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                className:
                                  "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
                                children: "Performance",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Improve initial load performance by implementing lazy loading for non-critical components.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "mt-4 flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "text-sm",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "font-medium",
                                    children: "Estimated Impact:",
                                  }),
                                  " Medium",
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    size: "sm",
                                    children: "View Details",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Dismiss",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "border rounded-lg p-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "flex items-center justify-between mb-2",
                            children: [
                              (0, jsx_runtime_1.jsx)("p", {
                                className: "font-semibold",
                                children: "Optimize Redux State Management",
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                className:
                                  "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400",
                                children: "State Management",
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                            children:
                              "Refactor Redux store to use normalized state patterns and improve rendering performance.",
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "mt-4 flex items-center justify-between",
                            children: [
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "text-sm",
                                children: [
                                  (0, jsx_runtime_1.jsx)("span", {
                                    className: "font-medium",
                                    children: "Estimated Impact:",
                                  }),
                                  " Medium",
                                ],
                              }),
                              (0, jsx_runtime_1.jsxs)("div", {
                                className: "flex gap-2",
                                children: [
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    size: "sm",
                                    children: "View Details",
                                  }),
                                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                                    variant: "outline",
                                    size: "sm",
                                    children: "Dismiss",
                                  }),
                                ],
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                }),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
