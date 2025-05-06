"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductionDataStatus = ProductionDataStatus;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var table_1 = require("@/components/ui/table");
var accordion_1 = require("@/components/ui/accordion");
function ProductionDataStatus(_a) {
  var validationResults = _a.validationResults,
    isValidating = _a.isValidating,
    onValidate = _a.onValidate;
  if (isValidating) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      className: "mb-6",
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          className: "pb-2",
          children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "text-lg flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                className: "h-4 w-4 mr-2 animate-spin",
              }),
              "Running Production Data Validation",
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground mb-2",
              children:
                "Scanning database for test data and potential production issues...",
            }),
            (0, jsx_runtime_1.jsx)("div", {
              className: "h-2 w-full bg-muted overflow-hidden rounded-full",
              children: (0, jsx_runtime_1.jsx)("div", {
                className: "h-full bg-primary animate-pulse rounded-full",
                style: { width: "60%" },
              }),
            }),
          ],
        }),
      ],
    });
  }
  if (!validationResults) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          className: "pb-2",
          children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "text-lg flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.ShieldAlert, {
                className: "h-4 w-4 mr-2",
              }),
              "Production Data Status",
            ],
          }),
        }),
        (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
          children: [
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground mb-4",
              children:
                "Validate your production data to ensure no test or demo data is present in your database.",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              onClick: onValidate,
              disabled: isValidating,
              children: "Run Validation",
            }),
          ],
        }),
      ],
    });
  }
  // Production data has been validated
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: validationResults.success
      ? "border-green-200 bg-green-50/50 dark:bg-green-900/10"
      : "border-amber-200 bg-amber-50/50 dark:bg-amber-900/10",
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        className: "pb-2",
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "text-lg flex items-center justify-between",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center",
              children: [
                validationResults.success
                  ? (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                      className: "h-4 w-4 mr-2 text-green-500",
                    })
                  : (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4 mr-2 text-amber-500",
                    }),
                "Production Data Status",
              ],
            }),
            (0, jsx_runtime_1.jsx)(badge_1.Badge, {
              variant: validationResults.success ? "outline" : "outline",
              className: validationResults.success
                ? "bg-green-100 text-green-700 border-green-200"
                : "bg-amber-100 text-amber-700 border-amber-200",
              children: validationResults.success
                ? "Ready for Production"
                : "Issues Found",
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "grid grid-cols-2 md:grid-cols-4 gap-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-background rounded-md p-2 border",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-xs text-muted-foreground",
                      children: "Valid Records",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-lg font-semibold",
                      children: validationResults.validRecords,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-background rounded-md p-2 border",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-xs text-muted-foreground",
                      children: "Errors",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-lg font-semibold",
                      children: validationResults.errors.length,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-background rounded-md p-2 border",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-xs text-muted-foreground",
                      children: "Warnings",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-lg font-semibold",
                      children: validationResults.warnings.length,
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-background rounded-md p-2 border",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-xs text-muted-foreground",
                      children: "Cleaned Items",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "text-lg font-semibold flex items-center",
                      children: validationResults.cleanupPerformed
                        ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                            children: [
                              (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                                className: "h-3 w-3 mr-1 text-amber-500",
                              }),
                              validationResults.validationDetails.companies
                                .cleaned +
                                validationResults.validationDetails.leads
                                  .cleaned +
                                validationResults.validationDetails.strategies
                                  .cleaned +
                                validationResults.validationDetails.campaigns
                                  .cleaned,
                            ],
                          })
                        : "0",
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsxs)(table_1.Table, {
              className: "bg-background border rounded-md text-xs",
              children: [
                (0, jsx_runtime_1.jsx)(table_1.TableHeader, {
                  children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                    children: [
                      (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                        children: "Table",
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                        className: "text-right",
                        children: "Total",
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                        className: "text-right",
                        children: "Valid",
                      }),
                      (0, jsx_runtime_1.jsx)(table_1.TableHead, {
                        className: "text-right",
                        children: "Cleaned",
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(table_1.TableBody, {
                  children: [
                    (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-medium",
                          children: "Companies",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.companies.total,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.companies.valid,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.companies
                              .cleaned,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-medium",
                          children: "Leads",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.leads.total,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.leads.valid,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.leads.cleaned,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-medium",
                          children: "Strategies",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.strategies
                              .total,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.strategies
                              .valid,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.strategies
                              .cleaned,
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(table_1.TableRow, {
                      children: [
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "font-medium",
                          children: "Campaigns",
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.campaigns.total,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.campaigns.valid,
                        }),
                        (0, jsx_runtime_1.jsx)(table_1.TableCell, {
                          className: "text-right",
                          children:
                            validationResults.validationDetails.campaigns
                              .cleaned,
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            (validationResults.errors.length > 0 ||
              validationResults.warnings.length > 0) &&
              (0, jsx_runtime_1.jsxs)(accordion_1.Accordion, {
                type: "single",
                collapsible: true,
                className: "w-full",
                children: [
                  validationResults.errors.length > 0 &&
                    (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
                      value: "errors",
                      children: [
                        (0, jsx_runtime_1.jsxs)(accordion_1.AccordionTrigger, {
                          className: "text-sm text-red-600",
                          children: [
                            validationResults.errors.length,
                            " Errors",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, {
                          children: (0, jsx_runtime_1.jsx)("ul", {
                            className:
                              "text-xs space-y-1 mt-2 max-h-40 overflow-y-auto",
                            children: validationResults.errors.map(
                              function (error, index) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "li",
                                  {
                                    className:
                                      "text-red-600 bg-red-50 p-1 rounded flex items-start",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.AlertCircle,
                                        {
                                          className:
                                            "h-3 w-3 mr-1 mt-0.5 flex-shrink-0",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        children: [
                                          (0, jsx_runtime_1.jsxs)("span", {
                                            className: "font-semibold",
                                            children: [error.table, ":"],
                                          }),
                                          " ",
                                          error.message,
                                          error.recordId &&
                                            (0, jsx_runtime_1.jsxs)("div", {
                                              className: "text-xs text-red-500",
                                              children: [
                                                "ID: ",
                                                error.recordId,
                                              ],
                                            }),
                                        ],
                                      }),
                                    ],
                                  },
                                  index,
                                );
                              },
                            ),
                          }),
                        }),
                      ],
                    }),
                  validationResults.warnings.length > 0 &&
                    (0, jsx_runtime_1.jsxs)(accordion_1.AccordionItem, {
                      value: "warnings",
                      children: [
                        (0, jsx_runtime_1.jsxs)(accordion_1.AccordionTrigger, {
                          className: "text-sm text-amber-600",
                          children: [
                            validationResults.warnings.length,
                            " Warnings",
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)(accordion_1.AccordionContent, {
                          children: (0, jsx_runtime_1.jsx)("ul", {
                            className:
                              "text-xs space-y-1 mt-2 max-h-40 overflow-y-auto",
                            children: validationResults.warnings.map(
                              function (warning, index) {
                                return (0, jsx_runtime_1.jsxs)(
                                  "li",
                                  {
                                    className:
                                      "text-amber-600 bg-amber-50 p-1 rounded flex items-start",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        lucide_react_1.Trash2,
                                        {
                                          className:
                                            "h-3 w-3 mr-1 mt-0.5 flex-shrink-0",
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsxs)("div", {
                                        children: [
                                          (0, jsx_runtime_1.jsxs)("span", {
                                            className: "font-semibold",
                                            children: [warning.table, ":"],
                                          }),
                                          " ",
                                          warning.message,
                                          warning.recordId &&
                                            (0, jsx_runtime_1.jsxs)("div", {
                                              className:
                                                "text-xs text-amber-500",
                                              children: [
                                                "ID: ",
                                                warning.recordId,
                                              ],
                                            }),
                                        ],
                                      }),
                                    ],
                                  },
                                  index,
                                );
                              },
                            ),
                          }),
                        }),
                      ],
                    }),
                ],
              }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center justify-between",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "text-xs text-muted-foreground",
                  children: [
                    "Last validated: ",
                    new Date(validationResults.timestamp).toLocaleString(),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  onClick: onValidate,
                  disabled: isValidating,
                  variant: "outline",
                  size: "sm",
                  children: "Run Again",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
}
