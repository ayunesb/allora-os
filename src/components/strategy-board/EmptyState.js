"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = EmptyState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function EmptyState(_a) {
  var onCreateNew = _a.onCreateNew;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col items-center justify-center p-8 border border-gray-800 bg-gray-900/30 rounded-lg backdrop-blur-sm animate-fadeIn text-center",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "bg-purple-900/20 p-4 rounded-full mb-6",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.Rocket, {
          className: "h-10 w-10 text-purple-400",
        }),
      }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-2xl font-bold mb-3 text-white",
        children: "No strategies yet",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-gray-400 text-center mb-8 max-w-md",
        children:
          "Let's build your future empire \uD83D\uDE80 Create your first growth strategy with help from your AI Executive Team.",
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onCreateNew,
        className:
          "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 px-6",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.Plus, {
            className: "mr-2 h-4 w-4",
          }),
          "Create Your First Strategy",
        ],
      }),
    ],
  });
}
