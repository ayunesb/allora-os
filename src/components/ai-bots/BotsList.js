"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BotsList = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var avatar_1 = require("@/components/ui/avatar");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var ai_executives_1 = require("@/utils/ai-executives");
var BotsList = function (_a) {
  var filteredBots = _a.filteredBots,
    onSelectBot = _a.onSelectBot;
  var getInitials = function (name) {
    return name
      .split(" ")
      .map(function (n) {
        return n[0];
      })
      .join("");
  };
  return (0, jsx_runtime_1.jsx)("div", {
    className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
    children:
      filteredBots.length === 0
        ? (0, jsx_runtime_1.jsx)("div", {
            className: "col-span-3 text-center py-10",
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "text-muted-foreground",
              children: "No executives found matching your criteria.",
            }),
          })
        : filteredBots.map(function (bot, index) {
            return (0, jsx_runtime_1.jsxs)(
              card_1.Card,
              {
                className: "overflow-hidden border border-muted",
                children: [
                  (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
                    className: "p-6",
                    children: [
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "flex items-start gap-4",
                        children: [
                          (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                            className: "h-16 w-16 border",
                            children: [
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarImage, {
                                src: (0, ai_executives_1.getExecutiveImage)(
                                  bot.name,
                                ),
                                alt: bot.name,
                              }),
                              (0, jsx_runtime_1.jsx)(avatar_1.AvatarFallback, {
                                children: getInitials(bot.name),
                              }),
                            ],
                          }),
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "space-y-1 flex-1",
                            children: [
                              (0, jsx_runtime_1.jsx)("h3", {
                                className: "font-semibold text-base",
                                children: bot.name,
                              }),
                              (0, jsx_runtime_1.jsx)("div", {
                                className:
                                  "flex items-center text-sm text-muted-foreground",
                                children: (0, jsx_runtime_1.jsx)("span", {
                                  children: bot.title,
                                }),
                              }),
                              (0, jsx_runtime_1.jsx)(badge_1.Badge, {
                                variant: "outline",
                                className: "mt-1",
                                children: bot.role,
                              }),
                            ],
                          }),
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)("div", {
                        className: "mt-4 space-y-2",
                        children: [
                          (0, jsx_runtime_1.jsxs)("div", {
                            className: "text-sm",
                            children: [
                              (0, jsx_runtime_1.jsx)("span", {
                                className: "font-medium",
                                children: "Expertise:",
                              }),
                              " ",
                              bot.specialty,
                            ],
                          }),
                          bot.exampleAction &&
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-sm",
                              children: [
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "font-medium",
                                  children: "Example Action:",
                                }),
                                " ",
                                bot.exampleAction,
                              ],
                            }),
                          bot.outputLocation &&
                            (0, jsx_runtime_1.jsxs)("div", {
                              className: "text-sm flex items-center",
                              children: [
                                (0, jsx_runtime_1.jsx)(
                                  lucide_react_1.Activity,
                                  {
                                    className:
                                      "h-3.5 w-3.5 mr-1 text-muted-foreground",
                                  },
                                ),
                                (0, jsx_runtime_1.jsx)("span", {
                                  className: "text-muted-foreground",
                                  children: bot.outputLocation,
                                }),
                              ],
                            }),
                        ],
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsxs)(card_1.CardFooter, {
                    className: "p-4 pt-0 flex justify-between gap-4",
                    children: [
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "secondary",
                        size: "sm",
                        className: "w-full",
                        onClick: function () {
                          return onSelectBot(bot);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
                            className: "h-4 w-4 mr-2",
                          }),
                          "Chat",
                        ],
                      }),
                      (0, jsx_runtime_1.jsxs)(button_1.Button, {
                        variant: "outline",
                        size: "sm",
                        className: "w-full",
                        onClick: function () {
                          return onSelectBot(bot);
                        },
                        children: [
                          (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                            className: "h-4 w-4 mr-2",
                          }),
                          "Consult",
                        ],
                      }),
                    ],
                  }),
                ],
              },
              "".concat(bot.role, "-").concat(bot.name, "-").concat(index),
            );
          }),
  });
};
exports.BotsList = BotsList;
