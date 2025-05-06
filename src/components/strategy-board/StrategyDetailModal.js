"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var dialog_1 = require("@/components/ui/dialog");
var tabs_1 = require("@/components/ui/tabs");
var lucide_react_1 = require("lucide-react");
var StrategyImplementationTools_1 = require("../strategy-implementation/StrategyImplementationTools");
var use_mobile_1 = require("@/hooks/use-mobile");
var StrategyDetailModal = function (_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    strategy = _a.strategy;
  var _b = (0, react_1.useState)("details"),
    activeTab = _b[0],
    setActiveTab = _b[1];
  var breakpoint = (0, use_mobile_1.useBreakpoint)();
  var isMobileView = ["xs", "mobile"].includes(breakpoint);
  if (!strategy) return null;
  // Get risk-based classes for styling
  var getRiskClasses = function (risk) {
    switch (risk) {
      case "Low":
        return "bg-risk-low text-risk-low-DEFAULT dark:text-risk-low-dark";
      case "High":
        return "bg-risk-high text-risk-high-DEFAULT dark:text-risk-high-dark";
      case "Medium":
      default:
        return "bg-risk-medium text-risk-medium-DEFAULT dark:text-risk-medium-dark";
    }
  };
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: onClose,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className:
        "sm:max-w-4xl max-h-[90vh] overflow-y-auto bg-[#0c0f1f] border-gray-800 text-white",
      children: [
        (0, jsx_runtime_1.jsx)(dialog_1.DialogHeader, {
          children: (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
            className: "text-2xl",
            children: strategy.title,
          }),
        }),
        (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
          value: activeTab,
          onValueChange: setActiveTab,
          className: "mt-4",
          children: [
            (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
              className: "bg-gray-800/50 ".concat(
                isMobileView ? "w-full tabs-scrollable" : "",
              ),
              children: [
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "details",
                  className: isMobileView
                    ? "text-xs px-2 py-1 tab-compact"
                    : "",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.FileText, {
                      className: "h-4 w-4 mr-2",
                    }),
                    "Strategy Details",
                  ],
                }),
                (0, jsx_runtime_1.jsxs)(tabs_1.TabsTrigger, {
                  value: "implementation",
                  className: isMobileView
                    ? "text-xs px-2 py-1 tab-compact"
                    : "",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                      className: "h-4 w-4 mr-2",
                    }),
                    isMobileView ? "Implementation" : "Implementation Tools",
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "details",
              className: "pt-4",
              children: (0, jsx_runtime_1.jsxs)("div", {
                className: "space-y-6",
                children: [
                  (0, jsx_runtime_1.jsxs)("div", {
                    children: [
                      (0, jsx_runtime_1.jsx)("h3", {
                        className: "text-lg font-medium text-gray-300 mb-2",
                        children: "Description",
                      }),
                      (0, jsx_runtime_1.jsx)("p", {
                        className: "text-gray-400",
                        children: strategy.description,
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)("div", {
                    className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "bg-gray-800/50 p-4 rounded-lg",
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-sm font-medium text-gray-300 mb-2",
                            children: "Risk Level",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "flex items-center",
                            children: (0, jsx_runtime_1.jsxs)("span", {
                              className:
                                "px-2 py-1 rounded-full text-xs font-medium ".concat(
                                  getRiskClasses(strategy.risk),
                                ),
                              children: [strategy.risk, " Risk"],
                            }),
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "bg-gray-800/50 p-4 rounded-lg",
                        children: [
                          (0, jsx_runtime_1.jsx)("h3", {
                            className: "text-sm font-medium text-gray-300 mb-2",
                            children: "Proposed By",
                          }),
                          (0, jsx_runtime_1.jsx)("div", {
                            className: "text-gray-100",
                            children:
                              strategy.executiveBot || "AI Executive Team",
                          }),
                        ],
                      }),
                      strategy.impact &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "bg-gray-800/50 p-4 rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className:
                                "text-sm font-medium text-gray-300 mb-2",
                              children: "Expected Impact",
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-gray-100",
                              children: strategy.impact,
                            }),
                          ],
                        }),
                      strategy.timeframe &&
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "bg-gray-800/50 p-4 rounded-lg",
                          children: [
                            (0, jsx_runtime_1.jsx)("h3", {
                              className:
                                "text-sm font-medium text-gray-300 mb-2",
                              children: "Timeframe",
                            }),
                            (0, jsx_runtime_1.jsx)("div", {
                              className: "text-gray-100",
                              children: strategy.timeframe,
                            }),
                          ],
                        }),
                    ],
                  }),
                ],
              }),
            }),
            (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
              value: "implementation",
              children: (0, jsx_runtime_1.jsx)(
                StrategyImplementationTools_1.default,
                { strategyId: strategy.id, strategyName: strategy.title },
              ),
            }),
          ],
        }),
      ],
    }),
  });
};
exports.default = StrategyDetailModal;
