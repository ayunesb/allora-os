"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = InsightDetailsDialog;
var jsx_runtime_1 = require("react/jsx-runtime");
var dialog_1 = require("@/components/ui/dialog");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
var separator_1 = require("@/components/ui/separator");
var lucide_react_1 = require("lucide-react");
var consultation_1 = require("@/utils/consultation");
var useCompanyInsights_1 = require("@/hooks/useCompanyInsights");
function InsightDetailsDialog(_a) {
  var insight = _a.insight,
    open = _a.open,
    onOpenChange = _a.onOpenChange;
  var getDetailedInsight = (0, useCompanyInsights_1.useCompanyInsights)()
    .getDetailedInsight;
  if (!insight) {
    return null;
  }
  var detailedInsight = getDetailedInsight(insight.id);
  return (0, jsx_runtime_1.jsx)(dialog_1.Dialog, {
    open: open,
    onOpenChange: onOpenChange,
    children: (0, jsx_runtime_1.jsxs)(dialog_1.DialogContent, {
      className: "sm:max-w-[600px] max-h-[80vh] overflow-y-auto",
      children: [
        (0, jsx_runtime_1.jsxs)(dialog_1.DialogHeader, {
          children: [
            (0, jsx_runtime_1.jsx)(dialog_1.DialogTitle, {
              children: insight.title,
            }),
            (0, jsx_runtime_1.jsx)(dialog_1.DialogDescription, {
              children: "AI Executive Team Recommendation",
            }),
          ],
        }),
        (0, jsx_runtime_1.jsxs)("div", {
          className: "space-y-6 mt-4",
          children: [
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-start gap-3",
              children: [
                (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                  className: "h-12 w-12",
                  children: [
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                      src: insight.primaryBot.avatar,
                      alt: insight.primaryBot.name,
                    }),
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                      children: insight.primaryBot.name[0],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsxs)("div", {
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex items-center gap-2 mb-1",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium",
                          children: insight.primaryBot.name,
                        }),
                        (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                          variant: "outline",
                          children: (0, consultation_1.formatRoleTitle)(
                            insight.primaryBot.role,
                          ),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-sm text-muted-foreground",
                      children: "Primary contributor to this ".concat(
                        insight.type,
                        " recommendation",
                      ),
                    }),
                  ],
                }),
              ],
            }),
            (0, jsx_runtime_1.jsx)(separator_1.Separator, {}),
            (detailedInsight === null || detailedInsight === void 0
              ? void 0
              : detailedInsight.executiveSummary) &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium mb-2",
                    children: "Executive Summary",
                  }),
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm",
                    children: detailedInsight.executiveSummary,
                  }),
                ],
              }),
            (detailedInsight === null || detailedInsight === void 0
              ? void 0
              : detailedInsight.keyPoints) &&
              detailedInsight.keyPoints.length > 0 &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium mb-2",
                    children: "Key Points",
                  }),
                  (0, jsx_runtime_1.jsx)("ul", {
                    className: "space-y-2",
                    children: detailedInsight.keyPoints.map(
                      function (point, index) {
                        return (0, jsx_runtime_1.jsxs)(
                          "li",
                          {
                            className: "flex items-start gap-2",
                            children: [
                              (0, jsx_runtime_1.jsx)(
                                lucide_react_1.ArrowRight,
                                {
                                  className:
                                    "h-4 w-4 mt-0.5 text-blue-500 shrink-0",
                                },
                              ),
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-sm",
                                children: point,
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
            (0, jsx_runtime_1.jsxs)("div", {
              children: [
                (0, jsx_runtime_1.jsx)("h4", {
                  className: "font-medium mb-2",
                  children: "Detailed Reasoning",
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-sm",
                  children:
                    (detailedInsight === null || detailedInsight === void 0
                      ? void 0
                      : detailedInsight.reasoning) || insight.description,
                }),
              ],
            }),
            (detailedInsight === null || detailedInsight === void 0
              ? void 0
              : detailedInsight.contributors) &&
              detailedInsight.contributors.length > 0 &&
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("h4", {
                    className: "font-medium mb-3",
                    children: "Contributing Executives",
                  }),
                  (0, jsx_runtime_1.jsx)("div", {
                    className: "space-y-3",
                    children: detailedInsight.contributors.map(
                      function (contributor, index) {
                        return (0, jsx_runtime_1.jsx)(
                          ContributorItem,
                          { contributor: contributor },
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
  });
}
function ContributorItem(_a) {
  var contributor = _a.contributor;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-start gap-3",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mt-0.5",
        children: [
          contributor.opinion === "positive" &&
            (0, jsx_runtime_1.jsx)(lucide_react_1.Check, {
              className: "h-4 w-4 text-green-500",
            }),
          contributor.opinion === "negative" &&
            (0, jsx_runtime_1.jsx)(lucide_react_1.X, {
              className: "h-4 w-4 text-red-500",
            }),
          contributor.opinion === "neutral" &&
            (0, jsx_runtime_1.jsx)(lucide_react_1.Minus, {
              className: "h-4 w-4 text-yellow-500",
            }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex items-center gap-1.5",
            children: [
              (0, jsx_runtime_1.jsx)("span", {
                className: "font-medium text-sm",
                children: contributor.name,
              }),
              (0, jsx_runtime_1.jsxs)("span", {
                className: "text-xs text-muted-foreground",
                children: [
                  "(",
                  (0, consultation_1.formatRoleTitle)(contributor.role),
                  ")",
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-xs mt-0.5 text-muted-foreground",
            children: contributor.contribution,
          }),
        ],
      }),
    ],
  });
}
