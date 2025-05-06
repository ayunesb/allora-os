"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuditPage;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
var sonner_1 = require("sonner");
function AuditPage() {
  var navigate = (0, react_router_dom_1.useNavigate)();
  var _a = (0, react_1.useState)("April 12, 2025 at 14:23"),
    lastAuditDate = _a[0],
    setLastAuditDate = _a[1];
  var _b = (0, react_1.useState)({
      passed: 24,
      warnings: 8,
      failed: 3,
      duration: "2:18",
    }),
    auditStats = _b[0],
    setAuditStats = _b[1];
  var _c = (0, react_1.useState)(false),
    isLoading = _c[0],
    setIsLoading = _c[1];
  // Load last audit results from localStorage
  (0, react_1.useEffect)(function () {
    var _a, _b, _c;
    var lastAudit = localStorage.getItem("lastAuditResults");
    if (lastAudit) {
      try {
        var auditData = JSON.parse(lastAudit);
        // Update the last audit date
        if (auditData.timestamp) {
          var date = new Date(auditData.timestamp);
          setLastAuditDate(
            date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
          );
        }
        // Update audit stats if results are available
        if (auditData.results) {
          var results = auditData.results;
          setAuditStats({
            passed:
              ((_a = results.passedChecks) === null || _a === void 0
                ? void 0
                : _a.length) || 0,
            warnings:
              ((_b = results.issues) === null || _b === void 0
                ? void 0
                : _b.filter(function (i) {
                    return i.severity === "warning";
                  }).length) || 0,
            failed:
              ((_c = results.issues) === null || _c === void 0
                ? void 0
                : _c.filter(function (i) {
                    return i.severity === "critical";
                  }).length) || 0,
            duration: "2:18", // This would be dynamic in a real implementation
          });
        }
      } catch (error) {
        console.error("Error parsing last audit data:", error);
      }
    }
  }, []);
  var handleRunNewAudit = function () {
    setIsLoading(true);
    sonner_1.toast.info("Starting new system audit...");
    navigate("/admin/run-audit");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "System Audit",
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            className: "w-full sm:w-auto",
            onClick: handleRunNewAudit,
            disabled: isLoading,
            children: isLoading
              ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
                      className: "mr-2 h-4 w-4 animate-spin",
                    }),
                    "Running Audit...",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.PlayCircle, {
                      className: "mr-2 h-4 w-4",
                    }),
                    "Run New Audit",
                  ],
                }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Audit Overview",
              }),
              (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
                children: ["Last audit run: ", lastAuditDate],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "grid grid-cols-1 md:grid-cols-4 gap-4 mb-6",
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className: "bg-muted/20",
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4 flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-green-100 dark:bg-green-900/30 p-3 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.CheckCircle2,
                            {
                              className:
                                "h-6 w-6 text-green-600 dark:text-green-400",
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: "Passed",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-2xl font-bold",
                              children: auditStats.passed,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className: "bg-muted/20",
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4 flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-yellow-100 dark:bg-yellow-900/30 p-3 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.AlertTriangle,
                            {
                              className:
                                "h-6 w-6 text-yellow-600 dark:text-yellow-400",
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: "Warnings",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-2xl font-bold",
                              children: auditStats.warnings,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className: "bg-muted/20",
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4 flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-red-100 dark:bg-red-900/30 p-3 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.XCircle,
                            {
                              className:
                                "h-6 w-6 text-red-600 dark:text-red-400",
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: "Failed",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-2xl font-bold",
                              children: auditStats.failed,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.Card, {
                    className: "bg-muted/20",
                    children: (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                      className: "p-4 flex items-center gap-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "bg-blue-100 dark:bg-blue-900/30 p-3 rounded-full",
                          children: (0, jsx_runtime_1.jsx)(
                            lucide_react_1.Clock,
                            {
                              className:
                                "h-6 w-6 text-blue-600 dark:text-blue-400",
                            },
                          ),
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm font-medium",
                              children: "Duration",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-2xl font-bold",
                              children: auditStats.duration,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                defaultValue: "all",
                className: "w-full",
                children: [
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                    className: "w-full max-w-md mb-4",
                    children: [
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "all",
                        children: "All",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "security",
                        children: "Security",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "performance",
                        children: "Performance",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "compliance",
                        children: "Compliance",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "all",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Authentication Security",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Authentication mechanisms are properly secured",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              {
                                className:
                                  "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Database Query Performance",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Some queries exceed recommended execution time",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                              className:
                                "h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "GDPR Compliance",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Some user data handling doesn't meet GDPR requirements",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "API Rate Limiting",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "API rate limiting is properly implemented",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "security",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Authentication Security",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Authentication mechanisms are properly secured",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "XSS Protection",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Cross-site scripting protections are in place",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "performance",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              {
                                className:
                                  "h-5 w-5 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Database Query Performance",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Some queries exceed recommended execution time",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Frontend Performance",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Frontend performance metrics are within acceptable ranges",
                                }),
                              ],
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "compliance",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.XCircle, {
                              className:
                                "h-5 w-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0",
                            }),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "GDPR Compliance",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Some user data handling doesn't meet GDPR requirements",
                                }),
                              ],
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-start gap-3 p-3 border rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              {
                                className:
                                  "h-5 w-5 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0",
                              },
                            ),
                            (0, jsx_runtime_1.jsxs)("div", {
                              children: [
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "font-medium",
                                  children: "Data Encryption",
                                }),
                                (0, jsx_runtime_1.jsx)("p", {
                                  className: "text-sm text-muted-foreground",
                                  children:
                                    "Data encryption standards are properly implemented",
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
            ],
          }),
        ],
      }),
    ],
  });
}
