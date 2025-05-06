"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Overview;
var jsx_runtime_1 = require("react/jsx-runtime");
var ComplianceUpdateNotification_1 = require("@/components/compliance/ComplianceUpdateNotification");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
function Overview() {
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-6",
    children: [
      (0, jsx_runtime_1.jsx)(ComplianceUpdateNotification_1.default, {
        className: "mb-6",
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center text-xl",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.Shield, {
                        className: "mr-2 h-5 w-5 text-primary",
                      }),
                      "Compliance Status",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Current regulatory compliance status",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm font-medium",
                          children: "GDPR",
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className:
                            "bg-green-50 text-green-700 border-green-200 flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                              className: "mr-1 h-3 w-3",
                            }),
                            " Compliant",
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm font-medium",
                          children: "CCPA",
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className:
                            "bg-green-50 text-green-700 border-green-200 flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                              className: "mr-1 h-3 w-3",
                            }),
                            " Compliant",
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm font-medium",
                          children: "HIPAA",
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className:
                            "bg-yellow-50 text-yellow-700 border-yellow-200 flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                              className: "mr-1 h-3 w-3",
                            }),
                            " Partial",
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center justify-between",
                      children: [
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-sm font-medium",
                          children: "PCI DSS",
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className:
                            "bg-green-50 text-green-700 border-green-200 flex items-center",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                              className: "mr-1 h-3 w-3",
                            }),
                            " Compliant",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
                    className: "flex items-center text-xl",
                    children: [
                      (0, jsx_runtime_1.jsx)(lucide_react_1.FileWarning, {
                        className: "mr-2 h-5 w-5 text-primary",
                      }),
                      "Required Actions",
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Items that need your attention",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium mb-1",
                          children: "Update Privacy Policy",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Due in 14 days",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium mb-1",
                          children: "Review Data Retention Settings",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Due in 30 days",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "text-sm",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium mb-1",
                          children: "Quarterly Compliance Audit",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: "Due in 45 days",
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
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-xl",
                children: "Compliance Calendar",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Upcoming compliance deadlines and events",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-4",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start space-x-4 pb-4 border-b",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs",
                          children: "APR",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xl",
                          children: "24",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h4", {
                          className: "font-medium",
                          children: "GDPR Training Session",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "Annual required training for all employees handling customer data.",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start space-x-4 pb-4 border-b",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs",
                          children: "MAY",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xl",
                          children: "15",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h4", {
                          className: "font-medium",
                          children: "Privacy Policy Update Deadline",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "Required update to comply with new regulations.",
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-start space-x-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "bg-primary/10 text-primary font-medium p-2 rounded-md text-center min-w-16",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xs",
                          children: "JUN",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className: "text-xl",
                          children: "30",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      children: [
                        (0, jsx_runtime_1.jsx)("h4", {
                          className: "font-medium",
                          children: "Quarterly Compliance Review",
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground mt-1",
                          children:
                            "End of quarter review of all compliance measures.",
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
