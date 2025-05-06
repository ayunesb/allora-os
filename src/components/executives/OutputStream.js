"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OutputStream = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var react_1 = require("react");
var OutputStream = function (_a) {
  var text = _a.text,
    _b = _a.executive,
    executive = _b === void 0 ? "AI Assistant" : _b;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "bg-muted/30 p-4 rounded-md border overflow-auto max-h-[400px]",
    children: [
      (0, jsx_runtime_1.jsxs)("div", {
        className: "mb-2 flex items-center gap-2",
        children: [
          (0, jsx_runtime_1.jsx)("div", {
            className:
              "h-6 w-6 rounded-full bg-primary flex items-center justify-center text-xs text-white font-medium",
            children: executive.charAt(0),
          }),
          (0, jsx_runtime_1.jsx)("span", {
            className: "font-medium",
            children: executive,
          }),
        ],
      }),
      (0, jsx_runtime_1.jsx)("div", {
        className: "whitespace-pre-wrap text-sm",
        children: text.split("\n").map(function (line, index) {
          return (0, jsx_runtime_1.jsxs)(
            react_1.default.Fragment,
            {
              children: [
                line,
                index < text.split("\n").length - 1 &&
                  (0, jsx_runtime_1.jsx)("br", {}),
              ],
            },
            index,
          );
        }),
      }),
    ],
  });
};
exports.OutputStream = OutputStream;
