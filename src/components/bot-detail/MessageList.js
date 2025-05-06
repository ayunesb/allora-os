"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var avatar_1 = require("@/components/ui/avatar");
var date_fns_1 = require("date-fns");
var MessageList = function (_a) {
  var messages = _a.messages;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "space-y-4 p-4",
    children: messages.map(function (message) {
      return (0, jsx_runtime_1.jsx)(
        "div",
        {
          className: "flex ".concat(
            message.sender === "user" ? "justify-end" : "justify-start",
          ),
          children: (0, jsx_runtime_1.jsxs)("div", {
            className: "flex flex-col",
            children: [
              message.sender === "bot" &&
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center space-x-2 mb-1",
                  children: [
                    (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                      className: "h-6 w-6",
                      children: [
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                          src: "/placeholder-executive.png",
                          alt: "AI Bot",
                        }),
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                          children: "AI",
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-xs font-medium text-muted-foreground",
                      children: "AI Advisor",
                    }),
                  ],
                }),
              (0, jsx_runtime_1.jsxs)("div", {
                className: "rounded-lg px-4 py-2 max-w-2xl ".concat(
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground",
                ),
                children: [
                  (0, jsx_runtime_1.jsx)("p", {
                    className: "text-sm",
                    children: message.text,
                  }),
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "block text-xs text-right mt-1 opacity-70",
                    children: (0, date_fns_1.formatDistanceToNow)(
                      message.timestamp,
                      { addSuffix: true },
                    ),
                  }),
                ],
              }),
            ],
          }),
        },
        message.id,
      );
    }),
  });
};
exports.default = MessageList;
