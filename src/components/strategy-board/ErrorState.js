"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ErrorState;
var jsx_runtime_1 = require("react/jsx-runtime");
var lucide_react_1 = require("lucide-react");
var button_1 = require("@/components/ui/button");
function ErrorState(_a) {
  var error = _a.error,
    onRetry = _a.onRetry;
  return (0, jsx_runtime_1.jsxs)("div", {
    className:
      "flex flex-col items-center justify-center p-8 border border-red-900/30 bg-red-900/10 rounded-lg animate-fadeIn text-center",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className: "bg-red-900/20 p-4 rounded-full mb-6",
        children: (0, jsx_runtime_1.jsx)(lucide_react_1.AlertCircle, {
          className: "h-10 w-10 text-red-400",
        }),
      }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "text-2xl font-bold mb-3 text-white",
        children: "Oops! Couldn't load your strategies",
      }),
      (0, jsx_runtime_1.jsx)("p", {
        className: "text-gray-300 text-center mb-8 max-w-md",
        children:
          (error === null || error === void 0 ? void 0 : error.message) ||
          "Something went wrong while loading your strategies. Please try again.",
      }),
      (0, jsx_runtime_1.jsxs)(button_1.Button, {
        onClick: onRetry,
        variant: "outline",
        className:
          "border-red-700 bg-red-900/20 hover:bg-red-800/30 text-white retry-button",
        children: [
          (0, jsx_runtime_1.jsx)(lucide_react_1.RefreshCw, {
            className: "mr-2 h-4 w-4 animate-spin-once",
          }),
          "Refresh and try again",
        ],
      }),
    ],
  });
}
