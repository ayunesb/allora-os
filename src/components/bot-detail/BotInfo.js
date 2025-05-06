"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var BotInfo = function (_a) {
  var bot = _a.bot;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "flex items-start gap-4",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0",
        "aria-hidden": "true",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.Bot, {
          className: "h-6 w-6 text-primary",
        }),
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "overflow-hidden",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            id: "bot-".concat(bot.name.replace(/\s+/g, "-").toLowerCase()),
            children: bot.name,
          }),
          (0, jsx_runtime_1.jsxs)(card_1.CardDescription, {
            className: "flex items-center gap-1 mt-1 truncate",
            "aria-labelledby": "bot-".concat(
              bot.name.replace(/\s+/g, "-").toLowerCase(),
            ),
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.Briefcase, {
                className: "h-3.5 w-3.5 flex-shrink-0",
                "aria-hidden": "true",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "truncate",
                children: bot.title,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className:
              "flex items-center gap-1 text-sm text-muted-foreground mt-1 truncate",
            "aria-label": ""
              .concat(bot.name, "'s expertise: ")
              .concat(bot.expertise),
            children: [
              (0, jsx_runtime_1.jsx)(lucide_react_1.GraduationCap, {
                className: "h-3.5 w-3.5 flex-shrink-0",
                "aria-hidden": "true",
              }),
              (0, jsx_runtime_1.jsx)("span", {
                className: "truncate",
                children: bot.expertise,
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.default = BotInfo;
