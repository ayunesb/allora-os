"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var StrategyHeader = function (_a) {
  var onNewStrategy = _a.onNewStrategy,
    _b = _a.isAnyActionPending,
    isAnyActionPending = _b === void 0 ? false : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8 animate-fadeIn",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "flex items-center",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Brain, {
            className: "h-8 w-8 text-primary mr-3 animate-pulse-slow",
          }),
          (0, jsx_runtime_1.jsxs)("div", {
            children: [
              (0, jsx_runtime_1.jsx)("h1", {
                className: "text-3xl font-bold gradient-text",
                children: "Business Strategies",
              }),
              (0, jsx_runtime_1.jsx)("p", {
                className: "text-muted-foreground mt-1",
                children: "Create and manage strategic plans for your business",
              }),
            ],
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex items-center",
        children: (0, jsx_runtime_1.jsx)(button_1.Button, {
          onClick: onNewStrategy,
          disabled: isAnyActionPending,
          variant: "gradient",
          className: "w-full sm:w-auto shadow-lg hover:shadow-primary/20",
          children: isAnyActionPending
            ? (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.Loader2, {
                    className: "mr-2 h-4 w-4 animate-spin",
                  }),
                  "Please wait",
                ],
              })
            : (0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, {
                children: [
                  (0, jsx_runtime_1.jsx)(lucide_react_1.PlusCircle, {
                    className: "mr-2 h-4 w-4",
                  }),
                  "New Strategy",
                ],
              }),
        }),
      }),
    ],
  });
};
exports.default = StrategyHeader;
