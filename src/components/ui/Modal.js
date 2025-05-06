"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var Modal = function (_a) {
  var isOpen = _a.isOpen,
    onClose = _a.onClose,
    className = _a.className,
    children = _a.children;
  if (!isOpen) return null;
  return (0, jsx_runtime_1.jsx)("div", {
    className: "modal ".concat(className),
    children: (0, jsx_runtime_1.jsxs)("div", {
      className: "modal-content",
      children: [
        children,
        (0, jsx_runtime_1.jsx)("button", {
          onClick: onClose,
          children: "Close",
        }),
      ],
    }),
  });
};
exports.default = Modal;
