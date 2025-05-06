"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = AdminLaunchPrep;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var typography_1 = require("@/components/ui/typography");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var progress_1 = require("@/components/ui/progress");
var lucide_react_1 = require("lucide-react");
function AdminLaunchPrep() {
  var launchProgress = 65;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto px-4 py-6 space-y-6",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className:
          "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4",
        children: [
          (0, jsx_runtime_1.jsx)(typography_1.TypographyH1, {
            children: "Launch Preparation",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col sm:flex-row gap-2 w-full sm:w-auto",
            children: [
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "outline",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Clipboard, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Export Checklist",
                ],
              }),
              (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "default",
                className: "w-full sm:w-auto",
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
                    className: "h-4 w-4 mr-2",
                  }),
                  "Launch Application",
                ],
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
                children: "Launch Progress",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Complete all necessary steps before launching",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "mb-2 flex items-center justify-between",
                children: [
                  (0, jsx_runtime_1.jsxs)("span", {
                    children: [launchProgress, "% Complete"],
                  }),
                  (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                    variant: launchProgress >= 80 ? "default" : "outline",
                    children:
                      launchProgress >= 80 ? "Ready to Launch" : "In Progress",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(progress_1.Progress, {
                value: launchProgress,
                className: "h-2",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "grid grid-cols-1 md:grid-cols-2 gap-6",
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Technical Checklist",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Verify all technical requirements",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("ul", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className:
                            "h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Database optimization complete",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "All queries have been optimized for production use",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className:
                            "h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Security audit passed",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "All security vulnerabilities have been addressed",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className:
                            "h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Performance testing",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Load testing shows some concerns under high traffic",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, {
                          className:
                            "h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "API documentation",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Complete API documentation for third-party integrations",
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
          (0, jsx_runtime_1.jsxs)(card_1.Card, {
            children: [
              (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
                children: [
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    children: "Business Checklist",
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                    children: "Verify all business requirements",
                  }),
                ],
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardContent, {
                children: (0, jsx_runtime_1.jsxs)("ul", {
                  className: "space-y-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className:
                            "h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Legal approval",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Terms of service and privacy policy approved",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle2, {
                          className:
                            "h-5 w-5 mr-2 text-primary flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Payment integration",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Payment processing tested and verified",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
                          className:
                            "h-5 w-5 mr-2 text-yellow-500 flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Marketing materials",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children: "Some assets still pending approval",
                            }),
                          ],
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("li", {
                      className: "flex items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, {
                          className:
                            "h-5 w-5 mr-2 text-muted-foreground flex-shrink-0 mt-0.5",
                        }),
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Customer support training",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Support team needs training on new features",
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
      (0, jsx_runtime_1.jsxs)(card_1.Card, {
        children: [
          (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                children: "Launch Timeline",
              }),
              (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
                children: "Estimated timeline for launch activities",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardContent, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className:
                "space-y-6 relative before:absolute before:inset-0 before:ml-5 before:w-0.5 before:-translate-x-1/2 before:h-full before:bg-muted",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "relative pl-8",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "absolute left-0 rounded-full bg-primary w-6 h-6 flex items-center justify-center",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.CheckCircle2,
                        { className: "h-4 w-4 text-white" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Database Migration",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Final database schema updates and data migration",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className: "w-fit flex items-center gap-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                              className: "h-3 w-3",
                            }),
                            "Completed",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "relative pl-8",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "absolute left-0 rounded-full bg-primary w-6 h-6 flex items-center justify-center",
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.CheckCircle2,
                        { className: "h-4 w-4 text-white" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Security Audit",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Final security checks and penetration testing",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className: "w-fit flex items-center gap-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                              className: "h-3 w-3",
                            }),
                            "Completed",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "relative pl-8",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "absolute left-0 rounded-full bg-yellow-500 w-6 h-6 flex items-center justify-center",
                      children: (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                        className: "h-4 w-4 text-white",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Performance Optimization",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Final performance tuning and optimization",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className:
                            "w-fit flex items-center gap-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                              className: "h-3 w-3",
                            }),
                            "In Progress",
                          ],
                        }),
                      ],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "relative pl-8",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "absolute left-0 rounded-full bg-muted w-6 h-6 flex items-center justify-center",
                      children: (0, jsx_runtime_1.jsx)(lucide_react_1.Circle, {
                        className: "h-4 w-4 text-muted-foreground",
                      }),
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className:
                        "flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          children: [
                            (0, jsx_runtime_1.jsx)("p", {
                              className: "font-medium",
                              children: "Go-Live",
                            }),
                            (0, jsx_runtime_1.jsx)(typography_1.TypographyP, {
                              children:
                                "Official product launch and public announcement",
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                          variant: "outline",
                          className: "w-fit flex items-center gap-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.Clock, {
                              className: "h-3 w-3",
                            }),
                            "Scheduled for Apr 20",
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
    ],
  });
}
