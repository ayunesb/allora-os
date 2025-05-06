"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var avatar_1 = require("@/components/ui/avatar");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var utils_1 = require("@/lib/utils");
var DebateMessage = function (_a) {
  var message = _a.message,
    participants = _a.participants,
    onVote = _a.onVote,
    onToggleFavorite = _a.onToggleFavorite;
  var participant = participants.find(function (p) {
    return p.id === message.senderId;
  });
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex gap-4 p-3 rounded-lg "
      .concat(message.isUser ? "bg-muted/50" : "bg-card", " ")
      .concat(
        message.isFavorite
          ? "border-2 border-yellow-400"
          : "border border-border",
      ),
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex-shrink-0",
        children: message.isUser
          ? (0, jsx_runtime_1.jsx)("div", {
              className:
                "w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center",
              children: (0, jsx_runtime_1.jsx)(lucide_react_1.UserCircle, {
                className: "h-6 w-6 text-primary",
              }),
            })
          : message.senderId === "system"
            ? (0, jsx_runtime_1.jsx)("div", {
                className:
                  "w-10 h-10 rounded-full bg-muted flex items-center justify-center",
                children: (0, jsx_runtime_1.jsx)("span", {
                  className: "text-muted-foreground font-semibold",
                  children: "S",
                }),
              })
            : (0, jsx_runtime_1.jsx)(avatar_1.Avatar, {
                className: "h-10 w-10",
                children: (0, jsx_runtime_1.jsx)("div", {
                  className:
                    "w-full h-full flex items-center justify-center bg-primary/10",
                  children: (0, jsx_runtime_1.jsx)("span", {
                    className: "font-semibold",
                    children: message.sender.charAt(0),
                  }),
                }),
              }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex-1 space-y-1",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-start",
            children: [
              (0, jsx_runtime_1.jsxs)("div", {
                children: [
                  (0, jsx_runtime_1.jsx)("span", {
                    className: "font-medium",
                    children: message.sender,
                  }),
                  participant &&
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-sm text-muted-foreground ml-2",
                      children: participant.title,
                    }),
                ],
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "text-xs text-muted-foreground",
                children: message.timestamp.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "text-sm",
            children: message.content,
          }),
          !message.senderId.includes("system") &&
            (0, jsx_runtime_1.jsxs)("div", {
              className: "flex items-center gap-2 pt-2",
              children: [
                (0, jsx_runtime_1.jsxs)("div", {
                  className: "flex items-center",
                  children: [
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8",
                      onClick: function () {
                        return onVote && onVote(message.id, true);
                      },
                      disabled: !onVote,
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.ThumbsUp,
                        { className: "h-4 w-4" },
                      ),
                    }),
                    (0, jsx_runtime_1.jsx)("span", {
                      className: "text-sm mx-1",
                      children: message.votes || 0,
                    }),
                    (0, jsx_runtime_1.jsx)(button_1.Button, {
                      variant: "ghost",
                      size: "icon",
                      className: "h-8 w-8",
                      onClick: function () {
                        return onVote && onVote(message.id, false);
                      },
                      disabled: !onVote || (message.votes || 0) <= 0,
                      children: (0, jsx_runtime_1.jsx)(
                        lucide_react_1.ThumbsDown,
                        { className: "h-4 w-4" },
                      ),
                    }),
                  ],
                }),
                (0, jsx_runtime_1.jsx)(button_1.Button, {
                  variant: "ghost",
                  size: "icon",
                  className: (0, utils_1.cn)(
                    "h-8 w-8",
                    message.isFavorite && "text-yellow-500",
                  ),
                  onClick: function () {
                    return onToggleFavorite && onToggleFavorite(message.id);
                  },
                  disabled: !onToggleFavorite,
                  children: (0, jsx_runtime_1.jsx)(lucide_react_1.Star, {
                    className: "h-4 w-4",
                    fill: message.isFavorite ? "currentColor" : "none",
                  }),
                }),
              ],
            }),
        ],
      }),
    ],
  });
};
exports.default = DebateMessage;
