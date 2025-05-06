"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CertificationCard;
var jsx_runtime_1 = require("react/jsx-runtime");
var button_1 = require("@/components/ui/button");
function CertificationCard(_a) {
  var title = _a.title,
    validUntil = _a.validUntil,
    iconUrl = _a.iconUrl,
    alt = _a.alt;
  return (0, jsx_runtime_1.jsxs)("div", {
    className: "border rounded-md p-4 flex flex-col items-center text-center",
    children: [
      (0, jsx_runtime_1.jsx)("div", {
        className:
          "w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-3",
        children: (0, jsx_runtime_1.jsx)("img", {
          src: iconUrl,
          alt: alt,
          className: "w-12 h-12",
        }),
      }),
      (0, jsx_runtime_1.jsx)("h3", {
        className: "font-medium",
        children: title,
      }),
      (0, jsx_runtime_1.jsxs)("p", {
        className: "text-sm text-muted-foreground mb-2",
        children: ["Valid until ", validUntil],
      }),
      (0, jsx_runtime_1.jsx)(button_1.Button, {
        size: "sm",
        variant: "ghost",
        children: "View Certificate",
      }),
    ],
  });
}
