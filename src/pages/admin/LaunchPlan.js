"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LaunchPlan;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var ReadinessChecklist_1 = require("@/components/admin/ReadinessChecklist");
var lucide_react_1 = require("lucide-react");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var button_1 = require("@/components/ui/button");
var sonner_1 = require("sonner");
function LaunchPlan() {
  var _a = react_1.default.useState("preparing"),
    launchState = _a[0],
    setLaunchState = _a[1];
  var handleLaunch = function () {
    // This would actually trigger the launch sequence
    setLaunchState("launched");
    sonner_1.toast.success("🚀 Allora AI has been successfully launched!", {
      description: "The platform is now live for all users.",
    });
  };
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "container mx-auto py-8 space-y-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex justify-between items-center",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-3xl font-bold tracking-tight",
                children: "Launch Plan",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-1",
                children:
                  "Comprehensive implementation plan and launch readiness",
              }),
            ],
          }),
          launchState === "ready"
            ? (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialog, {
                children: [
                  (0, jsx_runtime_1.jsx)(alert_dialog_1.AlertDialogTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      className: "gap-2",
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
                          className: "h-4 w-4",
                        }),
                        "Launch Platform",
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, {
                    children: [
                      (0, jsx_runtime_1.jsxs)(
                        alert_dialog_1.AlertDialogHeader,
                        {
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              alert_dialog_1.AlertDialogTitle,
                              { children: "Are you ready to launch?" },
                            ),
                            (0, jsx_runtime_1.jsx)(
                              alert_dialog_1.AlertDialogDescription,
                              {
                                children:
                                  "This will make Allora AI available to all users. Ensure all critical implementation items are complete before proceeding.",
                              },
                            ),
                          ],
                        },
                      ),
                      (0, jsx_runtime_1.jsxs)(
                        alert_dialog_1.AlertDialogFooter,
                        {
                          children: [
                            (0, jsx_runtime_1.jsx)(
                              alert_dialog_1.AlertDialogCancel,
                              { children: "Cancel" },
                            ),
                            (0, jsx_runtime_1.jsx)(
                              alert_dialog_1.AlertDialogAction,
                              { onClick: handleLaunch, children: "Launch" },
                            ),
                          ],
                        },
                      ),
                    ],
                  }),
                ],
              })
            : launchState === "launched"
              ? (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  className: "gap-2 text-green-600",
                  disabled: true,
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
                      className: "h-4 w-4",
                    }),
                    "Platform Launched",
                  ],
                })
              : (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "outline",
                  className: "gap-2",
                  disabled: true,
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
                      className: "h-4 w-4",
                    }),
                    "Not Ready to Launch",
                  ],
                }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.Card, {
        className: "bg-amber-50 border-amber-200 p-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex items-start gap-3",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
              className: "h-6 w-6 text-amber-600 mt-0.5 shrink-0",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "font-medium text-amber-800 mb-1",
                  children: "Launch Plan Overview",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-amber-700 text-sm",
                  children:
                    "This dashboard tracks the implementation progress for Allora AI launch. Complete all critical items before launching the platform. Run the validation check to ensure all systems are ready.",
                }),
              ],
            }),
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
        defaultValue: "checklist",
        className: "w-full",
        children: [
          (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
            className: "grid w-full grid-cols-3",
            children: [
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "checklist",
                children: "Checklist",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "executive-collective",
                children: "Executive Collective",
              }),
              (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                value: "technical",
                children: "Technical Infrastructure",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "checklist",
            className: "mt-6",
            children: (0, jsx_runtime_1.jsx)(ReadinessChecklist_1.default, {}),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "executive-collective",
            className: "mt-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h2", {
                      className: "text-2xl font-bold tracking-tight",
                      children: "Executive Collective",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Implementation of 100 virtual executives with specialized expertise",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "bg-secondary/40 border border-border/50 rounded-lg p-6 text-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-xl font-bold mb-2",
                      children: "Executive Collective Implementation",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground mb-6",
                      children:
                        "The executive collective feature is being implemented as part of the launch plan. Check the Checklist tab for specific implementation items.",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: function () {
                        var _a;
                        return (_a = document.querySelector(
                          '[value="checklist"]',
                        )) === null || _a === void 0
                          ? void 0
                          : _a.dispatchEvent(new Event("click"));
                      },
                      children: "View Checklist",
                    }),
                  ],
                }),
              ],
            }),
          }),
          (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
            value: "technical",
            className: "mt-6",
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-6",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsx)("h2", {
                      className: "text-2xl font-bold tracking-tight",
                      children: "Technical Infrastructure",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children:
                        "Database, API integrations, and security implementation",
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className:
                    "bg-secondary/40 border border-border/50 rounded-lg p-6 text-center",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-xl font-bold mb-2",
                      children: "Technical Implementation",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground mb-6",
                      children:
                        "Technical infrastructure implementation is tracked as part of the launch plan. Check the Checklist tab for specific implementation items.",
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "outline",
                      onClick: function () {
                        var _a;
                        return (_a = document.querySelector(
                          '[value="checklist"]',
                        )) === null || _a === void 0
                          ? void 0
                          : _a.dispatchEvent(new Event("click"));
                      },
                      children: "View Checklist",
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
