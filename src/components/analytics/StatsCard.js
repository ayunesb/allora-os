"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var card_1 = require("@/components/ui/card");
var StatsCard = function (_a) {
  var title = _a.title,
    value = _a.value,
    description = _a.description,
    Icon = _a.icon;
  return (0, jsx_runtime_1.jsx)(card_1.Card, {
    children: (0, jsx_runtime_1.jsx)(card_1.CardContent, {
      className: "p-6",
      children: (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center justify-between space-x-4",
        children: [
          (0, jsx_runtime_1.jsxs)("div", {
            className: "flex-1",
            children: [
              (0, jsx_runtime_1.jsx)("h3", {
                className: "text-sm font-medium text-muted-foreground",
                children: title,
              }),
              (0, jsx_runtime_1.jsx)("div", {
                className: "mt-1",
                children: (0, jsx_runtime_1.jsx)("p", {
                  className: "text-2xl font-bold",
                  children: value,
                }),
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-xs text-muted-foreground mt-1",
                children: description,
              }),
            ],
          }),
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center",
            children: (0, jsx_runtime_1.jsx)(Icon, {
              className: "h-6 w-6 text-primary",
            }),
          }),
        ],
      }),
    }),
  });
};
exports.default = StatsCard;
