"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyDebateState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
var HelpTooltip_2 = require("@/components/help/HelpTooltip");
var EmptyDebateState = function (_a) {
  var onStartNewDebate = _a.onStartNewDebate;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex justify-between items-center",
            children: [
              (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
                className: "text-lg",
                children: "AI Executive Boardroom",
              }),
              (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
                content: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-2",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "The AI Executive Boardroom simulates strategic discussions between AI personas modeled after executives with different perspectives.",
                    }),
                    (0, jsx_runtime_1.jsx)(HelpTooltip_2.DocumentationLink, {
                      href: "/help/ai-boardroom",
                      label: "Learn more about AI boardroom debates",
                    }),
                  ],
                }),
                children: (0, jsx_runtime_1.jsx)(lucide_react_1.Info, {
                  className: "h-4 w-4 text-muted-foreground cursor-help",
                }),
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children: "No active debates found",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)(card_1.CardContent, {
        className: "py-4",
        children: (0, jsx_runtime_1.jsxs)("div", {
          className: "flex flex-col items-center text-center",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.MessageSquare, {
              className: "h-12 w-12 text-muted-foreground mb-3",
            }),
            (0, jsx_runtime_1.jsx)("p", {
              className: "text-sm text-muted-foreground mb-4",
              children:
                "There are no active executive debates for your company. AI executive debates help generate strategic insights by simulating discussions between different executive perspectives.",
            }),
            (0, jsx_runtime_1.jsxs)("div", {
              className: "space-y-2",
              children: [
                (0, jsx_runtime_1.jsxs)(button_1.Button, {
                  variant: "default",
                  onClick: onStartNewDebate,
                  className: "gap-2",
                  children: [
                    (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                      className: "h-4 w-4",
                    }),
                    "Start New Debate",
                  ],
                }),
                (0, jsx_runtime_1.jsx)("p", {
                  className: "text-xs text-muted-foreground mt-2",
                  children:
                    "You'll be able to select a topic and choose which AI executive personas should participate in the debate.",
                }),
              ],
            }),
          ],
        }),
      }),
    ],
  });
};
exports.EmptyDebateState = EmptyDebateState;
