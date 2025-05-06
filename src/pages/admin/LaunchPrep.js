"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchPrep;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var RunAuditButton_1 = require("@/components/admin/RunAuditButton");
var usePreLaunchValidation_1 = require("@/hooks/usePreLaunchValidation");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function LaunchPrep() {
  var _a = (0, usePreLaunchValidation_1.usePreLaunchValidation)(),
    isValidating = _a.isValidating,
    validationResult = _a.validationResult,
    runValidation = _a.runValidation;
  var error = null; // Add an error placeholder to match the expected structure
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6 animate-in fade-in duration-500",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-3xl font-bold tracking-tight",
                children: "Launch Preparation",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-2",
                children:
                  "Ensure your system is ready for production deployment",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(RunAuditButton_1.RunAuditButton, {}),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                className: "flex items-center gap-2",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
                    className: "h-5 w-5 text-primary",
                  }),
                  "Pre-Launch Validation",
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children:
                  "Run automated checks to validate production readiness",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: runValidation,
                  disabled: isValidating,
                  className: "w-full sm:w-auto",
                  children: isValidating
                    ? "Running Validation..."
                    : "Run Production Readiness Check",
                }),
                error &&
                  (0, jsx_runtime_1.jsx)("div", {
                    className:
                      "mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-md text-destructive",
                    children: (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-start gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className: "h-5 w-5 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-semibold",
                              children: "Validation Error",
                            }),
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "text-sm mt-1",
                              children: error,
                            }),
                          ],
                        }),
                      ],
                    }),
                  }),
                validationResult &&
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "mt-4 border rounded-md divide-y",
                    children: [
                      (0, jsx_runtime_1.jsx)("div", {
                        className: "p-4 bg-muted/30",
                        children: (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex items-center justify-between",
                          children: [
                            (0, jsx_runtime_1.jsxs)("h3", {
                              className: "font-medium",
                              children: [
                                "System Readiness: ",
                                validationResult.ready ? "Ready" : "Not Ready",
                              ],
                            }),
                            validationResult.ready
                              ? (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.CheckCircle,
                                      { className: "h-3 w-3" },
                                    ),
                                    " Ready",
                                  ],
                                })
                              : (0, jsx_runtime_1.jsxs)("span", {
                                  className:
                                    "bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1",
                                  children: [
                                    (0, jsx_runtime_1.jsx)(
                                      lucide_react_1.AlertTriangle,
                                      { className: "h-3 w-3" },
                                    ),
                                    " Issues Found",
                                  ],
                                }),
                          ],
                        }),
                      }),
                      validationResult.issues.length > 0 &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "p-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("h4", {
                              className:
                                "font-medium mb-2 text-destructive flex items-center gap-1",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.AlertTriangle,
                                  { className: "h-4 w-4" },
                                ),
                                " Issues to Resolve",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("ul", {
                              className: "space-y-2",
                              children: validationResult.issues.map(
                                function (issue, index) {
                                  return (0, jsx_runtime_1.jsxs)(
                                    "li",
                                    {
                                      className:
                                        "bg-destructive/10 border border-destructive/20 p-3 rounded-md text-sm",
                                      children: [
                                        (0, jsx_runtime_1.jsx)("p", {
                                          className: "font-medium",
                                          children: issue.message,
                                        }),
                                        issue.details &&
                                          (0, jsx_runtime_1.jsx)("div", {
                                            className:
                                              "mt-1 text-muted-foreground",
                                            children: (0, jsx_runtime_1.jsx)(
                                              "pre",
                                              {
                                                className:
                                                  "text-xs overflow-auto p-2 bg-background mt-1 rounded border",
                                                children: JSON.stringify(
                                                  issue.details,
                                                  null,
                                                  2,
                                                ),
                                              },
                                            ),
                                          }),
                                      ],
                                    },
                                    index,
                                  );
                                },
                              ),
                            }),
                          ],
                        }),
                      validationResult.passedChecks.length > 0 &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "p-4",
                          children: [
                            (0, jsx_runtime_1.jsxs)("h4", {
                              className:
                                "font-medium mb-2 text-green-600 flex items-center gap-1",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.CheckCircle,
                                  { className: "h-4 w-4" },
                                ),
                                " Passed Checks",
                              ],
                            }),
                            (0, jsx_runtime_1.jsx)("ul", {
                              className: "space-y-2",
                              children: validationResult.passedChecks.map(
                                function (check, index) {
                                  return (0, jsx_runtime_1.jsx)(
                                    "li",
                                    {
                                      className:
                                        "bg-green-50 border border-green-200 p-3 rounded-md text-sm text-green-800",
                                      children: check.message,
                                    },
                                    index,
                                  );
                                },
                              ),
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
  });
}
