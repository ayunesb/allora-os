"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var label_1 = require("@/components/ui/label");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var ParticipantsList = function (_a) {
  var _b = _a.participants,
    participants = _b === void 0 ? [] : _b, // Provide default empty array
    onEditParticipants = _a.onEditParticipants;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "space-y-2",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between",
        children: [
          (0, jsx_runtime_1.jsx)(label_1.Label, { children: "Participants" }),
          (0, jsx_runtime_1.jsxs)(button_1.Button, {
            variant: "outline",
            size: "sm",
            onClick: onEditParticipants,
            className: "flex items-center gap-1",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Edit2, {
                className: "h-3.5 w-3.5",
              }),
              (0, jsx_runtime_1.jsx)("span", { children: "Edit Team" }),
            ],
          }),
        ],
      }),
      Array.isArray(participants) && participants.length > 0
        ? (0, jsx_runtime_1.jsx)("div", {
            className: "grid grid-cols-1 md:grid-cols-2 gap-3",
            children: participants.map(function (bot) {
              return (0, jsx_runtime_1.jsxs)(
                "div",
                {
                  className:
                    "flex items-center space-x-3 p-3 border rounded-md",
                  children: [
                    (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                      children: [
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                          src: bot.avatar,
                          alt: bot.name,
                        }),
                        (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                          children: bot.name.charAt(0),
                        }),
                      ],
                    }),
                    (0, jsx_runtime_1.jsxs)("div", {
                      className: "flex-1 min-w-0",
                      children: [
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "font-medium truncate",
                          children: bot.name,
                        }),
                        (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground truncate",
                          children: bot.title,
                        }),
                      ],
                    }),
                  ],
                },
                bot.id,
              );
            }),
          })
        : (0, jsx_runtime_1.jsxs)("div", {
            className: "p-4 border rounded-md text-center",
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Users, {
                className: "h-6 w-6 text-muted-foreground mx-auto mb-2",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-sm text-muted-foreground",
                children: "No participants added yet",
              }),
            ],
          }),
    ],
  });
};
exports.default = ParticipantsList;
