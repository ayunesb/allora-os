"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var use_toast_1 = require("@/components/ui/use-toast");
var RecommendationCard = function (_a) {
  var recommendation = _a.recommendation,
    onImplement = _a.onImplement,
    onDismiss = _a.onDismiss;
  var toast = (0, use_toast_1.useToast)().toast;
  var handleImplement = function () {
    if (onImplement) {
      onImplement(recommendation.id);
      toast({
        title: "Recommendation implemented",
        description:
          "The recommended action has been implemented successfully.",
        action: (0, jsx_runtime_1.jsx)(button_1.Button, {
          variant: "outline",
          size: "sm",
          children: "Undo",
        }),
      });
    }
  };
  var handleDismiss = function () {
    if (onDismiss) {
      onDismiss(recommendation.id);
      toast({
        title: "Recommendation dismissed",
        description: "The recommendation has been dismissed.",
      });
    }
  };
  var getImpactColor = function (impact) {
    switch (impact) {
      case "high":
        return "text-red-500 bg-red-50 dark:bg-red-900/20";
      case "medium":
        return "text-amber-500 bg-amber-50 dark:bg-amber-900/20";
      case "low":
        return "text-green-500 bg-green-50 dark:bg-green-900/20";
      default:
        return "text-blue-500 bg-blue-50 dark:bg-blue-900/20";
    }
  };
  var getCategoryIcon = function (category) {
    switch (category) {
      case "strategy":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
          className: "h-5 w-5",
        });
      case "marketing":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.AlertTriangle, {
          className: "h-5 w-5",
        });
      case "sales":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
          className: "h-5 w-5",
        });
      case "operations":
        return (0, jsx_runtime_1.jsx)(lucide_react_1.CheckCircle, {
          className: "h-5 w-5",
        });
      default:
        return (0, jsx_runtime_1.jsx)(lucide_react_1.TrendingUp, {
          className: "h-5 w-5",
        });
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "overflow-hidden transition-all hover:shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                className: "flex items-center space-x-2",
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "p-1.5 rounded-full ".concat(
                      getImpactColor(recommendation.impact),
                    ),
                    children: getCategoryIcon(recommendation.category),
                  }),
                  (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                    className: "text-lg",
                    children: recommendation.title,
                  }),
                ],
              }),
              recommendation.isImplemented &&
                (0, jsx_runtime_1.jsx)("span", {
                  className:
                    "text-xs px-2 py-1 bg-green-50 text-green-600 dark:bg-green-900/20 dark:text-green-400 rounded-full font-medium",
                  children: "Implemented",
                }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            children: [
              recommendation.aiGenerated &&
                (0, jsx_runtime_1.jsx)("span", {
                  className:
                    "text-xs bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 px-2 py-0.5 rounded-full mr-2",
                  children: "AI Generated",
                }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs capitalize",
                children: recommendation.category,
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm",
          children: recommendation.description,
        }),
      }),
      !recommendation.isImplemented &&
        (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
          className: "flex justify-between pt-2 border-t",
          children: [
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "ghost",
              size: "sm",
              onClick: handleDismiss,
              children: "Dismiss",
            }),
            (0, jsx_runtime_1.jsx)(button_1.Button, {
              variant: "default",
              size: "sm",
              onClick: handleImplement,
              children: "Implement",
            }),
          ],
        }),
    ],
  });
};
exports.default = RecommendationCard;
