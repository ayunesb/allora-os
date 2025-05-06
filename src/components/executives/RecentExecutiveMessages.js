"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeExecutiveMessage = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var badge_1 = require("@/components/ui/badge");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var date_fns_1 = require("date-fns");
// Add a helper function to normalize messages with different property names
var normalizeExecutiveMessage = function (msg) {
  return {
    id: msg.id || "",
    created_at: msg.created_at || new Date().toISOString(),
    from_executive: msg.from_executive || msg.fromExecutive || "",
    to_executive: msg.to_executive || msg.toExecutive || "",
    message_content: msg.message_content || msg.content || "",
    content: msg.content || msg.message_content || "",
    status: msg.status || "unread",
  };
};
exports.normalizeExecutiveMessage = normalizeExecutiveMessage;
var RecentExecutiveMessages = function (_a) {
  var messages = _a.messages,
    _b = _a.isLoading,
    isLoading = _b === void 0 ? false : _b,
    onViewMoreMessages = _a.onViewMoreMessages;
  if (isLoading) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessagesSquare, {
                className: "h-5 w-5 mr-2",
              }),
              "Executive Communications",
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: [1, 2, 3].map(function (i) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "flex items-start space-x-3",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className:
                        "w-2 h-2 rounded-full bg-gray-200 dark:bg-gray-700 mt-2",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-1 flex-1",
                      children: [
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 animate-pulse",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "h-3 bg-gray-100 dark:bg-gray-800 rounded w-full animate-pulse",
                        }),
                        (0, jsx_runtime_1.jsx)("div", {
                          className:
                            "h-3 bg-gray-100 dark:bg-gray-800 rounded w-2/3 animate-pulse",
                        }),
                      ],
                    }),
                  ],
                },
                i,
              );
            }),
          }),
        }),
      ],
    });
  }
  if (messages.length === 0) {
    return (0, jsx_runtime_1.jsxs)(card_1.Card, {
      children: [
        (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
          children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
            className: "flex items-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.MessagesSquare, {
                className: "h-5 w-5 mr-2",
              }),
              "Executive Communications",
            ],
          }),
        }),
        (0, jsx_runtime_1.jsx)(card_1.CardContent, {
          children: (0, jsx_runtime_1.jsx)("div", {
            className: "text-center py-6 text-muted-foreground",
            children: (0, jsx_runtime_1.jsx)("p", {
              children: "No recent executive messages",
            }),
          }),
        }),
      ],
    });
  }
  // Process messages to ensure they have all properties
  var normalizedMessages = messages.map(function (msg) {
    return (0, exports.normalizeExecutiveMessage)(msg);
  });
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    children: [
      (0, jsx_runtime_1.jsx)(card_1.CardHeader, {
        children: (0, jsx_runtime_1.jsxs)(card_1.CardTitle, {
          className: "flex items-center",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.MessagesSquare, {
              className: "h-5 w-5 mr-2",
            }),
            "Executive Communications",
          ],
        }),
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className: "space-y-4",
            children: normalizedMessages.slice(0, 5).map(function (message) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className: "flex items-start space-x-3",
                  children: [
                    (0, jsx_runtime_1.jsx)("div", {
                      className: "w-2 h-2 rounded-full bg-primary mt-2",
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "space-y-1 flex-1",
                      children: [
                        (0, jsx_runtime_1.jsxs)("div", {
                          className: "flex justify-between items-center",
                          children: [
                            message.from_executive &&
                              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                variant: "outline",
                                className: "bg-primary/10 text-primary text-xs",
                                children: [
                                  "From ",
                                  typeof message.from_executive === "string"
                                    ? message.from_executive
                                    : "Executive",
                                ],
                              }),
                            message.to_executive &&
                              (0, jsx_runtime_1.jsxs)(badge_1.Badge, {
                                variant: "outline",
                                className:
                                  "bg-secondary/10 text-secondary text-xs",
                                children: [
                                  "To ",
                                  typeof message.to_executive === "string"
                                    ? message.to_executive
                                    : "Executive",
                                ],
                              }),
                            message.status &&
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "text-xs ".concat(
                                  message.status === "read"
                                    ? "text-green-500"
                                    : "text-amber-500",
                                ),
                                children:
                                  message.status.charAt(0).toUpperCase() +
                                  message.status.slice(1),
                              }),
                          ],
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm line-clamp-2",
                          children: message.message_content || message.content,
                        }),
                        (0, jsx_runtime_1.jsx)("span", {
                          className: "text-xs text-muted-foreground",
                          children: (0, date_fns_1.formatDistanceToNow)(
                            new Date(message.created_at),
                            { addSuffix: true },
                          ),
                        }),
                      ],
                    }),
                  ],
                },
                message.id,
              );
            }),
          }),
          messages.length > 5 &&
            (0, jsx_runtime_1.jsx)("div", {
              className: "mt-4 flex justify-center",
              children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
                variant: "ghost",
                size: "sm",
                onClick: onViewMoreMessages,
                className: "text-xs",
                children: [
                  "View all messages",
                  (0, jsx_runtime_1.jsx)(lucide_react_1.ArrowRight, {
                    className: "ml-2 h-3 w-3",
                  }),
                ],
              }),
            }),
        ],
      }),
    ],
  });
};
exports.default = RecentExecutiveMessages;
