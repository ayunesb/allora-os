"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebateContent = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var tabs_1 = require("@/components/ui/tabs");
var button_1 = require("@/components/ui/button");
var avatar_1 = require("@/components/ui/avatar");
var lucide_react_1 = require("lucide-react");
var ai_executives_1 = require("@/utils/ai-executives");
var DebateContent = function (_a) {
  var topic = _a.topic,
    summary = _a.summary,
    discussion = _a.discussion,
    conclusion = _a.conclusion,
    onStartNewDebate = _a.onStartNewDebate;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "shadow-md",
    children: [
      (0, jsx_runtime_1.jsxs)(card_1.CardHeader, {
        className: "pb-2",
        children: [
          (0, jsx_runtime_1.jsx)(card_1.CardTitle, {
            className: "text-lg",
            children: "AI Executive Boardroom",
          }),
          (0, jsx_runtime_1.jsx)(card_1.CardDescription, {
            children:
              "A simulated debate among your AI executives on key business strategies",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "Topic of Discussion",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: topic,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            className: "space-y-2",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "Summary",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground",
                children: summary,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-md font-semibold",
                children: "Executive Perspectives",
              }),
              (0, jsx_runtime_1.jsxs)(tabs_1.Tabs, {
                defaultValue: "discussion",
                className: "space-y-4",
                children: [
                  (0, jsx_runtime_1.jsxs)(tabs_1.TabsList, {
                    children: [
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "discussion",
                        children: "Discussion",
                      }),
                      (0, jsx_runtime_1.jsx)(tabs_1.TabsTrigger, {
                        value: "conclusion",
                        children: "Conclusion",
                      }),
                    ],
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "discussion",
                    className: "space-y-4",
                    children:
                      discussion.length > 0
                        ? discussion.map(function (item, index) {
                            var _a;
                            return (0, jsx_runtime_1.jsxs)(
                              "div",
                              {
                                className: "flex space-x-4",
                                children: [
                                  (0, jsx_runtime_1.jsxs)(avatar_1.Avatar, {
                                    className: "h-8 w-8",
                                    children: [
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarImage,
                                        {
                                          src: (0,
                                          ai_executives_1.getExecutiveImage)(
                                            item.speaker,
                                          ),
                                        },
                                      ),
                                      (0, jsx_runtime_1.jsx)(
                                        avatar_1.AvatarFallback,
                                        {
                                          children:
                                            ((_a = item.speaker) === null ||
                                            _a === void 0
                                              ? void 0
                                              : _a.substring(0, 2)) || "EX",
                                        },
                                      ),
                                    ],
                                  }),
                                  (0, jsx_runtime_1.jsxs)("div", {
                                    className: "space-y-1",
                                    children: [
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className: "text-sm font-medium",
                                        children: item.speaker,
                                      }),
                                      (0, jsx_runtime_1.jsx)("p", {
                                        className:
                                          "text-xs text-muted-foreground",
                                        children: item.message,
                                      }),
                                    ],
                                  }),
                                ],
                              },
                              index,
                            );
                          })
                        : (0, jsx_runtime_1.jsx)("p", {
                            className: "text-sm text-muted-foreground",
                            children: "No discussion data available.",
                          }),
                  }),
                  (0, jsx_runtime_1.jsx)(tabs_1.TabsContent, {
                    value: "conclusion",
                    children: conclusion
                      ? (0, jsx_runtime_1.jsx)("p", {
                          className: "text-muted-foreground",
                          children: conclusion,
                        })
                      : (0, jsx_runtime_1.jsx)("p", {
                          className: "text-sm text-muted-foreground",
                          children: "No conclusion data available.",
                        }),
                  }),
                ],
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-4 pt-4 border-t border-border",
            children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
              onClick: onStartNewDebate,
              className: "w-full",
              children: [
                (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                  className: "mr-2 h-4 w-4",
                }),
                "Start New Debate",
              ],
            }),
          }),
        ],
      }),
    ],
  });
};
exports.DebateContent = DebateContent;
