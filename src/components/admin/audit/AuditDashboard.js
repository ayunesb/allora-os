"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AuditDashboard;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var PreLaunchAudit_1 = require("./PreLaunchAudit");
var card_1 = require("@/components/ui/card");
var alert_1 = require("@/components/ui/alert");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var react_router_dom_1 = require("react-router-dom");
function AuditDashboard() {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  var _j = (0, react_1.useState)(null),
    lastAuditTimestamp = _j[0],
    setLastAuditTimestamp = _j[1];
  var _k = (0, react_1.useState)(null),
    auditResults = _k[0],
    setAuditResults = _k[1];
  var navigate = (0, react_router_dom_1.useNavigate)();
  (0, react_1.useEffect)(function () {
    // Try to get the last audit timestamp and results from localStorage
    var lastAuditResultsStr = localStorage.getItem("lastAuditResults");
    if (lastAuditResultsStr) {
      try {
        var parsedResults = JSON.parse(lastAuditResultsStr);
        setLastAuditTimestamp(parsedResults.timestamp);
        setAuditResults(parsedResults.results);
      } catch (error) {
        console.error("Error parsing audit results:", error);
      }
    }
  }, []);
  // Get critical issues from the audit results
  var criticalIssues =
    ((_a =
      auditResults === null || auditResults === void 0
        ? void 0
        : auditResults.issues) === null || _a === void 0
      ? void 0
      : _a.filter(function (issue) {
          return issue.severity === "critical";
        })) || [];
  var warningIssues =
    ((_b =
      auditResults === null || auditResults === void 0
        ? void 0
        : auditResults.issues) === null || _b === void 0
      ? void 0
      : _b.filter(function (issue) {
          return issue.severity === "warning";
        })) || [];
  var runNewAudit = function () {
    navigate("/admin/run-audit");
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "container py-6 max-w-7xl mx-auto animate-in fade-in duration-500 space-y-6",
    children: [
      lastAuditTimestamp &&
        (0, jsx_runtime_1.jsxs)(alert_1.Alert, {
          variant: criticalIssues.length > 0 ? "destructive" : "default",
          className:
            criticalIssues.length > 0
              ? "bg-red-50 dark:bg-red-900/20"
              : "bg-muted/50",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2",
              children: [
                criticalIssues.length > 0
                  ? (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                      className: "h-4 w-4",
                    })
                  : (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-4 w-4 text-green-500",
                    }),
                (0, jsx_runtime_1.jsx)(alert_1.AlertTitle, {
                  children:
                    criticalIssues.length > 0
                      ? "".concat(
                          criticalIssues.length,
                          " Critical Issues Found",
                        )
                      : "System Status: Ready",
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(alert_1.AlertDescription, {
              className: "mt-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    "Last audit performed: ",
                    new Date(lastAuditTimestamp).toLocaleString(),
                  ],
                }),
                criticalIssues.length > 0 &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-2 space-y-1",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "font-medium",
                        children: "Critical issues that need attention:",
                      }),
                      (0, jsx_runtime_1.jsx)("ul", {
                        className: "list-disc list-inside",
                        children: criticalIssues.map(function (issue, idx) {
                          return (0, jsx_runtime_1.jsxs)(
                            "li",
                            {
                              className: "text-sm",
                              children: [issue.name, ": ", issue.message],
                            },
                            idx,
                          );
                        }),
                      }),
                    ],
                  }),
                (0, jsx_runtime_1.jsx)("div", {
                  className: "mt-4",
                  children: (0, jsx_runtime_1.jsx)(button_1.Button, {
                    onClick: runNewAudit,
                    size: "sm",
                    variant: "outline",
                    children: "Run New Audit",
                  }),
                }),
              ],
            }),
          ],
        }),
      (0, jsx_runtime_1.jsx)(PreLaunchAudit_1.default, {}),
      auditResults &&
        auditResults.issues &&
        auditResults.issues.length > 0 &&
        (0, jsx_runtime_1.jsxs)(card_1.Card, {
          className: "mt-6",
          children: [
            (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
              children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                    className: "h-5 w-5 text-amber-500",
                  }),
                  "Detected Issues",
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(card_1.CardContent, {
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-6",
                children: [
                  criticalIssues.length > 0 &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className:
                            "text-lg font-medium text-red-600 dark:text-red-400",
                          children: "Critical Issues",
                        }),
                        criticalIssues.map(function (issue, idx) {
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              className:
                                "p-4 rounded-md bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.AlertTriangle,
                                      { className: "h-5 w-5 text-red-500" },
                                    ),
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className: "font-medium",
                                      children: issue.name,
                                    }),
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className:
                                        "ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10",
                                      children: issue.severity,
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "mt-2 text-sm",
                                  children: issue.message,
                                }),
                                issue.details &&
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className:
                                      "mt-2 text-xs bg-red-100 dark:bg-red-800/30 p-2 rounded",
                                    children: [
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className: "font-medium mb-1",
                                        children: "Details:",
                                      }),
                                      (0, jsx_runtime_1.jsx)("div", {
                                        className:
                                          "whitespace-pre-wrap font-mono",
                                        children:
                                          typeof issue.details === "object"
                                            ? JSON.stringify(
                                                issue.details,
                                                null,
                                                2,
                                              )
                                            : issue.details,
                                      }),
                                    ],
                                  }),
                              ],
                            },
                            idx,
                          );
                        }),
                      ],
                    }),
                  warningIssues.length > 0 &&
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-4",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className:
                            "text-lg font-medium text-amber-600 dark:text-amber-400",
                          children: "Warnings",
                        }),
                        warningIssues.map(function (issue, idx) {
                          return (0, jsx_runtime_1.jsxs)(
                            "div",
                            {
                              className:
                                "p-4 rounded-md bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800",
                              children: [
                                (0, jsx_runtime_1.jsxs)("div", {
                                  className: "flex items-center gap-2",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.AlertTriangle,
                                      { className: "h-5 w-5 text-amber-500" },
                                    ),
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className: "font-medium",
                                      children: issue.name,
                                    }),
                                    (0, jsx_runtime_1.jsx)("div", {
                                      className:
                                        "ml-auto text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider bg-black/10 dark:bg-white/10",
                                      children: issue.severity,
                                    }),
                                  ],
                                }),
                                (0, jsx_runtime_1.jsx)("div", {
                                  className: "mt-2 text-sm",
                                  children: issue.message,
                                }),
                              ],
                            },
                            idx,
                          );
                        }),
                      ],
                    }),
                ],
              }),
            }),
          ],
        }),
      auditResults &&
        (0, jsx_runtime_1.jsxs)("div", {
          className: "grid grid-cols-1 md:grid-cols-3 gap-6 mt-6",
          children: [
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2 text-base",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Database, {
                        className: "h-4 w-4 text-primary/80",
                      }),
                      "Database Performance",
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm",
                    children: (
                      (_d =
                        (_c = auditResults.checks) === null || _c === void 0
                          ? void 0
                          : _c.performance) === null || _d === void 0
                        ? void 0
                        : _d.valid
                    )
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-green-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-4 w-4" },
                            ),
                            "Queries execute within recommended time",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-amber-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              { className: "h-4 w-4" },
                            ),
                            "Some queries exceed recommended execution time",
                          ],
                        }),
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2 text-base",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "h-4 w-4 text-primary/80",
                      }),
                      "Security Status",
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm",
                    children: (
                      (_f =
                        (_e = auditResults.checks) === null || _e === void 0
                          ? void 0
                          : _e.security) === null || _f === void 0
                        ? void 0
                        : _f.valid
                    )
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-green-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-4 w-4" },
                            ),
                            "Authentication mechanisms are properly secured",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-red-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              { className: "h-4 w-4" },
                            ),
                            "Security vulnerabilities detected",
                          ],
                        }),
                  }),
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(card_1.Card, {
              children: [
                (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
                  className: "pb-2",
                  children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center gap-2 text-base",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                        className: "h-4 w-4 text-primary/80",
                      }),
                      "GDPR Compliance",
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                  children: (0, jsx_runtime_1.jsx)("div", {
                    className: "text-sm",
                    children: (
                      (_h =
                        (_g = auditResults.checks) === null || _g === void 0
                          ? void 0
                          : _g.gdpr) === null || _h === void 0
                        ? void 0
                        : _h.valid
                    )
                      ? (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-green-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.CheckCircle2,
                              { className: "h-4 w-4" },
                            ),
                            "User data handling meets GDPR requirements",
                          ],
                        })
                      : (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center gap-2 text-red-600",
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              lucide_react_1.AlertTriangle,
                              { className: "h-4 w-4" },
                            ),
                            "Some user data handling doesn't meet GDPR requirements",
                          ],
                        }),
                  }),
                }),
              ],
            }),
          ],
        }),
    ],
  });
}
