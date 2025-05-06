"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = StrategyHeader;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
function StrategyHeader(_a) {
  var onCreateNew = _a.onCreateNew;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col md:flex-row justify-between items-start md:items-center mb-8",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mb-4 md:mb-0",
        children: [
          (0, jsx_runtime_1.jsx)("h1", {
            className: "text-3xl md:text-4xl font-bold",
            children: "\uD83D\uDCC8 Your Growth Strategies",
          }),
          (0, jsx_runtime_1.jsx)("p", {
            className: "text-gray-400 mt-2",
            children:
              "Built by your AI Executive Team. Ready to dominate your market.",
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "flex gap-3",
        children: (0, jsx_runtime_1.jsxs)(button_1.Button, {
          onClick: onCreateNew,
          className: "bg-purple-600 hover:bg-purple-700 transition-all",
          children: [
            (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
              className: "mr-2 h-4 w-4",
            }),
            "Create New Strategy",
          ],
        }),
      }),
    ],
  });
}
