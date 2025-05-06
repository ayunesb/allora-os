"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = BotInsightCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var badge_1 = require("@/components/ui/badge");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var react_router_dom_1 = require("react-router-dom");
function BotInsightCard(_a) {
  var insight = _a.insight,
    onViewDetails = _a.onViewDetails;
  // Get destination based on insight type
  var getDestination = function (type) {
    switch (type) {
      case "strategy":
        return "/dashboard/strategies";
      case "campaign":
        return "/dashboard/campaigns";
      case "call_script":
        return "/dashboard/calls";
      default:
        return "/dashboard";
    }
  };
  // Get badge color based on insight type
  var getBadgeVariant = function (type) {
    switch (type) {
      case "strategy":
        return "default";
      case "campaign":
        return "secondary";
      case "call_script":
        return "outline";
      default:
        return "default";
    }
  };
  // Get display label based on insight type
  var getTypeLabel = function (type) {
    switch (type) {
      case "strategy":
        return "Strategy";
      case "campaign":
        return "Campaign";
      case "call_script":
        return "Call Script";
      default:
        return "Insight";
    }
  };
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "transition-all duration-200 hover:shadow-md overflow-hidden",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-3",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-start",
            children: [
              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                variant: getBadgeVariant(insight.type),
                className: "mb-2",
                children: getTypeLabel(insight.type),
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-xs text-muted-foreground",
                children: new Date(insight.createdAt).toLocaleDateString(),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg line-clamp-2",
            children: insight.title,
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center mt-1",
              children: [
                (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                  className: "h-6 w-6 mr-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                      src:
                        insight.primaryBot.avatar ||
                        "/avatars/".concat(
                          insight.primaryBot.name
                            .toLowerCase()
                            .replace(/\s+/g, "-"),
                          ".png",
                        ),
                      alt: insight.primaryBot.name,
                    }),
                    (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                      children: insight.primaryBot.name[0],
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)("span", {
                  className: "text-sm",
                  children: insight.primaryBot.name,
                }),
              ],
            }),
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        children: (0, jsx_runtime_1.jsx)("p", {
          className: "text-sm text-muted-foreground line-clamp-3",
          children: insight.description,
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
        className: "pt-2 flex justify-between",
        children: [
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            className: "text-xs",
            onClick: function () {
              return onViewDetails(insight);
            },
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                className: "h-3.5 w-3.5 mr-1",
              }),
              "View details",
            ],
          }),
          (0, jsx_runtime_1.jsx)(button_1.Button, {
            variant: "ghost",
            size: "sm",
            className: "text-xs",
            asChild: true,
            children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Link, {
              to: getDestination(insight.type),
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowUpRight, {
                  className: "h-3.5 w-3.5 mr-1",
                }),
                "Go to ",
                getTypeLabel(insight.type),
              ],
            }),
          }),
        ],
      }),
    ],
  });
}
