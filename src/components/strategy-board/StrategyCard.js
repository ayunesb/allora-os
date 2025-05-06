"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var button_1 = require("@/components/ui/button");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var avatar_1 = require("@/components/ui/avatar");
var StrategyCard = function (_a) {
  var children = _a.children,
    _b = _a.variant,
    variant = _b === void 0 ? "default" : _b,
    _c = _a.size,
    size = _c === void 0 ? "medium" : _c;
  // Determine the risk level from any of the possible properties
  var riskLevel = strategy.risk || strategy.risk_level || "Medium";
  // Create a mapping of risk levels to badge variants and color classes
  var getRiskStyles = function (risk) {
    switch (risk) {
      case "Low":
        return {
          variant: "outline",
          className:
            "bg-risk-low border-risk-low text-risk-low-DEFAULT dark:text-risk-low-dark",
        };
      case "High":
        return {
          variant: "outline",
          className:
            "bg-risk-high border-risk-high text-risk-high-DEFAULT dark:text-risk-high-dark",
        };
      case "Medium":
      default:
        return {
          variant: "outline",
          className:
            "bg-risk-medium border-risk-medium text-risk-medium-DEFAULT dark:text-risk-medium-dark",
        };
    }
  };
  var riskStyles = getRiskStyles(riskLevel);
  // Format the date for display
  var formattedDate = new Date(strategy.created_at).toLocaleDateString(
    undefined,
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );
  // Get avatar for the executive bot
  var executiveInitials = strategy.executiveBot
    ? strategy.executiveBot.substring(0, 2).toUpperCase()
    : "AI";
  // Generate a consistent avatar background color based on the executive name
  var getAvatarColor = function (name) {
    var colors = [
      "bg-blue-500",
      "bg-green-500",
      "bg-purple-500",
      "bg-amber-500",
      "bg-rose-500",
      "bg-cyan-500",
    ];
    // Simple hash function to get consistent color
    var hash = 0;
    for (var i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return colors[Math.abs(hash) % colors.length];
  };
  var avatarColor = getAvatarColor(strategy.executiveBot || "AI");
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "hover:shadow-md transition-shadow overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-start mb-2",
            children: [
              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                variant: "outline",
                className: "capitalize ".concat(riskStyles.className),
                children: [riskLevel, " Risk"],
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "text-xs text-muted-foreground",
                children: formattedDate,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "cursor-pointer hover:text-primary transition-colors",
            onClick: function () {
              return onClick(strategy);
            },
            children: strategy.title,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-sm text-muted-foreground line-clamp-3 min-h-[3em]",
            children: strategy.description,
          }),
          strategy.executiveBot &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center mt-4 text-xs text-muted-foreground",
              children: [
                (0, jsx_runtime_1.jsx)(avatar_1.Avatar, {
                  className: "h-5 w-5 mr-2",
                  children: (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                    className: "text-[10px] ".concat(
                      avatarColor,
                      " text-white",
                    ),
                    children: executiveInitials,
                  }),
                }),
                "Proposed by: ",
                strategy.executiveBot,
              ],
            }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "pt-2 border-t flex justify-between gap-2",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: function () {
              return onDebate(strategy);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "hidden sm:inline",
                children: "Debate",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: function () {
              return onClick(strategy);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.BarChart2, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "hidden sm:inline",
                children: "View",
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            onClick: function () {
              return onExport(strategy);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.FileDown, {
                className: "h-4 w-4 mr-1",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "hidden sm:inline",
                children: "Export",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = StrategyCard;
