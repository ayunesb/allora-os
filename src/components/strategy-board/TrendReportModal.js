"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var TrendReportModal = function (_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    trendData = _a.trendData;
  if (!trendData) return null;
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: isOpen,
    onOpenChange: function (open) {
      return !open && onClose();
    },
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-2xl",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              className: "text-2xl font-bold",
              children: trendData.title,
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              className: "text-muted-foreground",
              children:
                "AI industry trend analysis and strategic recommendations",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "text-foreground",
              children: [
                (0, jsx_runtime_1.jsx)("p", {
                  className: "mb-4",
                  children: trendData.content,
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Key Insights",
                }),
                (0, jsx_runtime_1.jsx)("ul", {
                  className: "space-y-2 mb-6",
                  children: trendData.insights.map(function (insight, index) {
                    return (0, jsx_runtime_1.jsxs)(
                      "li",
                      {
                        className: "flex items-start",
                        children: [
                          (0, jsx_runtime_1.jsx)("span", {
                            className: "text-primary mr-2",
                            children: "\u2022",
                          }),
                          (0, jsx_runtime_1.jsx)("span", { children: insight }),
                        ],
                      },
                      index,
                    );
                  }),
                }),
                (0, jsx_runtime_1.jsx)("h3", {
                  className: "text-lg font-medium mb-2",
                  children: "Strategic Recommendations",
                }),
                (0, jsx_runtime_1.jsx)("ul", {
                  className: "space-y-2 mb-6",
                  children: trendData.recommendations.map(
                    function (recommendation, index) {
                      return (0, jsx_runtime_1.jsxs)(
                        "li",
                        {
                          className: "flex items-start",
                          children: [
                            (0, jsx_runtime_1.jsx)("span", {
                              className: "text-primary mr-2",
                              children: "\u2022",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: recommendation,
                            }),
                          ],
                        },
                        index,
                      );
                    },
                  ),
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "bg-muted/40 p-4 rounded-lg mb-6",
                  children: [
                    (0, jsx_runtime_1.jsx)("h3", {
                      className: "text-lg font-medium mb-2",
                      children: "Affected Strategies",
                    }),
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "flex flex-wrap gap-2",
                      children: trendData.relatedStrategies.map(
                        function (strategy, index) {
                          return (0, jsx_runtime_1.jsx)(
                            "span",
                            {
                              className:
                                "bg-primary/10 text-primary px-3 py-1 rounded-full text-sm",
                              children: strategy,
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
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex justify-between items-center pt-4 border-t",
              children: [
                (0, jsx_runtime_1.jsx)("div", {
                  className: "text-sm text-muted-foreground",
                  children: "Report generated by AI Executive Team",
                }),
                trendData.externalLink &&
                  (0, jsx_runtime_1.jsx)(button_1.Button, {
                    variant: "outline",
                    size: "sm",
                    asChild: true,
                    children: (0, jsx_runtime_1.jsxs)("a", {
                      href: trendData.externalLink,
                      target: "_blank",
                      rel: "noopener noreferrer",
                      className: "flex items-center gap-2",
                      children: [
                        "More Information",
                        (0, jsx_runtime_1.jsx)(lucide_react_1.ExternalLink, {
                          className: "h-4 w-4",
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
  });
};
exports.default = TrendReportModal;
