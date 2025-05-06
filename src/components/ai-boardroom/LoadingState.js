"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingState = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var lucide_react_1 = require("lucide-react");
var HelpTooltip_1 = require("@/components/help/HelpTooltip");
var LoadingState = function (_a) {
  var _b = _a.title,
    title = _b === void 0 ? "AI Executive Boardroom" : _b,
    _c = _a.description,
    description =
      _c === void 0 ? "Simulating a live debate among your AI executives" : _c;
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
                children: title,
              }),
              (0, jsx_runtime_1.jsx)(HelpTooltip_1.HelpTooltip, {
                content: (0, jsx_runtime_1.jsxs)("div", {
                  className: "space-y-1",
                  children: [
                    (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "Our system is generating a realistic debate between AI executive personas.",
                    }),
                    (0, jsx_runtime_1.jsx)("p", {
                      children:
                        "Each executive will represent different business perspectives based on their role.",
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
            children: description,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsxs)(card_1.CardContent, {
        className: "flex flex-col items-center justify-center py-6",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
            className: "h-10 w-10 animate-spin text-primary",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "mt-4 text-sm text-muted-foreground",
            children: "Loading the latest boardroom discussion...",
          }),
          (0, jsx_runtime_1.jsxs)("ul", {
            className: "mt-3 text-xs text-muted-foreground space-y-1 list-none",
            children: [
              (0, jsx_runtime_1.jsx)("li", {
                children: "\u2022 Generating executive perspectives",
              }),
              (0, jsx_runtime_1.jsx)("li", {
                children: "\u2022 Analyzing strategic implications",
              }),
              (0, jsx_runtime_1.jsx)("li", {
                children: "\u2022 Formulating debate structure",
              }),
              (0, jsx_runtime_1.jsx)("li", {
                children: "\u2022 Preparing insights and recommendations",
              }),
            ],
          }),
        ],
      }),
    ],
  });
};
exports.LoadingState = LoadingState;
