"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExecutiveDebate = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var ExecutiveDebate = function (_a) {
  var _b = _a.topic,
    topic = _b === void 0 ? "Growth Strategy" : _b,
    _c = _a.participants,
    participants = _c === void 0 ? ["CEO", "CMO", "CTO"] : _c;
  return (0, jsx_runtime_1.jsxs)(card_1.Card, {
    className: "p-6",
    children: [
      (0, jsx_runtime_1.jsxs)("h2", {
        className: "text-2xl font-bold mb-4",
        children: ["Executive Debate: ", topic],
      }),
      (0, jsx_runtime_1.jsxs)("div", {
        className: "space-y-4",
        children: [
          (0, jsx_runtime_1.jsxs)("p", {
            className: "text-muted-foreground",
            children: [
              "The AI executives are debating the best approach to ",
              topic.toLowerCase(),
              ".",
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "flex flex-wrap gap-2 mt-2",
            children: participants.map(function (participant) {
              return (0, jsx_runtime_1.jsx)(
                "span",
                {
                  className:
                    "px-3 py-1 bg-primary/10 text-primary rounded-full text-sm",
                  children: participant,
                },
                participant,
              );
            }),
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className: "mt-6 space-y-4 border-t pt-4",
            children: (0, jsx_runtime_1.jsx)("p", {
              className: "italic",
              children: "Debate visualization is loading...",
            }),
          }),
        ],
      }),
    ],
  });
};
exports.ExecutiveDebate = ExecutiveDebate;
exports.default = exports.ExecutiveDebate;
