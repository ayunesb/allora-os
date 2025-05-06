"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SimplifiedRecommendations;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var SimplifiedCard_1 = require("@/components/ui/SimplifiedCard");
var use_toast_1 = require("@/hooks/use-toast");
function SimplifiedRecommendations(_a) {
  var _b = _a.recommendations,
    recommendations = _b === void 0 ? [] : _b,
    onApprove = _a.onApprove,
    _c = _a.isLoading,
    isLoading = _c === void 0 ? false : _c,
    _d = _a.error,
    error = _d === void 0 ? null : _d,
    onRetry = _a.onRetry;
  var toast = (0, use_toast_1.useToast)().toast;
  var handleApprove = function (index) {
    toast({
      title: "Recommendation approved",
      description: "The AI recommendation will be implemented.",
    });
    onApprove(index);
  };
  var getImpactIcon = function (impact) {
    switch (impact) {
      case "high":
        return (0, jsx_runtime_1.jsx)("span", {
          className:
            "bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium",
          children: "High Impact",
        });
      case "medium":
        return (0, jsx_runtime_1.jsx)("span", {
          className:
            "bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium",
          children: "Medium Impact",
        });
      case "low":
        return (0, jsx_runtime_1.jsx)("span", {
          className:
            "bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-medium",
          children: "Low Impact",
        });
      default:
        return null;
    }
  };
  return (0, jsx_runtime_1.jsx)(SimplifiedCard_1.SimplifiedCard, {
    title: "AI Business Recommendations",
    description: "Simple, actionable insights to help your business grow",
    icon: (0, jsx_runtime_1.jsx)(lucide_react_1.Sparkles, {
      className: "h-5 w-5 text-purple-500",
    }),
    isLoading: isLoading,
    error: error,
    onRetry: onRetry,
    variant: "default",
    className: "border-purple-200",
    contentClassName: "space-y-4",
    children:
      recommendations.length === 0
        ? (0, jsx_runtime_1.jsxs)("div", {
            className: "text-center py-8",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Lightbulb, {
                className: "h-10 w-10 text-muted-foreground mx-auto mb-3",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: "No recommendations available at the moment.",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground mt-1",
                children:
                  "Check back later or update your business profile to get personalized suggestions.",
              }),
            ],
          })
        : (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: recommendations.map(function (recommendation, index) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className:
                    "bg-background border rounded-lg p-4 flex flex-col gap-3",
                  children: [
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between items-start",
                      children: [
                        (0, jsx_runtime_1.jsx)("h3", {
                          className: "font-medium text-lg",
                          children: recommendation.title,
                        }),
                        getImpactIcon(recommendation.impact),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      className: "text-muted-foreground",
                      children: recommendation.description,
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex justify-between items-center mt-2",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className:
                            "flex items-center text-sm text-muted-foreground",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.User, {
                              className: "h-3 w-3 mr-1",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: recommendation.category,
                            }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsxs)(button_1.Button, {
                          size: "sm",
                          onClick: function () {
                            return handleApprove(index);
                          },
                          className: "flex items-center gap-1",
                          children: [
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ThumbsUp, {
                              className: "h-4 w-4",
                            }),
                            (0, jsx_runtime_1.jsx)("span", {
                              children: "Approve",
                            }),
                            (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                              className: "h-3 w-3 ml-1",
                            }),
                          ],
                        }),
                      ],
                    }),
                  ],
                },
                recommendation.id,
              );
            }),
          }),
  });
}
