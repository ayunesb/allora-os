"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var alert_dialog_1 = require("@/components/ui/alert-dialog");
var tooltip_1 = require("@/components/ui/tooltip");
var use_mobile_1 = require("@/hooks/use-mobile");
var StrategyCard = function (_a) {
  var strategy = _a.strategy,
    onEdit = _a.onEdit,
    onDelete = _a.onDelete,
    onView = _a.onView;
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobile = breakpoint === "mobile";
  var getRiskColor = function (risk) {
    switch (risk) {
      case "High":
        return "bg-red-500/20 text-red-400";
      case "Medium":
        return "bg-amber-500/20 text-amber-400";
      case "Low":
        return "bg-green-500/20 text-green-400";
      default:
        return "bg-blue-500/20 text-blue-400";
    }
  };
  var handleCardClick = function () {
    if (onView) {
      onView();
    }
  };
  // Use riskLevel property, with fallback to risk_level for backward compatibility
  var riskLevel = strategy.riskLevel || strategy.risk_level || "Medium";
  return (0, jsx_runtime_1.jsxs)(
    "div",
    {
      className: "dashboard-card flex flex-col cursor-pointer",
      "data-testid": "strategy-card-".concat(strategy.id),
      onClick: handleCardClick,
      children: [
        (0, jsx_runtime_1.jsxs)("div", {
          className:
            "flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2 sm:gap-0 mb-3 sm:mb-4",
          children: [
            (0, jsx_runtime_1.jsx)("h3", {
              className: "text-lg sm:text-xl font-bold",
              children: strategy.title,
            }),
            (0, jsx_runtime_1.jsxs)("span", {
              className:
                "self-start sm:self-auto px-3 py-1 rounded-full text-xs font-medium ".concat(
                  getRiskColor(riskLevel),
                ),
              children: [riskLevel, " Risk"],
            }),
          ],
        }),
        (0, jsx_runtime_1.jsx)("p", {
          className: "text-gray-300 mb-4 sm:mb-6 line-clamp-3",
          children: strategy.description,
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "mt-auto flex justify-between",
          children: [
            (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
              children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                children: [
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                      variant: "outline",
                      size: isMobile ? "sm" : "sm",
                      onClick: function (e) {
                        e.stopPropagation();
                        onEdit(strategy.id);
                      },
                      "aria-label": "Edit ".concat(strategy.title),
                      children: [
                        (0, jsx_runtime_1.jsx)(lucide_react_1.Edit, {
                          className: "mr-2 h-4 w-4",
                        }),
                        "Edit",
                      ],
                    }),
                  }),
                  (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                    children: (0, jsx_runtime_1.jsx)("p", {
                      children: "Edit this strategy",
                    }),
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialog, {
              children: [
                (0, jsx_runtime_1.jsx)(tooltip_1.TooltipProvider, {
                  children: (0, jsx_runtime_1.jsxs)(tooltip_1.Tooltip, {
                    children: [
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipTrigger, {
                        asChild: true,
                        children: (0, jsx_runtime_1.jsx)(
                          alert_dialog_1.AlertDialogTrigger,
                          {
                            asChild: true,
                            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                              variant: "destructive",
                              size: isMobile ? "sm" : "sm",
                              onClick: function (e) {
                                return e.stopPropagation();
                              },
                              "aria-label": "Delete ".concat(strategy.title),
                              children: [
                                (0, jsx_runtime_1.jsx)(lucide_react_1.Trash2, {
                                  className: "mr-2 h-4 w-4",
                                }),
                                "Delete",
                              ],
                            }),
                          },
                        ),
                      }),
                      (0, jsx_runtime_1.jsx)(tooltip_1.TooltipContent, {
                        children: (0, jsx_runtime_1.jsx)("p", {
                          children: "Delete this strategy",
                        }),
                      }),
                    ],
                  }),
                }),
                (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogContent, {
                  onClick: function (e) {
                    return e.stopPropagation();
                  },
                  className: "w-full max-w-md mx-4",
                  children: [
                    (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogHeader, {
                      children: [
                        (0, jsx_runtime_1.jsx)(
                          alert_dialog_1.AlertDialogTitle,
                          { children: "Are you sure?" },
                        ),
                        (0, jsx_runtime_1.jsxs)(
                          alert_dialog_1.AlertDialogDescription,
                          {
                            children: [
                              'This action cannot be undone. This will permanently delete your strategy "',
                              strategy.title,
                              '".',
                            ],
                          },
                        ),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)(alert_dialog_1.AlertDialogFooter, {
                      className: "flex-col sm:flex-row gap-2 sm:gap-0",
                      children: [
                        (0, jsx_runtime_1.jsx)(
                          alert_dialog_1.AlertDialogCancel,
                          { children: "Cancel" },
                        ),
                        (0, jsx_runtime_1.jsx)(
                          alert_dialog_1.AlertDialogAction,
                          {
                            onClick: function (e) {
                              e.stopPropagation();
                              onDelete(strategy.id);
                            },
                            className:
                              "bg-destructive text-destructive-foreground hover:bg-destructive/90",
                            children: "Delete",
                          },
                        ),
                      ],
                    }),
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    },
    strategy.id,
  );
};
exports.default = react_1.default.memo(StrategyCard);
